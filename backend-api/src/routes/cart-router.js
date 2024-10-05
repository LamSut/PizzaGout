const express = require('express');
const cartController = require('../controllers/cart-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    router.get('/:id', cartController.getCart)

    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
}