const { Categories } = require('../models');
const { convertToASCII } = require('../utils');

// api/category/create
module.exports.POST_Create = async (req, res, next) => {
    return await Categories.create({ ...req.body, slug: convertToASCII(req.body.categoryName) })
        .then((category) => {
            return res.status(200).json({
                success: true,
                category,
                msg: 'Create new Category Successfully',
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/category/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
    return await Categories.find({})
        .lean()
        .then((category) => {
            if (category.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: `Empty Database`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Had read ${category.length} lines`,
                category,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/category/readBySort?sort=type
module.exports.GET_ReadBySort = async (req, res, next) => {
    const { sort } = req.query;
    return Categories.find({})
        .sort(sort)
        .lean()
        .then((category) => {
            if (category.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: `Empty Database`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Had read ${category.length} lines`,
                category,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/category/readOne/:_id
module.exports.GET_ReadOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Categories.findOne({ _id })
        .lean()
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: 'Category is found',
                category,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/category/updateOne/:_id
module.exports.PUT_UpdateOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Categories.findOneAndUpdate({ _id }, { ...req.body }, { returnOriginal: false })
        .then((category) => {
            if (!category) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Category ${_id} updated successfully`,
                category,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/category/search?categoryName=
module.exports.GET_Search = async (req, res, next) => {
    const categoryName = req.query.categoryName;
    return await Categories.find({ categoryName: { $regex: categoryName, $options: 'i' }, state: 'active' })
        .select('_id categoryName')
        .limit(10)
        .exec()
        .then((categories) => {
            if (!categories) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not Found Category match condition',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${categories.length} categories`,
                categories,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/category?type=''&categoryName=''
module.exports.GET_ReadByType = async (req, res, next) => {
    const { categoryName = '', type } = req.query;
    return await Categories.find({ type, categoryName: { $regex: categoryName, $options: 'i' }, state: 'active' })
        .lean()
        .then((categories) => {
            if (categories.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not found any category match type',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${categories.length} categories`,
                categories,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};
