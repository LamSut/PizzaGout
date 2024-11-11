<script setup>
import { useCartStore } from '@/store/cartStore';
import { useItemStore } from '@/store/cartStore';
import { useRouter } from 'vue-router';
import useCart from '@/composables/useCart';
import { computed } from 'vue';

const { addItemToCart } = useCart()
const cartStore = useCartStore();
const itemStore = useItemStore();
const router = useRouter();

async function orderItems() {
    const cartId = cartStore.cartId;
    for (const item of itemStore.items) {
        addItemToCart({ cartid: cartId, productid: item.id, quantity: item.quantity });
    }
    window.alert(`Thank you! You can check your order again with CartID: ${cartId}. Your order will be delivered shortly!`); itemStore.clearItems();
    cartStore.clearCartId();
    router.push('/');
}

const totalPrice = computed(() => {
    return itemStore.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0).toFixed(2);
});

function increaseQuantity(item) {
    itemStore.addItem({ productId: item.id, name: item.name, price: item.price, image: item.image });
}

function decreaseQuantity(item) {
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        // Remove item if quantity goes to 0
        itemStore.removeItem(item.id);
    }
}
</script>
<template>
    <div class="mb-4 d-flex align-items-center">
        <h3 style="margin-top: 40px;">Your Cart</h3>
        <router-link to="/info">
            <button class="edit-btn btn btn-warning fw-bold ms-auto">Enter Infomation</button>
        </router-link>
    </div>
    <div class="scrollBar">
        <div>
            <div v-for="item in itemStore.items" :key="item.id" class="items">
                <div class="d-flex">
                    <img :src="item.image" class="item-image">
                    <div class="item-details ms-3">
                        <h5>{{ item.name }}</h5>
                        <span>
                            <p>Price: ${{ item.price }}</p>
                        </span>
                        <div class="item-quantity">
                            <p>Quantity:
                                <button @click="decreaseQuantity(item)"
                                    class="btn btn-outline-danger fw-bold">-</button>
                                {{ item.quantity }}
                                <button @click="increaseQuantity(item)"
                                    class="btn btn-outline-success fw-bold">+</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="total">
        <h4 class="mb-4">Total: ${{ totalPrice }}</h4>
        <hr>
        <button class="pay-btn btn btn-success fw-bold" @click="orderItems">Order</button>
        <button class="delete-btn btn btn-danger fw-bold" @click="itemStore.clearItems">
            Delete all from Cart
        </button>
    </div>
</template>
<style>
.edit-btn {
    position: absolute;
    right: 10px;
    display: inline-block;
}

.items {
    margin-bottom: 20px;
    margin-right: 10px;
    background-color: beige;
    color: black;
    border-radius: 2%;
    padding: 10px;
    padding-bottom: 5px;
}

.item-image {
    width: 100px;
    height: 100px;
    border-radius: 2%;
    object-fit: cover;
}

.scrollBar {
    margin-top: 20px;
    overflow-y: scroll;
    height: 460px;
}

.total {
    position: absolute;
    margin-top: 20px;
    padding: 0px 0px 20px 10px;
}

.pay-btn {
    margin-right: 70px;
    width: 80px;
}

.item-quantity {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.item-quantity button {
    width: 30px;
    height: 30px;
    font-size: 18px;
    padding: 0px;
    margin-left: 4px;
    margin-right: 4px;
}
</style>