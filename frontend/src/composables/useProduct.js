import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import productService from "@/services/product.service";
import { computed } from "vue";
import { useRouter, useRoute } from 'vue-router';

export default function useProduct() {
    const router = useRouter();
    const route = useRoute();
    // const queryClient = useQueryClient();

    function fetchProducts(page) {
        const { data: productsPage, ...rest } = useQuery({
            queryKey: ["products", page],
            queryFn: () => productService.fetchProducts(page.value),
        });

        const totalPages = computed(() => (productsPage.value?.metadata?.lastPage ?? 1));
        const products = computed(() => (productsPage.value?.products ?? []));

        return { totalPages, products, rest };
    }

    function fetchProduct(id) {
        const { data: product, error } = useQuery({
            queryKey: ["products", id],
            queryFn: async () => {
                try {
                    return await productService.fetchProduct(id);
                } catch (error) {
                    console.error("Error fetching product:", error);
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
        return product;
    }

    // const createProductMutation = useMutation({
    //     mutationFn: productService.createProduct,
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["products"], (oldData) => {
    //             if (!oldData) return data;
    //             return {
    //                 ...oldData,
    //                 products: [...oldData.products, data],
    //             };
    //         });
    //     },
    //     onError: (error) => {
    //         console.error('Error updating product:', error);
    //     },
    // });

    // const updateProductMutation = useMutation({
    //     mutationFn: productService.updateProduct,
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["products", data.id], data);
    //     },
    //     onError: (error) => {
    //         console.error('Error updating product:', error);
    //     },
    // });

    // const deleteProductMutation = useMutation({
    //     mutationFn: productService.deleteProduct,
    //     onSuccess: (data) => {
    //         queryClient.setQueryData(["products"], (oldData) => {
    //             if (!oldData) return data;
    //             return {
    //                 ...oldData,
    //                 products: [...oldData.products, data],
    //             };
    //         });
    //     },
    //     onError: (error) => {
    //         console.error('Error updating product:', error);
    //     },
    // })

    // const deleteAllProductsMutation = useMutation({
    //     mutationFn: productService.deleteAllProducts,
    //     onSuccess: (data) => queryClient.setQueriesData(["products"], data),
    //     onError: (error) => {
    //         console.error('Error updating product:', error);
    //     },
    // });

    return {
        fetchProducts,
        fetchProduct,
        // createProduct: createProductMutation.mutate,
        // updateProduct: updateProductMutation.mutate,
        // deleteProduct: deleteProductMutation.mutate,
        // deleteAllProducts: deleteAllProductsMutation.mutate
    }

}