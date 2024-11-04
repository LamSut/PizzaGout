<script setup>
import MenuNav from '@/components/MenuNav.vue';
import SearchBar from '@/components/SearchBar.vue';
import FoodCard from '@/components/FoodCard.vue';
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()
onMounted(() => {
  cartStore.fetchCartId()
  console.log(cartStore.cartId)
})

</script>
<template>
  <MenuNav />
  <SearchBar />
  <FoodCard />
</template>
