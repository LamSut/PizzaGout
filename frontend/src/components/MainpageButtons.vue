<template>
  <div class="d-flex justify-content-center pt-2">
    <router-link to="/menu" class="btn btn-danger me-2 fs-6">START BOOKING</router-link>
    <router-link to="/information" class="btn btn-custom me-2 fs-6">ENTER INFORMATION</router-link>
  </div>
</template>
<style>
.btn-custom {
  background-color: rgb(128, 0, 0);
  color: white;
  --bs-btn-active-bg: rgb(128, 0, 0);
}

.btn-custom:hover {
  background-color: rgb(164, 51, 51);
  color: rgb(0, 0, 0);
}

a.fs-6:hover {
  color: black;
}
</style>
