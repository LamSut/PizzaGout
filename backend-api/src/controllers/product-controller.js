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