const { orderController } = require('../controllers');
const router = require('express').Router();

router.post('/create', orderController.POST_Create);
router.get('/readMany', orderController.GET_ReadMany);
router.get('/readOne/:_id', orderController.GET_ReadOne);

module.exports = router;
