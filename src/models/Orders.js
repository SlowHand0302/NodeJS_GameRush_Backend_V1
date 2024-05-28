const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderItemSchema = new Schema({
    productType: { type: mongoose.Types.ObjectId, ref: 'ProductTypes', required: true },
    name: { type: String, required: true },
    priceAtPurchase: { type: Number, required: true },
    quantity: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    products: [{ type: mongoose.Types.ObjectId, ref: 'Products' }],
});

const Orders = new Schema(
    {
        customer: { type: mongoose.Types.ObjectId, ref: 'Users' },
        productTypes: [OrderItemSchema],
        finalPrice: { type: Number, require: true, default: 0 },
        paymentType: { type: mongoose.Types.ObjectId, ref: 'Payments' },
        status: { type: String, required: true, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Orders', Orders);
