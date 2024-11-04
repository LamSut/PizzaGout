import { defineStore } from 'pinia'
import cartService from '@/services/cart.service';

export const useCartStore = defineStore('cart', {
    state: () => ({
        cartId: null,
    }),
    actions: {
        async fetchCartId() {
            const cartId = await cartService.sessionCartId();
            this.cartId = cartId;
        },
    },
})