import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import cartService from "@/services/cart.service";
import { computed } from "vue";
import { useRouter, useRoute } from 'vue-router';

export default function useCart() {
    const router = useRouter();
    const route = useRoute();
    const queryClient = useQueryClient();

    //CART INFORMATION

    function fetchCartInformation(id) {
        const { data: cart, error } = useQuery({
            queryKey: ["carts", id],
            queryFn: async () => {
                try {
                    return await cartService.fetchInformation(id);
                } catch (error) {
                    console.error("Error fetching cart:", error);
                    router.push({
                        name: 'notfound',
                        params: { pathMatch: route.path.split('/').slice(1) },
                        query: route.query,
                        hash: route.hash,
                    });
                    return null;
                }
            }
        });
        return cart;
    }

    const createCartMutation = useMutation({
        mutationFn: cartService.createCart,
        onSuccess: (data) => {
            queryClient.setQueryData(["carts"], (oldData) => {
                if (!oldData) return data;
                return {
                    ...oldData,
                    carts: [...oldData.carts, data],
                };
            });
        },
        onError: (error) => {
            console.error('Error updating cart:', error);
        },
    });

    const updateCartMutation = useMutation({
        mutationFn: cartService.updateCartInformation,
        onSuccess: (data) => {
            queryClient.setQueryData(["carts", data.id], data);
        },
        onError: (error) => {
            console.error('Error updating cart:', error);
        },
    });

    const deleteCartMutation = useMutation({
        mutationFn: cartService.deleteCart,
        onSuccess: (data) => {
            queryClient.setQueryData(["carts"], (oldData) => {
                if (!oldData) return data;
                return {
                    ...oldData,
                    carts: [...oldData.carts, data],
                };
            });
        },
        onError: (error) => {
            console.error('Error updating cart:', error);
        },
    })

    //ITEMS IN CART

    function fetchItemsInCart(cartId) {
        const { data: items, ...rest } = useQuery({
            queryKey: ["items"],
            queryFn: () => cartService.fetchItemsInCart(cartId),
        });
        return { items, rest };
    }

    const addItemMutation = useMutation({
        mutationFn: cartService.addItemToCart,
        onSuccess: (data) => {
            queryClient.setQueryData(["items"], (oldData) => {
                if (!oldData) return data;
                return {
                    ...oldData,
                    carts: [...oldData.carts, data],
                };
            });
        },
        onError: (error) => {
            console.error('Error updating cart:', error);
        },
    });

    return {
        fetchCartInformation,
        createCart: createCartMutation.mutate,
        updateCartInformation: updateCartMutation.mutate,
        deleteCart: deleteCartMutation.mutate,

        fetchItemsInCart,
        addItemToCart: addItemMutation.mutate
    }

}