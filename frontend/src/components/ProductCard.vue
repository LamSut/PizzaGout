<script setup>
defineProps({
    product: { type: Object, required: true },
});
</script>
<template>
    <div class="card-info">
        <div class="p-2">
            <img class="img-fluid img-thumbnail" :src="product.image" alt="" />
        </div>
        <div class="p-1">
            <strong>Name:</strong>
            {{ product.name }}
        </div>
        <div class="p-1">
            <strong>Type:</strong>
            {{ product.type }}
        </div>
        <div class="p-1">
            <strong>Price: $</strong>{{ product.price }}
        </div>
        <div class="p-1">
            <strong>Description:</strong>
            {{ product.description }}
        </div>
        <br>
    </div>
</template>
<style scoped>
.p-1 {
    margin-left: 10px;
}

.card-info {
    background-color: darkred;
    color: azure;
    border-radius: 2%;
}

.img-thumbnail {
    background-color: darkred;
    border: none;
    margin-bottom: 10px;
}
</style>