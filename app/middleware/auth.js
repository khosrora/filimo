const Users = require('./../model/user');


const authAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            _id: req.user.id
        })
        if (user.admin === "Member")
            return res.status(400).json({ msg: "شما اجازه دسترسی ندارید" })
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authAdmin;