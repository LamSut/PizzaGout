<script setup>
defineProps({
    items: { type: Array, default: () => [] },
});
</script>

<template>
    <div class="items mt-5 mx-auto" v-for="item in items" :key="item.productId">
        <div class="d-flex">
            <img :src="item.image" class="item-image">
            <div class="item-details ms-3">
                <h5>{{ item.productName }}</h5>
                <span>
                    <p class="price-one-item">Price: ${{ item.priceForOneItem }}</p>
                </span>
                <div class="item-quantity">
                    <p>Quantity: {{ item.quantity }} </p>
                </div>
                <p class="fw-bold" style="margin-bottom: 5px;">
                    Subtotal: ${{ item.quantity * item.priceForOneItem }}
                </p>
            </div>
        </div>
    </div>
    <div style="display: flex; justify-content: space-between; margin: 24px 24px 0px 0px;">
        <div class="text-light fw-bold fs-3" style="margin: 0px 0px 0px 20px; padding-top: 0px;">
            Total: ${{ items.reduce((sum, item) => sum + item.quantity * item.priceForOneItem, 0) }}
        </div>
        <router-link to="/">
            <button class="btn btn-danger fw-bold">BACK</button>
        </router-link>
    </div>
</template>

<style scoped>
.items {
    width: 90%;
    margin-bottom: 5px;
    margin-top: 10px !important;
}

.price-one-item {
    margin-bottom: 0px;
}

.item-quantity {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
}

div.item-quantity p {
    margin-bottom: 0px !important;
}

.btn-danger {
    width: 100px;
}
</style>