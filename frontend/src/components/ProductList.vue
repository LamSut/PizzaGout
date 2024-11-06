<script setup>
defineProps({
    products: { type: Array, default: () => [] },
    selectedIndex: { type: Number, default: -1 },
});

const $emit = defineEmits(['update:selectedIndex']);
</script>

<template>
    <!-- <ul class="list-group">
        <li v-for="(product, index) in products" :key="product.productId" :class="{ active: index === selectedIndex }"
            class="list-group-item px-3" @click="$emit('update:selectedIndex', index)">
            {{ product.name }}
        </li>
    </ul> -->

    <div class="card-grid">
        <div class="row">
            <div class="col-md-12">
                <div class="row d-flex align-items-stretch">
                    <div class="col-md-4 mb-4" v-for="(product, index) in products" :key="product.productId"
                        :class="{ active: index === selectedIndex }">
                        <div class=" card hover-effect" @click="$emit('update:selectedIndex', index)">
                            <img :src="product.image" class="card-img-top" :alt="`Image`">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ product.name }}</h5>
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <span class="fw-bold fs-6 card-text">${{ product.price }}</span>
                                    <button class="btn btn-danger btn-sm">
                                        <i class="fas fa-plus"></i> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card-grid {
    position: relative;
}

.card-img-top {
    height: 150px;
    object-fit: cover;
}

.hover-effect {
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}
</style>