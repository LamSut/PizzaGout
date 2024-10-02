const express = require('express');
const productController = require('../controllers/product-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/product', router);

    // Route definitions with consistent indentation
    router.get('/', productController.listProducts);
    router.get('/:id', productController.getProduct);
    router.post('/', productController.createProduct);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', productController.deleteProduct);
    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
};