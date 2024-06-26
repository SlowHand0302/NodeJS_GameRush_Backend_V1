const { userController } = require('../controllers');

const router = require('express').Router();

router.post('/create', userController.POST_CreateUser);
router.get('/readMany', userController.GET_ReadMany);
router.get('/readOne/:_id', userController.GET_ReadOne);
router.put('/updateOne/:_id', userController.PUT_UpdateOne);
router.get('/readBySort', userController.GET_ReadBySort);
router.get('/search', userController.GET_Search);
router.post('/auth', userController.POST_Authentication);

module.exports = router;
