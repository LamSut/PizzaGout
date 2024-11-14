import { createWebHistory, createRouter } from 'vue-router';
import MainPage from '@/views/MainPage.vue';
import MenuPage from '@/views/MenuPage.vue';
import InformationPage from '@/views/InformationPage.vue';
import CheckOrderPage from '@/views/CheckOrderPage.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  {
    path: '/menu',
    name: 'MenuPage',
    component: MenuPage
  },
  {
    path: '/info',
    name: 'InformationPage',
    component: InformationPage
  },
  {
    path: '/order',
    name: 'CheckOrderPage',
    component: CheckOrderPage
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFoundPage',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
export default router;
