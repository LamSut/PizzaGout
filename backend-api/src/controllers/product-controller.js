function createProduct(req, res) {
    return res.status(201).json({ product: {} });
}

function getProduct(req, res) {
    const filters = [];
    const { name, type } = req.query;

    if (name) {
        filters.push(`name=${name}`);
    }

    if (type !== undefined) {
        filters.push(`type=${type}`);
    }

    console.log(filters.join('&'));

    return res.json({ product: [] });
}

function updateProduct(req, res) {
    return res.json({ product: {} });
}

function deleteProduct(req, res) {
    return res.json({
        message: 'Product deleted!',
    });
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};