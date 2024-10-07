const express = require('express');
const multer = require('multer');
const itemController = require('../controllers/item-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    router.get('/:cartID/product', itemController.getAllItemsByCartID);

    router.get('/:cartID/product/:productID', itemController.getItemByCartIDAndProductID);

    router.post('/:cartID/product/:productID', itemController.addItemToCart);

    router.put('/:cartID/product/:productID', itemController.updateItemQuantity);

    router.delete('/:cartID/product/:productID', itemController.deleteItemFromCart)

    router.all('/:cartID/product', methodNotAllowed);
    router.all('/:cartID/product/:productID', methodNotAllowed);
}