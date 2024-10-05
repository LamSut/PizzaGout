const cartService = require('../services/cart-service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function createCart(req, res, next) {
    if (!req.body?.name || typeof req.body.name !== 'string') {
        return next(new ApiError(400, 'Name should be a non-empty string'));
    }

    try {
        const cart = await cartService.createCart({
            ...req.body,
        });

        return res
            .status(201)
            .set({
                Location: `${req.baseUrl}/${cart.id}`,
            })
            .json(JSend.success({ cart }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the cart'));
    }
}

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

async function updateCart(req, res, next) {
    const { id } = req.params;
    const cartUpdates = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address
    };

    if (!cartUpdates.name || !cartUpdates.phone || !cartUpdates.address) {
        return res.status(400).json({
            status: 'fail',
            message: 'All fields are required'
        });
    }

    try {
        const updatedCart = await cartService.updateCart(id, cartUpdates);
        if (!updatedCart) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cart not found'
            });
        }
        return res.json({
            status: 'success',
            data: {
                cart: updatedCart
            }
        });
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, 'An error occurred while updating the cart'));
    }
}

async function deleteCart(req, res, next) {
    const { id } = req.params;
    try {
        const deleted = await cartService.deleteCart(id);
        if (!deleted) {
            return next(new ApiError(404, 'Cart not found'));
        }
        return res.json(JSend.success());
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete cart with id=${id}`));
    }
}

module.exports = {
    createCart,
    getCart,
    updateCart,
    deleteCart
};