import { defineStore } from 'pinia';
import cartService from '@/services/cart.service';

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartId: null
  }),
  actions: {
    async fetchCartId() {
      const cartId = await cartService.sessionCartId();
      this.cartId = cartId;
    },
    async clearCartId() {
      const cartId = await cartService.clearCartId();
      this.cartId = cartId;
    },
  },
  persist: true
});

export const useItemStore = defineStore('itemStore', {
  state: () => ({
    items: []
  }),
  actions: {
    addItem(product) {
      const existingItem = this.items.find((item) => item.id === product.productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({
          id: product.productId,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1
        });
      }
    },
    clearItems() {
      this.items = [];
    },
    removeItem(id) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }
  },
  persist: true
});
