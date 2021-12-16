const mongoose = require('mongoose');
const { movieValidation } = require('../validation/validate');



const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "وارد کردن نام الزامی است"],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, "وارد کردن اسلاگ الزامی است"],
        unique: true,
    },
    country: {
        type: String,
        required: [true, "وارد کردن نام کشور الزامی است"],
    },
    director: {
        type: String,
        required: [true, "وارد کردن نام کارگردان الزامی است"],
    },
    ageClassification: {
        type: Number,
        required: [true, "وارد کردن رده سنی الزامی است"],
        default: 0,
        enum: [0, 1, 2]
    },
    date: {
        type: String,
        required: [true, "وارد کردن تاریخ الزامی است"],
    },
    story: {
        type: String,
        required: [true, "وارد کردن داستان الزامی است"],
        maxLength: [500, "لطفا داستان فیلم بیشتر از 500 کاراکتر انتخاب نکنید"]
    },
    aboutMovie: {
        type: String,
        required: [true, "وارد کردن درباره فیلم الزامی است"],
        maxLength: [500, "لطفا درباره فیلم بیشتر از 500 کاراکتر انتخاب نکنید"]
    },
    images: [{
        type: String,
        required: [true, "وارد کردن عکس فیلم الزامی است"],
    }],
    category: [{
        type: String , 
        required : [true , "وارد کردن دسته بندی الزامی است"]
    }]

}, { timestamps: true })


movieSchema.statics.movieValidate = function (body) {
    return movieValidation.validate(body)
}




module.exports = mongoose.model("Movie", movieSchema)