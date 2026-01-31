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

async function getAllItemsByCartId(cartId) {
    return itemRepository()
        .where('item.cartId', cartId)
        .join('product', 'item.productId', '=', 'product.productId')
        .select('item.cartId', 'item.productId', 'product.name', 'item.quantity', 'product.price', 'product.image');
}

async function getItemByCartIdAndProductId(cartId, productId) {
    return itemRepository()
        .where('item.cartId', cartId)
        .andWhere('item.productId', productId)
        .join('product', 'item.productId', '=', 'product.productId')
        .select('item.productId', 'item.quantity', 'product.name', 'product.price', 'product.image')
        .first();
}

async function addItemToCart(cartId, productId, quantity) {
    const newItem = {
        cartId: cartId,
        productId: productId,
        quantity: quantity,
    };

    await itemRepository().insert(newItem);

    return {
        cartId: cartId,
        productId: productId,
        quantity: quantity
    };
}

async function updateItemQuantity(cartId, productId, newQuantity) {
    await itemRepository()
        .where('cartId', cartId)
        .andWhere('productId', productId)
        .update({ quantity: newQuantity });

    return {
        cartId: cartId,
        productId: productId,
        quantity: newQuantity
    };
}

async function deleteItemFromCart(cartId, productId) {
    const deleted = await itemRepository()
        .where('cartId', cartId)
        .andWhere('productId', productId)
        .del();

    if (!deleted) {
        return null;
    }

    return { cartId: cartId, productId: productId };
}

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart,
    getAllItemsByCartId,
    getItemByCartIdAndProductId,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart
}