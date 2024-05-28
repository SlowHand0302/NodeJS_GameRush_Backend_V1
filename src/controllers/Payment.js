const { Payments } = require('../models');
const Stripe = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.REACT_APP_STRIPE_SECRET_KEY);

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

// api/payment/stripe/config
module.exports.GET_StripeConfig = async (req, res, next) => {
    return res.status(200).json({
        publicshableKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY,
    });
};

// api/payment/stripe/create-payment-intent
module.exports.POST_StripePaymentIntent = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'eur',
            amount: 1999,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};
