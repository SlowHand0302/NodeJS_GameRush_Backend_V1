const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubCategories = new Schema(
    {
        category: { type: mongoose.Types.ObjectId, required: true },
        subCategoryName: { type: String, required: true },
        state: { type: String, required: true, enum: ['active', 'inactive'], default: 'active' },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('SubCategories', SubCategories);
