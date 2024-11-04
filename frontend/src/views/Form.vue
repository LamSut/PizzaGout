<script setup>
import CustomerForm from '@/components/CustomerForm.vue';
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/store/cartStore'
import useCart from '@/composables/useCart';

const cartStore = useCartStore()
onMounted(() => {
    cartStore.fetchCartId()
    console.log(cartStore.cartId)
})

const showPopup = ref(false);
const message = ref('');
const cart = ref({
    name: '',
    address: '',
    phone: ''
});

const { createCart } = useCart();

async function onCreateCart(cart) {
    try {
        createCart(cart);
        message.value = 'Cart has been created!';
        showPopup.value = true;
    } catch (error) {
        console.error('Error creating cart:', error);
        message.value = error.message;
    }
}
</script>
<template>
    <h2 class="text-center fw-bold mt-3">CUSTOMER INFOMATION FORM</h2>
    <CustomerForm :cart="cart" :show-popup="showPopup" @submit:cart="onCreateCart" />
</template>
