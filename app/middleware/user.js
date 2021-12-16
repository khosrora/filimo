const User = require('./../model/user');
const jwt = require('jsonwebtoken');


const user = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.status(400).json({ msg: "لطفا ابتدا وارد شوید." })

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        if (!decoded) return res.status(400).json({ msg: "لطفا ابتدا وارد شوید." })

        const user = await User.findOne({ _id: decoded.id });
        req.user = user;
        next()
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = user;