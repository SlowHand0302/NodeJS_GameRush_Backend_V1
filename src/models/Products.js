const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Products = new Schema(
    {
        productCode: { type: String, required: true },
        productTypeId: { type: mongoose.Types.ObjectId, ref: 'ProductTypes', required: true },
        expireDate: { type: Date, required: true, default: new Date() },
        status: {
            type: String,
            required: true,
            enum: ['available', 'unavailable', 'sold', 'expired'],
            default: 'available',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Products', Products);
