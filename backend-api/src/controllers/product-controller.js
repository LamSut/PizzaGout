const productService = require('../services/product-service')
const ApiError = require('../api-error')
const JSend = require('../jsend');

async function listProducts(req, res, next) {
    let result = {
        products: [],
        metadata: {
            totalRecords: 0,
            firstPage: 1,
            lastPage: 1,
            page: 1,
            limit: 6,
        }
    };
    try {
        result = await productService.listProducts(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving products')
        );
    }
    return res.json(
        JSend.success({
            products: result.products,
            metadata: result.metadata,
        })
    );
}

async function getProduct(req, res, next) {
    const { product_id } = req.params;
    try {
        const product = await productService.getProduct(product_id);
        if (!product) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.json(JSend.success({ product }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving product with product_id=${product_id}`));
    }
}

function createProduct(req, res) {
    return res.status(201).json(JSend.success({ product: {} }));
}
async function createProduct(req, res, next) {
    if (!req.body?.name || typeof req.body.name !== 'string') {
        return next(new ApiError(400, 'Name should be a non-empty string'));
    }

    try {
        const product = await productService.createProduct({
            ...req.body,
            image: req.file ? `/public/upload/${req.file.filename}` : null,
        });

        return res
            .status(201)
            .set({
                Location: `${req.baseUrl}/${product.product_id}`,
            })
            .json(JSend.success({ product }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the product'));
    }
}


function updateProduct(req, res) {
    return res.json(JSend.success({ product: {} }));
}

function deleteProduct(req, res) {
    return res.json(JSend.success());
}

module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};