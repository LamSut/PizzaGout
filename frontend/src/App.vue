<script setup>
import AppHeader from '@/components/AppHeader.vue';
import { useCartStore } from '@/store/cartStore'

const cartStore = useCartStore()
cartStore.fetchCartId()

</script>

<template>
  <AppHeader />
  <div class="container mt-0">
    <router-view />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
