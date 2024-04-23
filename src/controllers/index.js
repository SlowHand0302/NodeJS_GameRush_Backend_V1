const userController = require('./User');
const categoryController = require('./Category');
const SubCategory = require('./SubCategory');
const productTypeController = require('./ProductType');
const productController = require('./Product');
const orderController = require('./Order');
const paymentController = require('./Payment');

module.exports = {
    userController,
    categoryController,
    SubCategory,
    productTypeController,
    productController,
    orderController,
    paymentController,
};
