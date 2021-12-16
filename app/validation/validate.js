const Joi = require('joi');

// ? REGISTER VALIDATION
exports.registerValidation = Joi.object({
    fullname: Joi.string()
        .required().label("نام کاربری الزامی است"),
    email: Joi.string().label("پست الکترونیک شما اشتباه وارد شده است")
        .email().label("پست الکترونیک شما معتبر نیست")
        .required(),
    password: Joi.string()
        .required()
        .min(8)
        .label("لطفا کلمه عبور را بیشتر از 8 کاراکتر انتخاب کنید"),
    phone: Joi.string()
        .max(11)
        .min(10)
        .pattern(RegExp('09(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}'))
        .required().label("شماره همراه وارد شده معتبر نیست")
})


// ? MOVIES VALIDATION
exports.movieValidation = Joi.object({
    name: Joi.string()
        .required().label("لطفا نام فیلم را وارد کنید"),
    country: Joi.string()
        .required().label("لطفا نام کشور سازنده را وارد کنید"),
    director: Joi.string()
        .required().label("لطفا نام سازنده را وارد کنید"),
    ageClassification: Joi.number()
        .required().label("لطفا رده سنی را وارد کنید"),
    date: Joi.string()
        .required().label("لطفا تاریخ ساخت را وارد کنید"),
    story: Joi.string()
        .required().label("لطفا موضوع فیلم را وارد کنید"),
    aboutMovie: Joi.string()
        .required().label("لطفا درباره فیلم را وارد کنید"),
    images: Joi.string()
        .required().label("لطفا عکس فیلم را انتخاب کنید"),
    category: Joi.string()
        .required().label("لطفا دسته بندی فیلم را انتخاب کنید"),
})


// ?category VALIDATION
exports.categoryValidation = Joi.object({
    name: Joi.string()
        .required().label("لطفا نام فیلم را وارد کنید"),
})

