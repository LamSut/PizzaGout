/**
* @param {string} url
* @param {RequestInit} options
* @returns Promise<Response>
*/

async function efetch(url, options = {}) {
    let result = {};
    let json = {};
    try {
        result = await fetch(url, options);
        json = await result.json();
    } catch (error) {
        throw new Error(error.message);
    }
    if (!result.ok || json.status !== 'success') {
        throw new Error(json.message);
    }
    return json.data;
}

function makeCartService() {

    async function sessionCartId() {
        const { cartId } = await efetch(`/api/v1`);
        return cartId;
    }

    const baseUrl = '/api/v1/cart';

    async function fetchCartInformation(cartId) {
        const { cart } = await efetch(`${baseUrl}/${cartId}`);
        return cart;
    }

    async function createCart(cart) {
        return efetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart),
        });
    }

    async function updateCartInformation(cart) {
        return efetch(`${baseUrl}/${cart.cartid}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cart),
        });
    }

    async function deleteCart(cartId) {
        return efetch(`${baseUrl}/${cartId}`, {
            method: 'DELETE',
        });
    }

    async function fetchItemsInCart(cartId) {
        const { data } = await efetch(`${baseUrl}/${cartId}/product`);
        return data;
    }

    // async function fetchItemInCart(cartId, itemId) {
    //     const { item } = await efetch(`${baseUrl}/${cartId}/product/${itemId}`);
    //     return item;
    // }

    async function addItemToCart(item) {
        return efetch(`${baseUrl}/${item.cartId}/product/${item.productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
    }

    // async function updateItemInCart(item) {
    //     return efetch(`${baseUrl}/${item.cartId}/product/${item.productId}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(item),
    //     });
    // }

    // async function deleteItemInCart(cartId, productId) {
    //     return efetch(`${baseUrl}/${cartId}/product/${productId}`, {
    //         method: 'DELETE',
    //     });
    // }

    return {
        sessionCartId,
        fetchCartInformation, //Xem thong tin ng dung
        createCart, //Ng dung tao gio hang
        updateCartInformation, //Cap nhat thong tin ng dung
        deleteCart, //Huy don hang

        fetchItemsInCart,
        // fetchItemInCart,
        addItemToCart,
        // updateItemInCart,
        // deleteItemInCart,
    };
}
export default makeCartService();