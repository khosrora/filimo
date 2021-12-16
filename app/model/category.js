const mongoose = require('mongoose');
const { categoryValidation } = require('../validation/validate');



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "وارد کردن نام الزامی است"],
        unique: true,
        lowercase: true,
    }
}, { timestamps: true })

categorySchema.statics.categoryValidate = function (body) {
    return categoryValidation.validate(body)
}




module.exports = mongoose.model("Category", categorySchema)