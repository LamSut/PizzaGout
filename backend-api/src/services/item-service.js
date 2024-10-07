const knex = require('../database/knex');
function itemRepository() {
    return knex('item');
}

async function getAllItemsByCartID(cartID) {
    return itemRepository()
        .where('cart_id', cartID)
        .join('product', 'item.product_id', '=', 'product.id')
        .select('item.cart_id','item.product_id', 'product.name', 'item.quantity', 'product.price', 'product.image');
}


module.exports = {
    getAllItemsByCartID,
}