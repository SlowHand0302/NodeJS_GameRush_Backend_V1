const { Orders } = require('../models');

// /api/order/create
module.exports.POST_Create = async (req, res, next) => {
    return await Orders.create({ ...req.body })
        .then((order) => {
            return res.status(200).json({
                success: true,
                msg: 'Create new Order successfully',
                order,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/order/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
    const { sort } = req.query;

    return await Orders.find({})
        .populate([
            { path: 'paymentType', select: 'paymentName' },
            { path: 'customer', select: 'name email phoneNumb' },
            {
                path: 'products',
                select: 'productTypeId',
                populate: {
                    path: 'productTypeId',
                    select: 'name',
                },
            },
        ])
        .lean()
        .then((orders) => {
            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: `Empty Database`,
                });
            }

            return res.status(200).json({
                success: true,
                msg: `Found ${orders.length} lines`,
                orders,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/order/readOne/:_id
module.exports.GET_ReadOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Orders.findOne({ _id })
        .populate([
            { path: 'paymentType', select: 'paymentName' },
            { path: 'customer', select: 'name email phoneNumb' },
            {
                path: 'productTypes',
                // select: 'productTypeId productCode',
                populate: {
                    path: 'products',
                    // select: 'name',
                },
            },
        ])
        .lean()
        .then((order) => {
            if (!order) {
                return res.status(400).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: 'Order is found',
                order,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// /api/order/updateOne/:_id
module.exports.PUT_UpdateOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Orders.findOneAndUpdate({ _id }, { ...req.body }, { returnOriginal: false })
        .then((order) => {
            console.log(order)
            if (!order) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Update ${_id} successfully`,
                order,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/order/search?searchText=
module.exports.GET_Search = async (req, res, next) => {
    const { searchText } = req.query;
    const pipeline = [
        {
            $lookup: {
                from: 'users', // Ensure the correct name of the Users collection
                localField: 'customer',
                foreignField: '_id',
                as: 'customer',
            },
        },
        {
            $unwind: '$customer',
        },
        {
            $match: {
                $or: [
                    { 'customer.name': { $regex: searchText, $options: 'i' } },
                    { 'customer.email': { $regex: searchText, $options: 'i' } },
                ],
            },
        },
        {
            $project: { 'customer.password': 0, 'customer.createdAt': 0, 'customer.updatedAt': 0, 'customer.__v': 0 },
        },
    ];
    return await Orders.aggregate(pipeline)
        .exec()
        .then((orders) => {
            if (!orders) {
                return res.status(400).json({
                    success: true,
                    msg: 'Not found product types matched with conditions',
                    orders,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${orders.length} lines`,
                orders,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};
