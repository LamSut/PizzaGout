<template>
    <div class="card-grid">
        <div class="row">
            <div class="col-md-6">
                <div class="row d-flex align-items-stretch">
                    <div class="col-md-4 mb-4" v-for="(item, index) in navItems" :key="index">
                        <div class="card hover-effect" @click="selectItem(index)">
                            <img :src="item.image" class="card-img-top" :alt="`Card image ${index + 1}`">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">{{ item.title }}</h5>
                                <p class="card-text">{{ item.description }}</p>
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <span class="fw-bold fs-6">price</span>
                                    <button class="btn btn-danger">
                                        <i class="fas fa-plus"></i> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3 custom-border p-3 text-light">
                <h4>Selected Item</h4>
                <div v-if="selectedItem">
                    <h5>{{ selectedItem.title }}</h5>
                    <p><strong>Price:</strong> {{ selectedItem.price }}</p>
                    <p>{{ selectedItem.description }}</p>
                    <img :src="selectedItem.image" class="img-fluid selected-image">
                </div>
                <div v-else>
                    <p>No item selected.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            navItems: [
                { title: 'Pizza 1', description: 'Description', image: '/1.jpg' },
                { title: 'Pizza 2', description: 'Description', image: '/2.jpg' },
                { title: 'Pizza 3', description: 'Description', image: '/1.jpeg' },
                { title: 'Pizza 1', description: 'Description', image: '/1.jpg' },
                { title: 'Pizza 2', description: 'Description', image: '/2.jpg' },
                { title: 'Pizza 3', description: 'Description', image: '/1.jpeg' },
            ],
            selectedItem: null
        };
    },
    methods: {
        selectItem(index) {
            this.selectedItem = this.navItems[index];
        }
    }
};
</script>
<style>
.card-grid {
    position: relative;
    top: 150px !important;
}

.card-img-top {
    height: 150px;
    object-fit: cover;
}

.hover-effect {
    transition: transform 0.3s, box-shadow 0.3s;
    cursor: pointer;
}

.hover-effect:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    cursor: pointer;
}

.add-btn {
    margin-left: 65px;
}

.selected-image {
    border-radius: 2%;
}

.custom-border {
    background-color: #212529;
    border-radius: 2%;
    height: fit-content;
}
</style>