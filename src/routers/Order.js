const { orderController } = require('../controllers');
const router = require('express').Router();

router.post('/create', orderController.POST_Create);
router.get('/readMany', orderController.GET_ReadMany);
router.get('/readOne/:_id', orderController.GET_ReadOne);
router.put('/updateOne/:_id', orderController.PUT_UpdateOne);
router.get('/search', orderController.GET_Search);
router.get('/readMany/:customer', orderController.GET_ReadByCustomer);

module.exports = router;
