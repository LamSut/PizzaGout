<template>
  <div class="d-flex justify-content-center pt-2">
    <!-- <a
      href="Menu.vue"
      class="btn btn-danger me-2 fs-6"
      >View Menu</a
    > -->
    <router-link to="/menu" class="btn btn-danger me-2 fs-6">START BOOKING</router-link>
    <a href="#" class="btn btn-custom fs-6">VIEW YOUR ORDER</a>
  </div>
</template>
<style>
.btn-custom {
  background-color: rgb(165, 14, 14);
  color: white;
  --bs-btn-active-bg: rgb(165, 14, 14);
}

.btn-custom:hover {
  /* background-color: rgb(132, 1, 1); */
  background-color: rgb(164, 51, 51);
  color: white;
}
</style>
