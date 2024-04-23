const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Payments = new Schema(
    {
        paymentName: { type: String, required: true },
        slug: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: true },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Payments', Payments);
