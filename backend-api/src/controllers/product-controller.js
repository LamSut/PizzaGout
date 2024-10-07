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
    const { id } = req.params;
    try {
        const product = await productService.getProduct(id);
        if (!product) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.json(JSend.success({ product }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving product with id=${id}`));
    }
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
                Location: `${req.baseUrl}/${product.id}`,
            })
            .json(JSend.success({ product }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the product'));
    }
}


async function updateProduct(req, res, next) {
    if (Object.keys(req.body).length === 0 && !req.file) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }
    if (!req.body?.name || typeof req.body.name !== 'string') {
        return next(new ApiError(400, 'Name should be a non-empty string'));
    }
    const { id } = req.params;
    try {
        const updated = await productService.updateProduct(id, {
            ...req.body,
            image: req.file ? `/public/upload/${req.file.filename}` : null,
        });
        if (!updated) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.json(JSend.success({ product: updated }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating product with id=${id}`));
    }
}

async function deleteProduct(req, res, next) {
    const { id } = req.params;
    try {
        const deleted = await productService.deleteProduct(id);
        if (!deleted) {
            return next(new ApiError(404, 'Product not found'));
        }
        return res.json(JSend.success());
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete product with id=${id}`));
    }
}

module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};