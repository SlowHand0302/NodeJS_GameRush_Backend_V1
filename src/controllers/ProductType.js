const { ProductTypes } = require('../models');
const fse = require('fs-extra');
const { URL } = require('url');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
require('dotenv').config();

// /api/productType/create
module.exports.POST_Create = async (req, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        return res.status(300).json({
            success: false,
            msg: 'Image not found',
        });
    }
    return await ProductTypes.create({ ...req.body, image: process.env.DOMAIN + '/uploads/' + file.filename })
        .then((productType) => {
            return res.status(200).json({
                success: true,
                msg: 'Create new product type successfully',
                productType,
            });
        })
        .catch((err) => {
            fse.unlinkSync(file.path);
            return res.status(500).json({
                success: false,
                msg: err.message,
            });
        });
};

// /api/productType/readMany
module.exports.GET_readMany = async (req, res, next) => {
    return await ProductTypes.find({})
        .populate([{ path: 'categories', select: 'categoryName' }, { path: 'products' }])

        // .populate({ path: 'subCategories', select: 'subCategoryName' })
        .lean()
        .then((productTypes) => {
            if (productTypes.length === 0) {
                return res.status(400).json({
                    success: false,
                    msg: 'Empty Database',
                });
            }
            return res.status(200).json({
                success: true,
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
    const { sort = 'createdAt', categories, minPrice, maxPrice, _id, slug } = req.query;
    let $match = {};
    const pipeline = [
        {
            $lookup: {
                from: 'categories', // Assuming your Categories collection is named 'categories'
                localField: 'categories',
                foreignField: '_id',
                as: 'categories',
            },
        },
        {
            $sort: {
                [`${sort.includes('-') ? sort.split('-')[1] : sort}`]: sort.includes('-') ? -1 : 1,
            },
        },
    ];
    // create query for filter by sell price range
    if (minPrice || maxPrice) {
        $match.sellPrice = {};
        if (minPrice) {
            $match.sellPrice.$gte = Number(minPrice);
            delete req.query.minPrice;
        }
        if (maxPrice) {
            $match.sellPrice.$lte = Number(maxPrice);
            delete req.query.maxPrice;
        }
    }
    // create query for filter by category-name (1 or many)
    if (categories) {
        // $match['categories.categoryName'] = categories;
        $match['categories.categoryName'] = typeof categories === 'string' ? categories : { $all: [...categories] };
        delete req.query.categories;
    }
    // create query for filter by category-slug (1 or many)
    if (slug) {
        // $match['categories.categoryName'] = categories;
        $match['categories.slug'] = typeof slug === 'string' ? slug : { $all: [...slug] };
        delete req.query.slug;
    }
    // convert string to boolean for filter
    if (req.query?.isHot) {
        $match['isHot'] = req.query.isHot === 'true' ? true : false;
        delete req.query.isHot;
    }
    if (_id && ObjectId.isValid(_id)) {
        $match._id = new ObjectId(_id);
        delete req.query._id;
    }

    delete req.query.sort;
    // console.log($match);
    return await ProductTypes.aggregate([...pipeline, { $match: { ...$match, ...req.query } }])
        .exec()
        .then((productTypes) => {
            if (productTypes.length === 0) {
                return res.status(400).json({
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

// /api/productType/updateOne/:_id
module.exports.PUT_updateOne = async (req, res, next) => {
    const { _id } = req.params;
    const updateData = { ...req.body };
    if (req.file) {
        updateData['image'] = process.env.DOMAIN + '/uploads/' + req.file.filename;
    }
    return await ProductTypes.findByIdAndUpdate(
        { _id },
        { ...updateData },
        { overwrite: true },
        { returnOriginal: true },
    )
        .then((productType) => {
            if (req.file) {
                const parsedUrl = new URL(productType.image);
                fse.unlinkSync('./src/public' + parsedUrl.pathname);
            }
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

// api/productType/search?name=
module.exports.GET_Search = async (req, res, next) => {
    const { name } = req.query;
    return await ProductTypes.find({ name: { $regex: name, $options: 'i' }, status: 'available' })
        .limit(10)
        .exec()
        .then((productTypes) => {
            if (!productTypes) {
                return res.status(400).json({
                    success: false,
                    msg: 'Not Found Product Types match condition ',
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${productTypes.length} Product Types`,
                productTypes,
            });
        })
        .catch((error) => {
            return res.status(500).json({
                success: true,
                msg: error,
            });
        });
};

// /api/productType/uploadCK
module.exports.POST_uploadImageCK = async (req, res, next) => {
    const file = req.file;
    if (!file) {
        return res.status(500).json({
            success: false,
            msg: 'File not found',
        });
    }
    return res.status(200).json({
        success: true,
        url: process.env.DOMAIN + '/uploads/' + file.filename,
    });
};
