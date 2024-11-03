<script setup>
import CustomerForm from '@/components/CustomerForm.vue';
const props = defineProps({
    cartid: { type: String, required: true }
});
</script>
<template>
    <h2 class="text-center fw-bold mt-3">CUSTOMER INFOMATION FORM</h2>
    <CustomerForm :cart="cart" />
</template>
