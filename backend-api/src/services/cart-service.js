const knex = require('../database/knex');
function cartRepository(){
    return knex('cart');
}

function readCart(payload) {
    return {
        name: payload.name,
        phone: payload.phone,
        address: payload.address
    };
}

async function createCart(payload) {
    const cart = readCart(payload);
    const [id] = await cartRepository().insert(cart);
    return { id, ...cart };
}

async function getCart(id) {
    return cartRepository().where('id', id).select('*').first();
}

async function updateCart(id, payload) {
    const existingCart = await cartRepository()
        .where('id', id)
        .select('*')
        .first();
    if (!existingCart) {
        return null;
    }
    const update = readCart(payload);
    await cartRepository().where('id', id).update(update);
    return { ...existingCart, ...update };
}

async function deleteCart(id) {
    const deletedCart = await cartRepository()
        .where('id', id)
        .select('*')
        .first();
        
    if (!deletedCart) {
        return null;
    }
    await cartRepository().where('id', id).del();
    return deletedCart;
}

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart
}