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
    const baseUrl = '/api/v1/cart';

    async function fetchCart(cartId) {
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

    async function updateCart(cart) {
        return efetch(`${baseUrl}/${cart.cartId}`, {
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
    return {
        fetchCart,
        createCart,
        updateCart,
        deleteCart,
    };
}
export default makeCartService();