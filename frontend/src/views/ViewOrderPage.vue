<script setup>
import ViewOrder from '@/components/ViewOrder.vue';
import { useRouter, useRoute } from 'vue-router';
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
    <ViewOrder :items="items"></ViewOrder>
</template>