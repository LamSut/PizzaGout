import { createWebHistory, createRouter } from 'vue-router';
import PizzaPage from '@/views/PizzaPage.vue';
import Menu from '@/views/Menu.vue';
import Form from '@/views/Form.vue';
const routes = [
  {
    path: '/',
    name: 'pizza',
    component: PizzaPage
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
