const { SubCategories } = require('../models');

// /api/subcategory/create
module.exports.POST_Create = async (req, res, next) => {
    await SubCategories.create({ ...req.body })
        .then((subcategory) => {
            return res.status(200).json({
                success: true,
                msg: 'Create new subcategory successfully',
                subcategory,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/subcategory/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
    return await SubCategories.find({})
        .then((subCategories) => {
            if (subCategories.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: `Empty Database`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Had read ${subCategories.length} lines`,
                subCategories,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/subcategory/readByCategory/:categoryId
module.exports.GET_ReadByCategory = async (req, res, next) => {
    const { category } = req.params;
    return await SubCategories.find({ category })
        .then((subCategories) => {
            if (subCategories.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not found SubCategories matched with conditions',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Had reaad ${subCategories.length} lines`,
                subCategories,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/genre/updateOne/:_id
module.exports.PUT_UpdateOne = async (req, res, next) => {
    const { _id } = req.params;
    return await SubCategories.findOneAndUpdate({ _id }, { ...req.body }, { returnOriginal: false })
        .then((subCategory) => {
            if (!subCategory) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Updated ${subCategory.subCategoryName} successfully`,
                subCategory,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};
