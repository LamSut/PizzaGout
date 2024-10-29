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

function makeItemService() {
    const baseUrl = '/api/v1/item';

    async function fetchItems(page, limit = 6) {
        let url = `${baseUrl}?page=${page}&limit=${limit}`;
        const data = await efetch(url);
        return data;
    }

    async function fetchItem(itemId) {
        const { item } = await efetch(`${baseUrl}/${itemId}`);
        return item;
    }

    async function createItem(item) {
        return efetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
    }

    async function updateItem(item) {
        return efetch(`${baseUrl}/${item.itemId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        });
    }

    async function deleteItem(itemId) {
        return efetch(`${baseUrl}/${itemId}`, {
            method: 'DELETE',
        });
    }

    return {
        fetchItems,
        fetchItem,
        createItem,
        updateItem,
        deleteItem,
    };
}
export default makeItemService();