<script setup>
const model = defineModel({
    type: String,
    default: '',
});
</script>
<template>
    <div class="input-group">
        <input type="text" class="form-control px-3" placeholder="Search" v-model="model" />
        <button class="btn btn-outline-secondary" type="button" @click="$emit('submit')">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>