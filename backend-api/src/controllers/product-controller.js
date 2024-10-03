const productService = require('../services/product-service')
const ApiError = require('../api-error')
const JSend = require('../jsend');

function listProducts(req, res) {
    const filters = [];
    const { name, type } = req.query;

    if (name) { filters.push(`name=${name}`); }
    if (type !== undefined) { filters.push(`type=${type}`); }

    console.log(filters.join('&'));

    return res.json(
        JSend.success({
            products: [],
        })
    );
}
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
        result = await productService.getProducts(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        );
    }

    return res.json(
        JSend.success({
            products: result.products,
            metadata: result.metadata,
        })
    );
}


function getProduct(req, res) {
    return res.json(JSend.success({ product: {} }));
}

function createProduct(req, res) {
    return res.status(201).json(JSend.success({ product: {} }));
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