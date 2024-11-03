<template>
    <div class="input-group w-25">
        <input type="text" class="form-control px-3" placeholder="What are you looking for..." />
        <button class="btn btn-outline-secondary" type="button" @click="$emit('submit')">
            <i class="fas fa-search"></i>
        </button>
    </div>
</template>
<style>
.input-group {
    top: 100px;
    left: 50%;
}
</style>