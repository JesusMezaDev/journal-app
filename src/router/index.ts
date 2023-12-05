import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';

import DaybookRouter from '@/modules/daybook/router';
import AuthRouter from '@/modules/auth/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: HomeView,
      redirect: '/auth',
    },
    {
      ...DaybookRouter
    },
    {
      ...AuthRouter
    }
  ]
})

export default router
