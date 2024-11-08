<template>
  <div class="d-flex justify-content-center pt-2">
    <router-link to="/menu" class="btn btn-danger me-2 fs-6"><b>START BOOKING</b></router-link>
    <router-link to="/info" class="btn btn-custom me-2 fs-6"><b>ENTER INFORMATION</b></router-link>
    <router-link to="/order" class="btn btn-custom1 me-2 fs-6 text-light"><b>VIEW MY ORDER</b></router-link>
  </div>
</template>
<style scoped>
.btn-custom {
  background-color: rgb(128, 0, 0);
  color: white;
  --bs-btn-active-bg: rgb(128, 0, 0);
}

.btn-custom:hover {
  background-color: rgb(164, 51, 51);
  color: rgb(0, 0, 0);
}

.btn-custom1 {
  background-color: rgb(199, 119, 0);
  color: white;
  --bs-btn-active-bg: rgb(221, 188, 0);
}

.btn-custom1:hover {
  background-color: rgb(226, 185, 0);
  color: rgb(0, 0, 0);
}

a.fs-6:hover {
  color: black !important;
}
</style>
