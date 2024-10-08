const itemService = require('../services/item-service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function getAllItemsByCartId(req, res, next) {
    const cartId = req.params.cartId;
    try {
        const items = await itemService.getAllItemsByCartId(cartId);
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
        const item = await itemService.getItemByCartIdAndProductId(cartId, productId);
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
        const existingItem = await itemService.getItemByCartIdAndProductId(cartId, productId);

        if (existingItem) {
            //Khách hàng đã quên mình đã thêm item rồi -> cập nhật bằng quantity mới
            const updatedItem = await itemService.updateItemQuantity(cartId, productId, quantity);
            return res.json(JSend.success({ item: updatedItem }));
        } else {
            const newItem = await itemService.addItemToCart(cartId, productId, quantity);
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
        const existingItem = await itemService.getItemByCartIdAndProductId(cartId, productId);

        if (!existingItem) {
            return next(new ApiError(404, `Item with cart id=${cartId} and product id=${productId} not found`));
        }

        const updatedItem = await itemService.updateItemQuantity(cartId, productId, quantity);
        return res.json(JSend.success({ item: updatedItem }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating quantity for product with id=${productId} in cart=${cartId}`));
    }
}

async function deleteItemFromCart(req, res, next) {
    const { cartId, productId } = req.params;

    try {
        const deletedItem = await itemService.deleteItemFromCart(cartId, productId);
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
    getAllItemsByCartId,
    getItemByCartIdAndProductId,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart
};