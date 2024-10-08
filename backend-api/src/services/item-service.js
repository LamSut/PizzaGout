const knex = require('../database/knex');
function itemRepository() {
    return knex('item');
}

async function getAllItemsByCartId(cartId) {
    return itemRepository()
        .where('cartId', cartId)
        .join('product', 'item.productId', '=', 'product.productId')
        .select('item.cartId', 'item.productId', 'product.name', 'item.quantity', 'product.price', 'product.image');
}

async function getItemByCartIdAndProductId(cartId, productId) {
    return itemRepository()
        .where('cartId', cartId)
        .andWhere('productId', productId)
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
    getAllItemsByCartId,
    getItemByCartIdAndProductId,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart
}