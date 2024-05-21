const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categories = new Schema(
    {
        categoryName: { type: String, required: true },
        state: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
        type: { type: String, required: true, enum: ['game', 'function', 'app'] },
        slug: { type: String, required: true },
        // subCategories: [{ type: mongoose.Types.ObjectId, ref: 'SubCategories' }],
    },
    {
        timestamps: true,
    },
);
module.exports = mongoose.model('Categories', Categories);
