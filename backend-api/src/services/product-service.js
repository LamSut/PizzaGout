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
            knex.raw('count(id) OVER() AS recordCount'),
            'id',
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

async function getProduct(id) {
    return productRepository().where('id', id).select('*').first();
}

async function createProduct(payload) {
    const product = readProduct(payload);
    const [id] = await productRepository().insert(product);
    return { id, ...product };
}

const { unlink } = require('node:fs');
async function updateProduct(id, payload) {
    const updatedProduct = await productRepository()
        .where('id', id)
        .select('*')
        .first();
    if (!updatedProduct) {
        return null;
    }
    const update = readProduct(payload);
    if (!update.image) {
        delete update.image;
    }
    await productRepository().where('id', id).update(update);
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


module.exports = {
    listProducts,
    getProduct,
    createProduct,
    updateProduct,
}