<script setup>
import InfomationForm from '@/components/InfomationForm.vue';
import { ref } from 'vue';
import { useCartStore } from '@/store/cartStore'
import useCart from '@/composables/useCart';

const cartStore = useCartStore()
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
        //if there is CartID in localStorage, fetch for auto fill & submit for Update Cart

        else {
            createCart(cart);
            message.value = 'A new Cart has been created!';
            cartStore.fetchCartId();
            console.log(cartStore.cartId);
        }
        //if no, submit for Create Cart

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
        <InfomationForm :cart="cart" @submit:cart="onEnterInformation" />
    </div>
    <div v-else>
        Loading cart information...
    </div>
</template>
