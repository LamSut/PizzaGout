import { computed } from 'vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import cartService from '@/services/cart.service';
import { useCartStore } from '@/store/cartStore'

export default function useCart() {
  const queryClient = useQueryClient();
  const cartStore = useCartStore()
  //CART INFORMATION

  function fetchCartInformation(id) {
    const { data: cart, error } = useQuery({
      queryKey: ['cart', id],
      queryFn: async () => {
        try {
          return await cartService.fetchCartInformation(id);
        } catch (error) {
          console.error('Error fetching cart:', error);
          cartStore.clearCartId();
        }
      }
    });
    return cart;
  }

  const createCartMutation = useMutation({
    mutationFn: cartService.createCart,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart'], data);
    },
    onError: (error) => {
      console.error('Error updating cart:', error);
    }
  });

  const updateCartMutation = useMutation({
    mutationFn: cartService.updateCartInformation,
    onSuccess: (data) => {
      queryClient.setQueryData(['cart', data.id], data);
    },
    onError: (error) => {
      console.error('Error updating cart:', error);
    }
  });

  //ITEMS IN CART

  function fetchItemsInCart(cartId) {
    const { data: cartItems, ...rest } = useQuery({
      queryKey: ['items', cartId],
      queryFn: () => cartService.fetchItemsInCart(cartId)
    });
    const items = computed(() => cartItems.value?.items ?? []);
    return { items, rest };
  }

  const addItemMutation = useMutation({
    mutationFn: cartService.addItemToCart,
    onSuccess: (data) => {
      queryClient.setQueryData(['items'], data);
    },
    onError: (error) => {
      console.error('Error updating cart:', error);
    }
  });

  return {
    fetchCartInformation,
    createCart: createCartMutation.mutate,
    updateCartInformation: updateCartMutation.mutate,

    fetchItemsInCart,
    addItemToCart: addItemMutation.mutate
  };
}
