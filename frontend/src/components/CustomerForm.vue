<script setup>
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import cartService from '@/services/cart.service';

const props = defineProps({
    cart: { type: Object, required: true }
});

const $emit = defineEmits(['submit:cart']);

let validationSchema = toTypedSchema(
    z.object({
        name: z.string().min(1, { message: 'Name should be a non-empty string' }),
        address: z.string().max(100, { message: 'Address max 100 characters' }),
        phone: z.string().regex(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g, {
            message: 'Invalid phone number'
        })
    })
);

async function submitCustomerForm(values) {
    let formData = new FormData();
    for (let key in values) {
        if (values[key] !== undefined) {
            formData.append(key, values[key]);
        }
    }

    // $emit('submit:cart', formData);
    const cartData = Object.fromEntries(formData.entries());

    try {
        const response = await cartService.createCart(cartData);
        console.log('Cart created successfully:', response);
        window.alert('Your infomation has been added.');
        window.location.href = './';
        $emit('submit:cart', response);
    } catch (error) {
        console.error('Error creating cart:', error.message);
    }
}
</script>

<template>
    <Form :validation-schema="validationSchema" @submit="submitCustomerForm" class="w-50 mx-auto mt-5">
        <div class="row mb-3">
            <label for="inputName" class="col-sm-3 col-form-label">Name: </label>
            <Field name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback text-danger fw-bold" />
        </div>
        <div class="row mb-3">
            <label for="inputPhone" class="col-sm-3 col-form-label">Phone number:</label>
            <Field name="phone" type="text" class="form-control" />
            <ErrorMessage name="phone" class="error-feedback text-danger fw-bold" />
        </div>
        <div class="row mb-3">
            <label for="inputAddress" class="col-sm-3 col-form-label">Address:</label>
            <Field name="address" type="text" class="form-control" />
            <ErrorMessage name="address" class="error-feedback text-danger fw-bold" />
        </div>
        <div class="row mb-3">
            <div class="col-sm-10 offset-sm-3">
                <button type="submit" class="btn btn-success mt-2 mx-auto px-5">LET'S GO PIZZA</button>
            </div>
        </div>
    </form>
</template>