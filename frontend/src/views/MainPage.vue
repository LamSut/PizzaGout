<script setup>
import MainPageButtons from '@/components/MainPageButtons.vue';
import MainCarousel from '@/components/MainCarousel.vue';
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()
onMounted(() => {
  cartStore.fetchCartId()
  console.log(cartStore.cartId)
})


</script>
<template>
  <h1 class="text-center fw-bold mt-3">WELCOME TO PIZZA STORE</h1>
  <MainPageButtons />
  <hr />
  <MainCarousel />
</template>
