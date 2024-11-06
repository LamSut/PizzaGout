<script setup>
import InfomationForm from '@/components/InfomationForm.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '@/store/cartStore'
import useCart from '@/composables/useCart';

const router = useRouter();
const cartStore = useCartStore()
console.log(cartStore.cartId)
if (cartStore.cartId == null) {
    router.push('/');
}

const showPopup = ref(false);
const message = ref('');

const { fetchCartInformation, createCart, updateCartInformation } = useCart();

let cart = ref({
    name: '',
    address: '',
    phone: ''
});

if (cartStore.cartId) {
    cart = fetchCartInformation(cartStore.cartId);
}

async function onCart(cart) {
    try {
        if (cartStore.cartId > 0) {
            updateCartInformation(cart);
            message.value = 'Cart has been updated!';
        }
        else {
            createCart(cart);
            message.value = 'A new Cart has been created!';
        }
        showPopup.value = true;
    } catch (error) {
        console.error('Error creating or updating cart:', error);
        message.value = error.message;
    }
}
</script>
<template>
    <div v-if="cart">
        <h2 class="text-center fw-bold mt-3">CUSTOMER INFOMATION FORM</h2>
        <InfomationForm :cart="cart" :show-popup="showPopup" @submit:cart="onCart" />
    </div>
    <div v-else>
        Loading cart information...
    </div>
</template>
