const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Orders = new Schema(
    {
        customer: { type: mongoose.Types.ObjectId, ref: 'Users' },
        products: [{ type: mongoose.Types.ObjectId, ref: 'Products' }],
        finalPrice: { type: Number, require: true, default: 0 },
        paymentType: { type: mongoose.Types.ObjectId, ref: 'Payments' },
        status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Orders', Orders);
