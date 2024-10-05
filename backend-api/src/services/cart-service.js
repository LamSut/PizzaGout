const knex = require('../database/knex');
function cartRepository(){
    return knex('cart');
}

async function getCart(id) {
    return cartRepository().where('id', id).select('*').first();
}

module.exports = {
    getCart,
}