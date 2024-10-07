const knex = require('../database/knex');
function itemRepository() {
    return knex('item');
}

async function getAllItemsByCartID(cartID) {
    return itemRepository()
        .where('cart_id', cartID)
        .join('product', 'item.product_id', '=', 'product.id')
        .select('item.cart_id', 'item.product_id', 'product.name', 'item.quantity', 'product.price', 'product.image');
}

async function getItemByCartIDAndProductID(cartID, productID) {
    return itemRepository()
        .where('cart_id', cartID)
        .andWhere('product_id', productID)
        .join('product', 'item.product_id', '=', 'product.id')
        .select('item.product_id', 'item.quantity', 'product.name', 'product.price', 'product.image')
        .first();
}

async function addItemToCart(cartID, productID, quantity) {
    const newItem = {
        cart_id: cartID,
        product_id: productID,
        quantity: quantity,
    };
    
    await itemRepository().insert(newItem);
    
    return {
        cart_id: cartID,
        product_id: productID,
        quantity: quantity
    };
}

async function updateItemQuantity(cartID, productID, newQuantity) {
    await itemRepository()
        .where('cart_id', cartID)
        .andWhere('product_id', productID)
        .update({ quantity: newQuantity });

    return {
        cart_id: cartID,
        product_id: productID,
        quantity: newQuantity
    };
}

async function deleteItemFromCart(cartID, productID) {
    const deleted = await itemRepository()
        .where('cart_id', cartID)
        .andWhere('product_id', productID)
        .del();

    if (!deleted) {
        return null;
    }

    return { cart_id: cartID, product_id: productID };
}


module.exports = {
    getAllItemsByCartID,
    getItemByCartIDAndProductID,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart
}