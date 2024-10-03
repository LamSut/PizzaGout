const express = require('express');
const productController = require('../controllers/product-controller');
const { methodNotAllowed } = require('../controllers/error-controller')

const router = express.Router();

module.exports.setup = (app) => {
    app.use('/api/v1/product', router);

    /**
     * @swagger
     * /api/v1/product:
     *   get:
     *     summary: Get products by filter
     *     description: Get products by filter
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
     *       - contacts
     *     responses:
     *       200:
     *         description: A list of contacts
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
     *                     contacts:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/Product'
     *                     metadata:
     *                       $ref: '#/components/schemas/PaginationMetadata'
     */
    router.get('/', productController.listProducts);


    router.get('/:id', productController.getProduct);


    router.post('/', productController.createProduct);


    router.put('/:id', productController.updateProduct);


    router.delete('/:id', productController.deleteProduct);


    router.all('/', methodNotAllowed);
    router.all('/:id', methodNotAllowed);
};