const { productTypeController } = require('../controllers');
const router = require('express').Router();

router.post('/create', productTypeController.POST_Create);
router.get('/readMany', productTypeController.GET_readMany);
router.get('/readByFilter', productTypeController.GET_readByFilter);
router.put('/updateOne/:_id', productTypeController.PUT_updateOne);
module.exports = router;
