const express = require('express');
const multer = require('multer');
const cartController = require('../controllers/cart-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();
const upload = multer();

module.exports.setup = (app) => {
    app.use('/api/v1/cart', router);

    /**
     * @swagger
     * /api/v1/cart:
     *   post:
     *     summary: Create a new cart
     *     description: Create a new cart
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: cart name
     *               phone:
     *                 type: string
     *                 description: phone number
     *               address:
     *                 type: string
     *                 description: address
     *     tags:
     *       - CART
     *     responses:
     *       201:
     *         description: A new cart
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: The response status
     *                   enum: [success]
     *                 data:
     *                   type: object
     *                   properties:
     *                     cart:
     *                       $ref: '#/components/schemas/Cart'
     *       400:
     *         description: Bad Request
     *         $ref: '#/components/responses/400'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.post('/', upload.none(), cartController.createCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}:
     *   get:
     *     summary: Get cart information by ID
     *     description: Get cart information by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - CART
     *     responses:
     *       200:
     *         description: A cart
     *         $ref: '#/components/responses/200Cart'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.get('/:cartId', cartController.getCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}:
     *   put:
     *     summary: Update cart information by ID
     *     description: Update cart information by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: cart name
     *               phone:
     *                 type: string
     *                 description: phone number
     *               address:
     *                 type: string
     *                 description: address
     *     tags:
     *       - CART
     *     responses:
     *       200:
     *         description: An updated cart
     *         $ref: '#/components/responses/200Cart'
     *       400:
     *         description: Bad Request
     *         $ref: '#/components/responses/400'
     *       404:
     *         description: Cart not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.put('/:cartId', upload.none(), cartController.updateCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}:
     *   delete:
     *     summary: Delete cart by ID
     *     description: Delete cart by ID
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - CART
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
    router.delete('/:cartId', cartController.deleteCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product:
     *   get:
     *     summary: Get all items by cartId
     *     description: Get all items by cartId
     *     parameters:
     *       - $ref: '#/components/parameters/cartIdParam'
     *     tags:
     *       - CART ITEM
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
    router.get('/:cartId/product', cartController.getAllItemsByCartId);

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
     *       - CART ITEM
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
    router.get('/:cartId/product/:productId', cartController.getItemByCartIdAndProductId);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product/{productId}:
     *   post:
     *     summary: Add item to a cart
     *     description: Add item to a cart
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
     *       - CART ITEM
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
    router.post('/:cartId/product/:productId', upload.none(), cartController.addItemToCart);

    /**
     * @swagger
     * /api/v1/cart/{cartId}/product/{productId}:
     *   put:
     *     summary: Update quantity of item in a cart
     *     description: Update quantity of item in a cart
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
     *       - CART ITEM
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
    router.put('/:cartId/product/:productId', upload.none(), cartController.updateItemQuantity);

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
     *       - CART ITEM
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
    router.delete('/:cartId/product/:productId', cartController.deleteItemFromCart)

    router.all('/', methodNotAllowed);
    router.all('/:cartId', methodNotAllowed);
    router.all('/:cartId/product', methodNotAllowed);
    router.all('/:cartId/product/:productId', methodNotAllowed);
}