const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductTypes = new Schema(
    {
        image: { type: String, required: true, default: '' },
        // typeId: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        originalPrice: { type: Number, required: true, default: 0 },
        sellPrice: { type: Number, required: true, default: 0 },
        isHot: { type: Boolean, required: true, default: false },
        categories: [{ type: mongoose.Types.ObjectId, ref: 'Categories' }],
        subCategories: [{ type: mongoose.Types.ObjectId, ref: 'SubCategories' }],
        businessType: { type: String, required: true, enum: ['extend', 'upgrade', 'account'] },
        useTime: { type: String, required: true },
        status: { type: String, required: true, enum: ['available', 'unavailable'], default: 'available' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('ProductTypes', ProductTypes);