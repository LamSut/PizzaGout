const itemService = require('../services/item-service');
const ApiError = require('../api-error');
const JSend = require('../jsend');

async function getAllItemsByCartID(req, res, next) {
    const cartID = req.params.cartID;
    try {
        const items = await itemService.getAllItemsByCartID(cartID);
        if (!items.length) {
            return next(new ApiError(404, 'No items found for this cart, or cart may not exists'));
        }

        const formattedItems = items.map(item => ({
            cart_id: item.cart_id,
            product_id: item.product_id,
            product_name: item.name,
            quantity: item.quantity,
            price_for_one_item: item.price,
            image: item.image
        }));

        return res.json(JSend.success({ items: formattedItems }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving items for cart with id=${cartID}`));
    }
}

async function getItemByCartIDAndProductID(req, res, next) {
    const { cartID, productID } = req.params;
    try {
        const item = await itemService.getItemByCartIDAndProductID(cartID, productID);
        if (!item) {
            return next(new ApiError(404, 'Item not found in cart'));
        }

        const formattedItem = {
            product_id: item.product_id,
            product_name: item.name,
            quantity: item.quantity,
            price_for_one_item: item.price,
            image: item.image,
        };

        return res.json(JSend.success({ item: formattedItem }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error retrieving item for cart with id=${cartID} and product with id=${productID}`));
    }
}

async function addItemToCart(req, res, next) {
    const { cartID, productID } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return next(new ApiError(400, 'Quantity should be a positive number'));
    }

    try {
        const existingItem = await itemService.getItemByCartIDAndProductID(cartID, productID);

        if (existingItem) {
            //Khách hàng đã quên mình đã thêm item rồi -> cập nhật bằng quantity mới
            const updatedItem = await itemService.updateItemQuantity(cartID, productID, quantity);
            return res.json(JSend.success({ item: updatedItem }));
        } else {
            const newItem = await itemService.addItemToCart(cartID, productID, quantity);
            return res.status(201).json(JSend.success({ item: newItem }));
        }
    }
    catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error adding product to cart with id=${cartID}`));
    }
}

async function updateItemQuantity(req, res, next) {
    const { cartID, productID } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return next(new ApiError(400, 'Quantity should be a positive number'));
    }

    try {
        const existingItem = await itemService.getItemByCartIDAndProductID(cartID, productID);

        if (!existingItem) {
            return next(new ApiError(404, `Item with cart_id=${cartID} and product_id=${productID} not found`));
        }

        const updatedItem = await itemService.updateItemQuantity(cartID, productID, quantity);
        return res.json(JSend.success({ item: updatedItem }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error updating quantity for product with id=${productID} in cart=${cartID}`));
    }
}

async function deleteItemFromCart(req, res, next) {
    const { cartID, productID } = req.params;

    try {
        const deletedItem = await itemService.deleteItemFromCart(cartID, productID);
        if (!deletedItem) {
            return next(new ApiError(404, `Item with CartID=${cartID} and ProductID=${productID} not found`));
        }
        return res.json(JSend.success({ message: 'Item deleted successfully' }));
    } catch (error) {
        console.log(error);
        return next(new ApiError(500, `Error deleting item with CartID=${cartID} and ProductID=${productID}`));
    }
}

module.exports = {
    getAllItemsByCartID,
    getItemByCartIDAndProductID,
    addItemToCart,
    updateItemQuantity,
    deleteItemFromCart
};