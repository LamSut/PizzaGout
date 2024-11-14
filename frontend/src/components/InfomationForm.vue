<script setup>
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const props = defineProps({
    cart: { type: Object, required: true },
    showPopup: { type: Boolean, required: true }
});

const editCart = ref({ ...props.cart });
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

function submitCartInformation() {
    $emit('submit:cart', editCart.value);
}
</script>

<template>
    <Form :validation-schema="validationSchema" @submit="submitCartInformation" class="w-50 mx-auto mt-5">
        <div class="row mb-3">
            <label for="inputName" class="col-sm-3 col-form-label">Name: </label>
            <Field name="name" type="text" class="form-control" v-model="editCart.name" />
            <ErrorMessage name="name" class="error-feedback text-danger fw-bold" />
        </div>
        <div class="row mb-3">
            <label for="inputPhone" class="col-sm-3 col-form-label">Phone number:</label>
            <Field name="phone" type="text" class="form-control" v-model="editCart.phone" />
            <ErrorMessage name="phone" class="error-feedback text-danger fw-bold" />
        </div>
        <div class="row mb-3">
            <label for="inputAddress" class="col-sm-3 col-form-label">Address:</label>
            <Field name="address" type="text" class="form-control" v-model="editCart.address" />
            <ErrorMessage name="address" class="error-feedback text-danger fw-bold" />
        </div>
        <div class="row mb-3">
            <div class="col-sm-10 offset-sm-3">
                <button type="submit" class="btn btn-success mt-2 mx-auto px-5"><b>LET'S GO PIZZA</b></button>
            </div>
        </div>
    </form>
</template>
