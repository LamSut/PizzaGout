<template>
  <div>
    <div id="carousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-item" :class="{ active: index === 0 }">
          <img :src="slide.image" class="rounded d-block align-middle w-auto mx-auto" :alt="slide.alt" />
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden d-inline">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden d-inline">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        { image: '/1.jpeg', alt: 'First slide' },
        { image: '/2.jpg', alt: 'Second slide' },
        { image: '/1.jpg', alt: 'Second slide' }
      ]
    };
  }
};
</script>

<style>
.carousel-item img {
  margin-left: auto;
  margin-right: auto;
  height: 480px;
  object-fit: cover;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-color: rgb(64, 62, 62);
  cursor: pointer;
}

.carousel-control-prev-icon:hover,
.carousel-control-next-icon:hover {
  background-color: black;
  cursor: pointer;
}

.carousel-control-prev,
.carousel-control-next {
  cursor: auto;
}

.carousel-control-prev:hover,
.carousel-control-next:hover {
  cursor: auto;
}
</style>
