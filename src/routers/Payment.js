const { paymentController } = require('../controllers');
const router = require('express').Router();

router.get('/readMany', paymentController.GET_ReadMany);
router.post('/create', paymentController.POST_Create);
router.put('/updateOne/:_id', paymentController.PUT_UpdateOne);

module.exports = router;
