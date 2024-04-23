const UserRouter = require('./User');
const CategoryRouter = require('./Category');
const SubCategory = require('./SubCategory');
const ProductTypeRouter = require('./ProductType');
const ProductRouter = require('./Product');
const OrderRouter = require('./Order');
const PaymentController = require('./Payment');

const express = require('express');
const router = express.Router();

router.use('/user', UserRouter);
router.use('/category', CategoryRouter);
router.use('/subcategory', SubCategory);
router.use('/productType', ProductTypeRouter);
router.use('/product', ProductRouter);
router.use('/order', OrderRouter);
router.use('/payment', PaymentController);

module.exports = router;
