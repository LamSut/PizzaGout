<script setup>
import MenuNav from '@/components/MenuNav.vue';
import SearchBar from '@/components/SearchBar.vue';
import ProductList from '@/components/ProductList.vue';
import ProductCard from '@/components/ProductCard.vue';
import MainPagination from '@/components/MainPagination.vue';

import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/store/cartStore'
import useCart from '@/composables/useCart';
import useProduct from '@/composables/useProduct';

const router = useRouter();
const route = useRoute();

const cartStore = useCartStore()
console.log(cartStore.cartId)
if (cartStore.cartId == null) {
  router.push('/');
}


// current page is from the query string (?page=1)
const currentPage = computed(() => {
  const page = Number(route.query?.page);
  if (Number.isNaN(page) || page < 1) return 1;
  return page;
});

const selectedIndex = ref(-1);
const searchText = ref('');

const { fetchProducts, deleteAllProducts } = useProduct();
const { totalPages, products } = fetchProducts(currentPage);

// Map each product to a string for searching
const searchableProducts = computed(() =>
  products.value.map((product) => {
    const { name, type, price } = product;
    return [name, type, price].join('');
  })
);

// Products filtered by searchText
const filteredProducts = computed(() => {
  if (!searchText.value) return products.value;
  return products.value.filter((product, index) =>
    searchableProducts.value[index].includes(searchText.value)
  );
});

const selectedProduct = computed(() => {
  if (selectedIndex.value < 0) return null;
  return filteredProducts.value[selectedIndex.value];
});

function changeCurrentPage(page) {
  router.push({ name: 'MenuPage', query: { page } });
}

// Whenever searchText changes, reset selectedIndex
watch(searchText, () => (selectedIndex.value = -1));
</script>

<template>
  <div class="page row mb-5">
    <div class="mt-3 col-md-6">
      <div class="my-3">
        <SearchBar v-model="searchText" />
      </div>
      <ProductList v-if="filteredProducts.length > 0" :products="filteredProducts"
        v-model:selected-index="selectedIndex" />
      <p v-else>
        No product yet.
      </p>
      <div class="mt-3 d-flex flex-wrap justify-content-round align-items-center ">
        <MainPagination :total-pages="totalPages" :current-page="currentPage"
          @update:current-page="changeCurrentPage" />
        <div class="w-100"></div>
      </div>
    </div>
    <div class="mt-3 product-info">
      <div v-if="selectedProduct">
        <h4 class="mt-3 mb-4 text-center"> Product Information </h4>
        <ProductCard :product="selectedProduct" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1000px;
}

.product-info {
  width: 30%;
}
</style>
