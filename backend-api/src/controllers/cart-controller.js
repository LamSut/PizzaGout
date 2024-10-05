const cartService = require('../services/cart-service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function getCart(req, res, next) {
    const { id } = req.params;
    try {
        const cart = await cartService.getCart(id);
        if (!cart) {
            return next(new ApiError(404, 'Cart not found'));
        }
        return res.json(JSend.success({ cart }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving cart with id=${id}`));
    }
}

module.exports = {
    getCart,
};