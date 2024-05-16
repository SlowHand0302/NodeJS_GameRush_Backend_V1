const { productTypeController } = require('../controllers');
const { upload } = require('../middlewares/multer');
const router = require('express').Router();

router.post('/create', upload.single('file'), productTypeController.POST_Create);
router.get('/readMany', productTypeController.GET_readMany);
router.get('/readByFilter', productTypeController.GET_readByFilter);
router.put('/updateOne/:_id', upload.single('file'), productTypeController.PUT_updateOne);
router.get('/search', productTypeController.GET_Search);
router.post('/uploadCK', upload.single('file'), productTypeController.POST_uploadImageCK);
module.exports = router;
