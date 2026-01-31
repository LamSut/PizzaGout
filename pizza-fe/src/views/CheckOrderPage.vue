<script setup>
import CheckOrder from '@/components/CheckOrder.vue';
import { useRouter } from 'vue-router';
import useCart from '@/composables/useCart';

const router = useRouter();
const { fetchItemsInCart } = useCart();

const cartID = parseInt(prompt("What is your cartID?"), 10);
console.log(cartID);

if (Number.isNaN(cartID) || cartID < 0) {
    alert("No valid cart ID entered.");
    router.push('/');
}
const { items } = fetchItemsInCart(cartID);
</script>

<template>
    <div style="position: relative;">
        <h2 class="fw-bold fs-2 text-center mt-3">YOUR ORDER</h2>
        <div class="container">
            <div v-if="items?.length > 0" class="bg-dark py-3 w-75 mx-auto">
                <CheckOrder :items="items"></CheckOrder>
            </div>
            <div v-else>
                <h4 style="text-align: center;">No items in the cart.</h4>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 540px;
    margin-bottom: 30px;
}

div.py-3 {
    border-radius: 2%;
}
</style>