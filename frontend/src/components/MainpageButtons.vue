<template>
  <div class="d-flex justify-content-center pt-2">
    <!-- <a
      href="Menu.vue"
      class="btn btn-danger me-2 fs-6"
      >View Menu</a
    > -->
    <router-link to="/menu" class="btn btn-danger me-2 fs-6">START BOOKING</router-link>
    <router-link to="/form" class="btn btn-custom me-2 fs-6">YOUR LOCATION</router-link>
  </div>
</template>
<style>
.btn-custom {
  background-color: rgb(128, 0, 0);
  color: white;
  --bs-btn-active-bg: rgb(128, 0, 0);
}

.btn-custom:hover {
  /* background-color: rgb(132, 1, 1); */
  background-color: rgb(164, 51, 51);
  color: white;
}
</style>
