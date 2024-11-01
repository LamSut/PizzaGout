import { createWebHistory, createRouter } from 'vue-router';
import PizzaPage from '@/views/PizzaPage.vue';
const routes = [
  {
    path: '/',
    name: 'pizza',
    component: PizzaPage
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
