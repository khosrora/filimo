const User = require('../model/user');
const Payment = require('../model/payment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authCTRL = {
    register: async (req, res) => {
        try {
            const { fullname, email, password, phone } = req.body;
            // !VALIDATION
            const value = await User.registerValidate(req.body);
            if (value.error) {
                return res.status(400).json({ msg: value.error.details[0].context.label })
            }
            // !USER FIND OR NOT FIND
            const userEmail = await User.findOne({ email })
            if (userEmail) return res.status(400).json({ msg: "دوست عزیز شما قبلا ثبت نام کرده اید" })
            const userPhone = await User.findOne({ phone })
            if (userPhone) return res.status(400).json({ msg: "دوست عزیز این شماره تماس قبلا ثبت شده است" })

            // !CREATE USER
            const newUser = await User({
                fullname, password, email, phone,
            })
            //! save USER
            await newUser.save();

            //! jsonWebToken SEND
            const accessToken = createAccessToken({ id: newUser._id })
            const refreshToken = createRefreshToken({ id: newUser._id })
            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/auth/refresh_token"
            })

            // !SEND SMS
            // * with kavenegar

            res.json({ accessToken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // !FIND EMAIL
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ msg: "شما هنوز ثبت نام نکرده اید" })

            // !PASSWORD CHECK
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "کاربری با این مشخصات ثبت نشده است" });

            // ! jsonWebToken SEND
            const accessToken = createAccessToken({ id: user._id })
            const refreshToken = createRefreshToken({ id: user._id })

            res.cookie("refreshtoken", refreshToken, {
                httpOnly: true,
                path: "/auth/refresh_token"
            })

            res.json({ accessToken })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: async (req, res) => {
        try {
            try {
                const rf_token = req.cookies.refreshtoken;
                if (!rf_token)
                    return res.status(400).json({ msg: "لطفا وارد شوید" })

                jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                    if (err) return res.status(400).json({ msg: "لطفا وارد شوید" });

                    const accesstoken = createAccessToken({ id: user.id });
                    const userDetails = await User.findById({ _id: user.id }).select("-password");
                    const activated = await Payment.findOne(
                        {
                            $and: [
                                { user: userDetails.id },
                                { status: true }
                            ]
                        }
                    ).select("activeDate")
                    res.json({
                        userDetails,
                        accesstoken,
                        activated
                    })
                })
            } catch (err) {
                return res.status(500).json({ msg: err.message })
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie("rf_token", { path: "/auth/refresh_token" });
            return res.json({ msg: "شما از سایت خارج شدید" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" })
}



module.exports = authCTRL;