const knex = require('../database/knex');
function productRepository() {
    return knex('product');
}
function readProduct(payload) {
    return {
        name: payload.name,
        type: payload.type,
        description: payload.description,
        price: payload.price,
        image: payload.image,
    };
}

// Define functions for accessing the database

const Paginator = require('./paginator');
async function listProducts(query) {
    const { name, type, page = 1, limit = 6 } = query;
    const paginator = new Paginator(page, limit);
    let results = await productRepository()
        .where((builder) => {
            if (name) {
                builder.where('name', 'like', `%${name}%`);
            }
            if (type && type !== '0' && type !== 'false') {
                builder.where('type', 'in', [type]);
            }
        })
        .select(
            knex.raw('count(productId) OVER() AS recordCount'),
            'productId',
            'name',
            'type',
            'description',
            'price',
            'image'
        )
        .limit(paginator.limit)
        .offset(paginator.offset);
    let totalRecords = 0;
    results = results.map((result) => {
        totalRecords = result.recordCount;
        delete result.recordCount;
        return result;
    });
    return {
        metadata: paginator.getMetadata(totalRecords),
        products: results,
    };
}

async function getProduct(productId) {
    return productRepository().where('productId', productId).select('*').first();
}

async function createProduct(payload) {
    const product = readProduct(payload);
    const [productId] = await productRepository().insert(product);
    return { productId, ...product };
}

const { unlink } = require('node:fs');
async function updateProduct(productId, payload) {
    const updatedProduct = await productRepository()
        .where('productId', productId)
        .select('*')
        .first();
    if (!updatedProduct) {
        return null;
    }
    const update = readProduct(payload);
    if (!update.image) {
        delete update.image;
    }
    await productRepository().where('productId', productId).update(update);
    if (
        update.image &&
        updatedProduct.image &&
        update.image !== updatedProduct.image &&
        updatedProduct.image.startsWith('/public/upload')
    ) {
        unlink(`.${updatedProduct.image}`, (err) => { });
    }
    return { ...updatedProduct, ...update };
}

async function deleteProduct(productId) {
    const deletedProduct = await productRepository()
        .where('productId', productId)
        .select('image')
        .first();
    if (!deletedProduct) {
        return null;
    }
    await productRepository().where('productId', productId).del();
    if (
        deletedProduct.image &&
        deletedProduct.image.startsWith('/public/upload')
    ) {
        unlink(`.${deletedProduct.image}`, (err) => { });
    }
    return deletedProduct;
}

module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}