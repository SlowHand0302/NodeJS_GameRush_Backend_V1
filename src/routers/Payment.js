const { paymentController } = require('../controllers');
const router = require('express').Router();

router.get('/readMany', paymentController.GET_ReadMany);
router.post('/create', paymentController.POST_Create);
router.put('/updateOne/:_id', paymentController.PUT_UpdateOne);

router.get('/stripe/config', paymentController.GET_StripeConfig);
router.post('/stripe/create-payment-intent', paymentController.POST_StripePaymentIntent);

module.exports = router;
