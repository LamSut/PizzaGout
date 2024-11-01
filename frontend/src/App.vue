<script setup>
import AppHeader from '@/components/AppHeader.vue';
</script>
<template v-if="route.name === 'pizza'">
  <AppHeader />
  <div class="container mt-3">
    <router-view />
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
