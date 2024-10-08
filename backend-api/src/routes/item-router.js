const express = require('express');
const multer = require('multer');
const itemController = require('../controllers/item-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    router.get('/:cartId/product', itemController.getAllItemsByCartId);

    router.get('/:cartId/product/:productId', itemController.getItemByCartIdAndProductId);

    router.post('/:cartId/product/:productId', itemController.addItemToCart);

    router.put('/:cartId/product/:productId', itemController.updateItemQuantity);

    router.delete('/:cartId/product/:productId', itemController.deleteItemFromCart)

    router.all('/:cartId/product', methodNotAllowed);
    router.all('/:cartId/product/:productId', methodNotAllowed);
}