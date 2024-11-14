<script setup>
import InfomationForm from '@/components/InfomationForm.vue';
import { ref } from 'vue';
import { useCartStore } from '@/store/cartStore'
import useCart from '@/composables/useCart';

const cartStore = useCartStore()
cartStore.fetchCartId()
console.log(cartStore.cartId)

const showPopup = ref(false);
const message = ref('');

const { fetchCartInformation, createCart, updateCartInformation } = useCart();

let cart = {
    name: '',
    address: '',
    phone: ''
};

if (cartStore.cartId) {
    cart = fetchCartInformation(cartStore.cartId);
}

async function onEnterInformation(cart) {
    try {
        if (cartStore.cartId > 0) {
            updateCartInformation(cart);
            message.value = 'Cart has been updated!';
        }
        else {
            createCart(cart);
            message.value = 'A new Cart has been created!';
        }
        window.alert("Your information has been updated successfully!\nLet's go to the menu!");
        window.location.href = '/menu';
    } catch (error) {
        console.error('Error creating or updating cart:', error);
        message.value = error.message;
    }
}
</script>
<template>
    <div v-if="cart">
        <h2 class="text-center fw-bold mt-3">CUSTOMER INFORMATION FORM</h2>
        <InfomationForm :cart="cart" :show-popup="showPopup" @submit:cart="onEnterInformation" />
    </div>
    <div v-else>
        Loading cart information...
    </div>
</template>
