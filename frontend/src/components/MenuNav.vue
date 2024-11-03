<template>
  <nav class="navbar navbar-expand-lg text-bg-dark pt-4">
    <div class="container-fluid mt-0">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav justify-content-around">
          <li class="nav-item" v-for="(item, index) in navItems" :key="index">
            <a class="nav-link text-light" :class="{ selected: selectedIndex === index }"
              @click.prevent="selectItem(index)" href="#">
              {{ item }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      navItems: ['Pizza', 'Drink', 'Appetizer'],
      selectedIndex: 0
    };
  },
  methods: {
    selectItem(index) {
      this.selectedIndex = index;
    }
  }
};
</script>

<style>
.selected {
  background: red;
  border-radius: 5%;
}

.nav-link {
  font-size: 1.25rem;
  padding: 5px 50px !important;
}

.nav-link:not(.selected):hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5%;
}

.navbar-expand-lg {
  position: absolute;
  left: 0;
  padding-left: 50px;
  width: 100%;
}
</style>