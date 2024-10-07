const express = require('express');
const productController = require('../controllers/product-controller');
const { methodNotAllowed } = require('../controllers/error-controller')
const imageUpload = require('../middlewares/image-upload-middleware');

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/product', router);

    /**
     * @swagger
     * /api/v1/product:
     *   get:
     *     summary: List products by filter
     *     description: List products by filter
     *     parameters:
     *       - in: query
     *         name: name
     *         schema:
     *           type: string
     *         description: Filter by product name
     *       - in: query
     *         name: type
     *         schema:
     *           type: string
     *           enum:
     *              - Pizza
     *              - Drink
     *              - Appetizer
     *         description: Filter by product type
     *       - $ref: '#/components/parameters/limitParam'
     *       - $ref: '#/components/parameters/pageParam'
     *     tags:
     *       - product
     *     responses:
     *       200:
     *         description: A list of products
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
     *                     products:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/Product'
     *                     metadata:
     *                       $ref: '#/components/schemas/PaginationMetadata'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.get('/', productController.listProducts);

    /**
     * @swagger
     * /api/v1/product/{id}:
     *   get:
     *     summary: Get product by ID
     *     description: Get product by ID
     *     parameters:
     *       - $ref: '#/components/parameters/productIdParam'
     *     tags:
     *       - product
     *     responses:
     *       200:
     *         description: A product
     *         $ref: '#/components/responses/200Product'
     *       404:
     *         description: Product not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.get('/:id', productController.getProduct);

    /**
     * @swagger
     * /api/v1/product:
     *   post:
     *     summary: Create a new product
     *     description: Create a new product
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     tags:
     *       - product
     *     responses:
     *       201:
     *         description: A new product
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
     *                     product:
     *                       $ref: '#/components/schemas/Product'
     *       400:
     *         description: Bad Request
     *         $ref: '#/components/responses/400'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.post('/', imageUpload, productController.createProduct);

    /**
     * @swagger
     * /api/v1/product/{id}:
     *   put:
     *     summary: Update product by ID
     *     description: Update product by ID
     *     parameters:
     *       - $ref: '#/components/parameters/productIdParam'
     *     requestBody:
     *       required: true
     *       content:
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/Product'
     *     tags:
     *       - product
     *     responses:
     *       200:
     *         description: An updated product
     *         $ref: '#/components/responses/200Product'
     *       400:
     *         description: Bad Request
     *         $ref: '#/components/responses/400'
     *       404:
     *         description: Product not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.put('/:id', imageUpload, productController.updateProduct);

    /**
     * @swagger
     * /api/v1/product/{id}:
     *   delete:
     *     summary: Delete product by ID
     *     description: Delete product by ID
     *     parameters:
     *       - $ref: '#/components/parameters/productIdParam'
     *     tags:
     *       - product
     *     responses:
     *       200:
     *         description: Product deleted
     *         $ref: '#/components/responses/200NoData'
     *       404:
     *         description: Product not found
     *         $ref: '#/components/responses/404'
     *       500:
     *         description: Internal Server Error
     *         $ref: '#/components/responses/500'
     */
    router.delete('/:id', productController.deleteProduct);


    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
};