const itemService = require('../services/item-service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function getAllItemsByCartID(req, res, next) {
    const { id } = req.params;
    try {
        const items = await itemService.getAllItemsByCartID(id);
        if (!items.length) {
            return next(new ApiError(404, 'No items found for this cart'));
        }

        const formattedItems = items.map(item => ({
            cart_id: item.cart_id,
            product_id: item.product_id,
            item_name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image
        }));

        return res.json(JSend.success({ items: formattedItems }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving items for cart with id=${id}`));
    }
}

module.exports = {
    getAllItemsByCartID,
};