import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import cartService from '@/services/cart.service';

export default function useCart() {
  const queryClient = useQueryClient();

  //CART INFORMATION

  function fetchCartInformation(id) {
    const { data: cart, error } = useQuery({
      queryKey: ['cart'],
      queryFn: async () => {
        try {
          return await cartService.fetchCartInformation(id);
        } catch (error) {
          console.error('Error fetching cart:', error);
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

  // const deleteCartMutation = useMutation({
  //   mutationFn: cartService.deleteCart,
  //   onSuccess: (data) => {
  //     queryClient.setQueryData(['carts'], (oldData) => {
  //       if (!oldData) return data;
  //       return {
  //         ...oldData,
  //         carts: [...oldData.carts, data]
  //       };
  //     });
  //   },
  //   onError: (error) => {
  //     console.error('Error updating cart:', error);
  //   }
  // });

  //ITEMS IN CART

  function fetchItemsInCart(cartId) {
    const { data: items, ...rest } = useQuery({
      queryKey: ['items'],
      queryFn: () => cartService.fetchItemsInCart(cartId)
    });
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
    // deleteCart: deleteCartMutation.mutate,
    fetchItemsInCart,
    addItemToCart: addItemMutation.mutate
  };
}
