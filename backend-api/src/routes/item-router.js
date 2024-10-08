const express = require('express');
const multer = require('multer');
const itemController = require('../controllers/item-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product:
     *   get:
     *     summary: Get all items by cartId
     *     description: Get all items by cartId
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - ITEM
     *     responses:
     *       200:
     *         description: A list of items
     *         $ref: '#/components/responses/200Item'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.get('/:cartId/product', itemController.getAllItemsByCartId);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product/{productId}:
     *   get:
     *     summary: Get item by cartId and productId
     *     description: Get item by cartId and productId
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *       - $ref: '#/components/parameters/productIdParam'
     *     tags:
     *       - ITEM
     *     responses:
     *       200:
     *         description: A list of items
     *         $ref: '#/components/responses/200Item'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.get('/:cartId/product/:productId', itemController.getItemByCartIdAndProductId);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product/{productId}:
     *   post:
     *     summary: Add item to cart
     *     description: Add item to cart
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *       - $ref: '#/components/parameters/productIdParam'
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               quantity:
     *                 type: integer
     *                 example: 1
     *                 description: quantity of item
     *             required:
     *               - quantity
     *     tags:
     *       - ITEM
     *     responses:
     *       200:
     *         description: A list of items
     *         $ref: '#/components/responses/200Item'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.post('/:cartId/product/:productId', upload.none(), itemController.addItemToCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product/{productId}:
     *   put:
     *     summary: Update quantity of item
     *     description: Update quantity of item
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *       - $ref: '#/components/parameters/productIdParam'
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               quantity:
     *                 type: integer
     *                 example: 1
     *                 description: quantity of item
     *             required:
     *               - quantity
     *     tags:
     *       - ITEM
     *     responses:
     *       200:
     *         description: A list of items
     *         $ref: '#/components/responses/200Item'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.put('/:cartId/product/:productId', upload.none(), itemController.updateItemQuantity);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product/{productId}:
     *   delete:
     *     summary: Delete item by cartId and productId
     *     description: Delete item by cartId and productId
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *       - $ref: '#/components/parameters/productIdParam'
     *     tags:
     *       - ITEM
     *     responses:
     *       200:
     *         description: Cart deleted
     *         $ref: '#/components/responses/200NoData'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.delete('/:cartId/product/:productId', itemController.deleteItemFromCart)

    router.all('/:cartId/product', methodNotAllowed);
    router.all('/:cartId/product/:productId', methodNotAllowed);
}