<script setup>
defineProps({
    items: { type: Array, default: () => [] },
});
</script>

<template>
    <div class="container">
        <h2 class="text-center fw-bold mt-3">YOUR ORDER</h2>
        <!-- Display the fetched items or handle loading states here -->
        <div v-if="items?.length > 0">
            <p v-for="item in items" :key="item.productId">{{ item.productName }} - {{ item.quantity }}
                - ${{ item.priceForOneItem }}</p>
        </div>
        <div v-else>
            <p>No items in the cart.</p>
        </div>
    </div>
</template>