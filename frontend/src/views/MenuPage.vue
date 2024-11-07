<script setup>
import SearchBar from '@/components/SearchBar.vue';
import ProductList from '@/components/ProductList.vue';
import ProductCard from '@/components/ProductCard.vue';
import MainPagination from '@/components/MainPagination.vue';
import CartItems from '@/components/CartItems.vue';

import { ref, computed, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCartStore } from '@/store/cartStore'
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
  <div class="page row">
    <div class="mt-3 col-md-6">
      <div class="my-2">
        <SearchBar v-model="searchText" />
      </div>
      <ProductList v-if="filteredProducts.length > 0" :products="filteredProducts"
        v-model:selected-index="selectedIndex" />
      <p v-else>
        No product yet.
      </p>
      <div class=" d-flex flex-wrap justify-content-round align-items-center mx-auto">
        <MainPagination :total-pages="totalPages" :current-page="currentPage"
          @update:current-page="changeCurrentPage" />
        <div class="w-100"></div>
      </div>
    </div>
    <div class="mt-2 product-info col-md-3">
      <div v-if="selectedProduct">
        <h4 class="mt-3 mb-3 text-center"> Product Information </h4>
        <ProductCard :product="selectedProduct" />
      </div>
    </div>
    <div class="mt-3 col-md-6 bg-dark custom-position text-light">
      <h4 class="mb-4 text-center">Your cart</h4>
      <CartItems></CartItems>
    </div>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin-left: 60px;
  margin-right: 0px;
}

.product-info {
  width: 30%;
  margin-left: -8px;
}

.custom-position {
  position: absolute;
  right: 0px;
  top: 0px;
  height: 713px;
  width: 400px;
}
</style>
