const { Products } = require('../models');

// /api/product/create
module.exports.POST_Create = async (req, res, next) => {
    return await Products.create({ ...req.body })
        .then((product) => {
            return res.status(200).json({
                success: true,
                msg: 'Create new product success fully',
                product,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/product/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
    return await Products.find({})
        .populate({ path: 'productTypeId', select: 'name' })
        .then((products) => {
            if (products.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: `Empty Database`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${products.length} lines`,
                products,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/product/updateOne/_id
module.exports.PUT_UpdateOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Products.findOneAndUpdate({ _id }, { ...req.body }, { overwrite: true }, { returnOriginal: false })
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Update ${_id} successfully`,
                product,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/product/ReadByType/productTypeId
module.exports.GET_ReadByType = async (req, res, next) => {
    const { productTypeId } = req.params;
    return await Products.find({ productTypeId })
        .then((products) => {
            if (products.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not found products match condition',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${products.length} products`,
                products,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/product/CountByType/productTypeId
module.exports.GET_CountByType = async (req, res, next) => {
    const { productTypeId } = req.params;
    return await Products.countDocuments({ productTypeId, status: 'available' })
        .then((number) => {
            return res.status(200).json({
                success: true,
                msg: 'Count success',
                number,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

// api/product/readBySort/sort=type
module.exports.GET_ReadBySort = async (req, res, next) => {
    const { sort } = req.query;
    return await Products.find({})
        .sort(sort)
        .lean()
        .then((products) => {
            if (products.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'Empty Database',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${products.length} products`,
                products,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/product/readByTypeAndQuantity
module.exports.GET_ReadByTypeAndQuantity = async (req, res, next) => {
    const { typeId, quantity } = req.query;
    return await Products.find({ productTypeId: typeId, status: 'available' })
        .limit(quantity)
        .then((products) => {
            if (products.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not found any products',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${products.length} products`,
                products,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};
