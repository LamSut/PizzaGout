import { useQuery } from '@tanstack/vue-query';
import productService from '@/services/product.service';
import { computed } from 'vue';

export default function useProduct() {
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
    const { data: product } = useQuery({
      queryKey: ['products', id],
      queryFn: () => productService.fetchProduct(id)
    });
    return product;
  }

  return {
    fetchProducts,
    fetchProduct
  };
}
