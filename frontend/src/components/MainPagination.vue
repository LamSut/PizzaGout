<script setup>
import { computed } from 'vue';

const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  length: {
    type: Number,
    default: 3,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const $emit = defineEmits(['update:currentPage']);

const pages = computed(() => {
  const pages = [];
  const half = Math.floor(props.length / 2);
  let start = props.currentPage - half;
  let end = props.currentPage + half;

  if (start <= 0) {
    start = 1;
    end = props.length;
  }

  if (end > props.totalPages) {
    end = props.totalPages;
    start = end - props.length + 1;
    if (start <= 0) start = 1;
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<template>
  <nav class="navPagination">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a role="button" class="page-link" @click.prevent="$emit('update:currentPage', currentPage - 1)">
          ← Previous
        </a>
      </li>
      <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === currentPage }">
        <a role="button" class="page-link" @click.prevent="$emit('update:currentPage', page)">
          {{ page }}
        </a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a role="button" class="page-link" @click.prevent="$emit('update:currentPage', currentPage + 1)">
          Next →
        </a>
      </li>
    </ul>
  </nav>
</template>

<style>
.page-link {
  color: black;
}

.page-link:hover {
  color: #dc3545;
}

.page-item.active .page-link {
  background-color: #dc3545;
  border-color: darkred;
}

.page-item.active .page-link:hover {
  color: white;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.navPagination {
  margin: auto;
}
</style>