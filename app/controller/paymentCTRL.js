const User = require('../model/user');
const Payment = require('../model/payment');


const ZarinpalCheckout = require('zarinpal-checkout');

const zarinpal = ZarinpalCheckout.create('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', true);

const paymentCTRL = {
    payment: async (req, res) => {
        try {
            const userActive = req.user;
            //! CHECK ACTIVATE USER
            if (userActive.active === true) {
                return res.status(400).json({ msg: "اکانت شما فعال است" })
            }
            // !GET BODY
            const { body } = req.body;

            // !PAYMENT USER
            var price;
            if (body === "0") {
                price = "69000"
            } else if (body === "1") {
                price = "250000"
            } else {
                price = "350000"
            }
            const response = await zarinpal.PaymentRequest({
                Amount: price, // In Tomans
                CallbackURL: 'http://localhost:5000/payment/verifypayment',
                Description: 'پرداخت جهت خرید اکانت از رابا فیلم',
                Email: userActive.email,
                Mobile: userActive.phone
            })

            if (response.status === 100) {
                const newPayment = await Payment({
                    user: userActive.id, total: price, paymentCode: response.authority
                })
                await newPayment.save();
                res.json(response.url)
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    callbackPayment: async (req, res) => {
        try {
            const status = req.query.Status;
            const paymentCode = req.query.Authority;
            const payment = await Payment.findOne({ paymentCode })
            const user = await User.findOne(payment.user)
            if (status === "OK") {
                payment.status = true;
                user.active = true;
                if (payment.total === "69000") {
                    payment.activeDate = new Date(new Date().getTime() + (10000));
                } else {
                    payment.activeDate = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000));
                }
                await payment.save();
                await user.save();
                res.redirect(process.env.BASE_URL);
            } else {
                console.log("not ok");
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAcountAcitvated: async (req, res) => {
        try {

            // !CHECK PAYMENT DATE USER
            const activated = await Payment.findOne(
                {
                    $and: [
                        { user: req.user.id },
                        { status: true }
                    ]
                }
            ).populate("user")

            if (await activated !== null) {
                if (activated.activeDate < Date.now()) {
                    activated.activeDate = null;
                    activated.user.active = false;
                    activated.remove();
                    activated.user.save();
                    return res.json({ active: false })
                    // !send SMS
                } else {
                    return res.json({ active: true })
                    // !send SMS
                }
            } else {
                return res.json({ active: false })
                // !send SMS
            }

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}



module.exports = paymentCTRL;