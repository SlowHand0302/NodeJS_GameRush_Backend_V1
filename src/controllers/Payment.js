const { Payments } = require('../models');

// api/payment/readMany
module.exports.GET_ReadMany = async (req, res, next) => {
    return await Payments.find({})
        .then((payments) => {
            if (payments.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg: `Empty Database`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Found ${payments.length} lines`,
                payments,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/payment/create
module.exports.POST_Create = async (req, res, next) => {
    return await Payments.create({ ...req.body })
        .then((payment) => {
            return res.status(200).json({
                success: true,
                msg: 'Create new payment successfully',
                payment,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};

// api/payment/updateOne/:_id
module.exports.PUT_UpdateOne = async (req, res, next) => {
    const { _id } = req.params;
    return Payments.findOneAndUpdate({ _id }, { ...req.body }, { returnOriginal: false })
        .then((payment) => {
            if (!payment) {
                return res.status(404).json({
                    success: false,
                    msg: `Not found ${_id}`,
                });
            }
            return res.status(200).json({
                success: true,
                msg: `Update ${_id} successfully`,
                payment,
            });
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                msg: err,
            });
        });
};
