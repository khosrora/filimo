const User = require('../model/user');
const Payment = require('../model/payment');


const secureCTRL = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json({
                users,
                dataLength: users.length
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getAllPayments: async (req, res) => {
        try {
            const payments = await Payment.find();
            res.status(200).json({
                payments,
                dataLength: payments.length
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}



module.exports = secureCTRL;