const { SubCategory } = require('../controllers');
const router = require('express').Router();

router.post('/create', SubCategory.POST_Create);
router.get('/readMany', SubCategory.GET_ReadMany);
router.get('/readByCategory/:category', SubCategory.GET_ReadByCategory);
router.put('/updateOne/:_id', SubCategory.PUT_UpdateOne);

module.exports = router;
