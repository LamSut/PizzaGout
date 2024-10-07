const express = require('express');
const multer = require('multer');
const itemController = require('../controllers/item-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart/:id/product', router);

    router.get('/', itemController.getAllItemsByCartID);

    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
}