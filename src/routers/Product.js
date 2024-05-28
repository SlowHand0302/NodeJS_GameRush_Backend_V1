const { productController } = require('../controllers');
const router = require('express').Router();

router.post('/create', productController.POST_Create);
router.get('/readMany', productController.GET_ReadMany);
router.put('/updateOne/:_id', productController.PUT_UpdateOne);
router.get('/countByType/:productTypeId', productController.GET_CountByType);
router.get('/readByType/:productTypeId', productController.GET_ReadByType);
router.get('/readBySort', productController.GET_ReadBySort);
router.get('/readByTypeAndQuantity', productController.GET_ReadByTypeAndQuantity);

module.exports = router;
