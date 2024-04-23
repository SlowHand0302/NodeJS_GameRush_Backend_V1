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
                sucess: false,
                msg: err,
            });
        });
};

// /api/order/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
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

// /api/order/readOne
module.exports.GET_ReadOne = async (req, res, next) => {
    const { _id } = req.params;
    return await Orders.findOne({ _id })
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
        .then((order) => {
            if (!order) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                sucess: true,
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
