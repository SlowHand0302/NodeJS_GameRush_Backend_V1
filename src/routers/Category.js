const { categoryController } = require('../controllers');
const router = require('express').Router();

router.post('/create', categoryController.POST_Create);
router.get('/readMany', categoryController.GET_ReadMany);
router.get('/readOne/:_id', categoryController.GET_ReadOne);
router.get('/readBySort', categoryController.GET_ReadBySort);
router.get('/readByType', categoryController.GET_ReadByType);
router.put('/updateOne/:_id', categoryController.PUT_UpdateOne);
router.get('/search', categoryController.GET_Search);

module.exports = router;
