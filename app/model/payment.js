const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: false
    },
    total: {
        type: String,
        required: true
    },
    paymentCode: {
        type: String,
        required: true
    },
    activeDate: {
        type: Date,
        default: null,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })



module.exports = mongoose.model("Payment", paymentSchema)