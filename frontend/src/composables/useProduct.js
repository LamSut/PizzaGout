import { useQuery } from '@tanstack/vue-query';
import productService from '@/services/product.service';
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default function useProduct() {
  const router = useRouter();
  const route = useRoute();

  function fetchProducts(page) {
    const { data: productsPage, ...rest } = useQuery({
      queryKey: ['products', page],
      queryFn: () => productService.fetchProducts(page.value)
    });
    const totalPages = computed(() => productsPage.value?.metadata?.lastPage ?? 1);
    const products = computed(() => productsPage.value?.products ?? []);
    return { totalPages, products, rest };
  }

  function fetchProduct(id) {
    const { data: product, error } = useQuery({
      queryKey: ['products', id],
      queryFn: async () => {
        try {
          return await productService.fetchProduct(id);
        } catch (error) {
          console.error('Error fetching product:', error);
          router.push({
            name: 'notfound',
            params: { pathMatch: route.path.split('/').slice(1) },
            query: route.query,
            hash: route.hash
          });
          return null;
        }
      }
    });
    return product;
  }

  return {
    fetchProducts,
    fetchProduct
  };
}
