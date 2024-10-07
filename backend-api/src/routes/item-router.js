const express = require('express');
const multer = require('multer');
const itemController = require('../controllers/item-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    router.get('/:cartID/product', itemController.getAllItemsByCartID);

    router.all('/:cartID/product', methodNotAllowed);
    router.all('/:cartID/product/:productID', methodNotAllowed);
}