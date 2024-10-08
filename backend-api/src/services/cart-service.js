const knex = require('../database/knex');
function cartRepository() {
    return knex('cart');
}
function itemRepository() {
    return knex('item');
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
    const [cartId] = await cartRepository().insert(cart);
    return { cartId, ...cart };
}

async function getCart(cartId) {
    return cartRepository().where('cartId', cartId).select('*').first();
}

async function updateCart(cartId, payload) {
    const existingCart = await cartRepository()
        .where('cartId', cartId)
        .select('*')
        .first();
    if (!existingCart) {
        return null;
    }
    const update = readCart(payload);
    await cartRepository().where('cartId', cartId).update(update);
    return { ...existingCart, ...update };
}

async function deleteCart(cartId) {
    const deletedCart = await cartRepository()
        .where('cartId', cartId)
        .select('*')
        .first();

    if (!deletedCart) {
        return null;
    }

    await itemRepository()
        .where('cartId', cartId)
        .del();

    await cartRepository().where('cartId', cartId).del();
    return deletedCart;
}

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart
}