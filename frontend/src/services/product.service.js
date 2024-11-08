import { DEFAULT_IMAGE } from '@/constants';
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

function makeProductService() {
    const baseUrl = '/api/v1/product';

    async function fetchProducts(page, limit = 8) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        const data = await efetch(url);
        data.products = data.products.map((product) => {
            return {
                ...product,
                image: product.image ?? DEFAULT_IMAGE
            };
        });
        return data;
    }

    async function fetchProduct(productId) {
        const { product } = await efetch(`${baseUrl}/${productId}`);
        return {
            ...product,
            image: product.image ?? DEFAULT_IMAGE
        };
    }

    // This project is User interface, so no write Products

    // async function createProduct(product) {
    //     return efetch(baseUrl, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(product),
    //     });
    // }

    // async function deleteAllProducts() {
    //     return efetch(baseUrl, {
    //         method: 'DELETE',
    //     });
    // }

    // async function updateProduct(product) {
    //     return efetch(`${baseUrl}/${product.productId}`, {
    //         method: 'PUT',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(product),
    //     });
    // }

    // async function deleteProduct(productId) {
    //     return efetch(`${baseUrl}/${productId}`, {
    //         method: 'DELETE',
    //     });
    // }

    return {
        fetchProducts,
        fetchProduct,
        // createProduct,
        // updateProduct,
        // deleteProduct,
        // deleteAllProducts,
    };
}
export default makeProductService();