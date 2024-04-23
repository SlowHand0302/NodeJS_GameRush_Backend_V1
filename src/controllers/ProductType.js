const { ProductTypes } = require('../models');

// /api/productType/create
module.exports.POST_Create = async (req, res, next) => {
    return await ProductTypes.create({ ...req.body })
        .then((productType) => {
            return res.status(200).json({
                sucess: true,
                msg: 'Create new product type successfully',
                productType,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/productType/readMany
module.exports.GET_readMany = async (req, res, next) => {
    return await ProductTypes.find({})
        .populate({ path: 'categories', select: 'categoryName' })
        .populate({ path: 'subCategories', select: 'subCategoryName' })
        .lean()
        .then((productTypes) => {
            if (productTypes.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'Empty Database',
                });
            }
            return res.status(200).json({
                sucess: true,
                msg: `Had read ${productTypes.length} lines`,
                productTypes,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/productType/readByFilter
module.exports.GET_readByFilter = async (req, res, next) => {
    const { sort } = req.query;
    let query = {};
    // create query for filter by price range
    if (req.query.minPrice || req.query.maxPrice) {
        query.sellPrice = {};
        if (req.query.minPrice) {
            query.sellPrice.$gte = req.query.minPrice;
            delete req.query.minPrice;
        }
        if (req.query.maxPrice) {
            query.sellPrice.$lte = req.query.maxPrice;
            delete req.query.maxPrice;
        }
    }
    delete req.query.sort;
    query = { ...query, ...req.query };
    return await ProductTypes.find(query)
        .populate({ path: 'categories', select: 'categoryName' })
        .populate({ path: 'subCategories', select: 'subCategoryName' })
        .sort(sort || 'createdAt')
        .lean()
        .then((productTypes) => {
            if (productTypes.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: 'Not found product types matched with conditions',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${productTypes.length} lines`,
                productTypes,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

module.exports.PUT_updateOne = async (req, res, next) => {
    const { _id } = req.params;
    return await ProductTypes.findByIdAndUpdate({ _id }, { ...req.body }, { returnOriginal: false })
        .then((productType) => {
            if (!productType) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Update ${productType.name} successfully`,
                productType,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};
