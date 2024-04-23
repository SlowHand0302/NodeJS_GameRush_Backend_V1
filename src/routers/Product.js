const { productController } = require('../controllers');
const router = require('express').Router();

router.post('/create', productController.POST_Create);
router.get('/readMany', productController.GET_ReadMany);
router.put('/updateOne/:_id', productController.PUT_UpdateOne);

module.exports = router;
