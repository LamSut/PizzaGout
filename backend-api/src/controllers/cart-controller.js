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

        if (req.session) {
            req.session.cartId = cart.cartId;
            req.session.save((saveError) => {
                if (saveError) {
                    console.error('Error saving cartId to session:', saveError);
                    return next(new ApiError(500, 'An error occurred while creating the cart'));
                }
            });
        } else {
            console.warn('Session middleware is not enabled.');
        }

        return res
            .status(201)
            .set({
                Location: `${req.baseUrl}/${cart.cartId}`,
            })
            .json(JSend.success({ cart }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, 'An error occurred while creating the cart'));
    }
}

async function getCart(req, res, next) {
    const { cartId } = req.params;
    // console.log('cartId from session:', req.session.cartId);
    try {
        const cart = await cartService.getCart(cartId);
        if (!cart) {
            return next(new ApiError(404, 'Cart not found'));
        }
        return res.json(JSend.success({ cart }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving cart with id=${cartId}`));
    }
}

async function updateCart(req, res, next) {
    const { cartId } = req.params;
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
        const updatedCart = await cartService.updateCart(cartId, cartUpdates);
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
    const { cartId } = req.params;
    try {
        const deleted = await cartService.deleteCart(cartId);
        if (!deleted) {
            return next(new ApiError(404, 'Cart not found'));
        }
        return res.json(JSend.success());
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Could not delete cart with id=${cartId}`));
    }
}

async function getAllItemsByCartId(req, res, next) {
    const cartId = req.params.cartId;
    try {
        const items = await cartService.getAllItemsByCartId(cartId);
        if (!items.length) {
            return next(new ApiError(404, 'No items found for this cart, or cart may not exists'));
        }

        const formattedItems = items.map(item => ({
            cartId: item.cartId,
            productId: item.productId,
            productName: item.name,
            quantity: item.quantity,
            priceForOneItem: item.price,
            image: item.image
        }));

        return res.json(JSend.success({ items: formattedItems }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving items for cart with id=${cartId}`));
    }
}

async function getItemByCartIdAndProductId(req, res, next) {
    const { cartId, productId } = req.params;
    try {
        const item = await cartService.getItemByCartIdAndProductId(cartId, productId);
        if (!item) {
            return next(new ApiError(404, 'Item not found in cart, or cart may not exists'));
        }

        const formattedItem = {
            productId: item.productId,
            productName: item.name,
            quantity: item.quantity,
            priceForOneItem: item.price,
            image: item.image,
        };

        return res.json(JSend.success({ item: formattedItem }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving item for cart with id=${cartId} and product with id=${productId}`));
    }
}

async function addItemToCart(req, res, next) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return next(new ApiError(400, 'Quantity should be a positive number'));
    }

    try {
        const existingItem = await cartService.getItemByCartIdAndProductId(cartId, productId);

        if (existingItem) {
            //Khách hàng đã quên mình đã thêm item rồi -> cập nhật bằng quantity mới
            const updatedItem = await cartService.updateItemQuantity(cartId, productId, quantity);
            return res.json(JSend.success({ item: updatedItem }));
        } else {
            const newItem = await cartService.addItemToCart(cartId, productId, quantity);
            return res.status(201).json(JSend.success({ item: newItem }));
        }
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error adding product to cart with id=${cartId}`));
    }
}

async function updateItemQuantity(req, res, next) {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return next(new ApiError(400, 'Quantity should be a positive number'));
    }

    try {
        const existingItem = await cartService.getItemByCartIdAndProductId(cartId, productId);

        if (!existingItem) {
            return next(new ApiError(404, `Item with cart id=${cartId} and product id=${productId} not found`));
        }

        const updatedItem = await cartService.updateItemQuantity(cartId, productId, quantity);
        return res.json(JSend.success({ item: updatedItem }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating quantity for product with id=${productId} in cart=${cartId}`));
    }
}

async function deleteItemFromCart(req, res, next) {
    const { cartId, productId } = req.params;

    try {
        const deletedItem = await cartService.deleteItemFromCart(cartId, productId);
        if (!deletedItem) {
            return next(new ApiError(404, `Item with CartId=${cartId} and ProductId=${productId} not found`));
        }
        return res.json(JSend.success({ message: 'Item deleted successfully' }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error deleting item with CartId=${cartId} and ProductId=${productId}`));
    }
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
};