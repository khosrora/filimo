const mongoose = require('mongoose');
const { registerValidation } = require('../validation/validate');

const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "وارد کردن نام کاربری الزامی است"],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "وارد کردن ایمیل الزامی است"],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "وارد کردن شماره همراه الزامی است"]
    },
    phone: {
        type: String,
        required: [true, "وارد کردن شماره همراه الزامی است"],
        unique: true
    },
    role: {
        type: String,
        enum: ['Member', 'Admin'],
        default: 'Member'
    },
    active: {
        type: Boolean,
        default: 0
    } ,
}, { timestamps: true })

userSchema.statics.registerValidate = function (body) {
    return registerValidation.validate(body)
}


userSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified("password")) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    })
});


module.exports = mongoose.model("User", userSchema)