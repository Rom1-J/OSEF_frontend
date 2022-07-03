import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: () => import('./pages/Landing.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./pages/Register.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
