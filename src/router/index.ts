import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import beforeEnterGuest from '@/router/guest';
import beforeEnterAuth from '@/router/auth';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: beforeEnterAuth,
  },
  {
    path: '/wallet',
    name: 'Wallet',
    component: () => import(/* webpackChunkName: "about" */ '../views/Wallet.vue'),
    beforeEnter: beforeEnterAuth,
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../views/History.vue'),
    beforeEnter: beforeEnterAuth,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
    beforeEnter: beforeEnterAuth,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    beforeEnter: beforeEnterGuest,
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    beforeEnter: beforeEnterGuest,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     console.log(store.getters.getIsLogin);
//     if (!store.getters.getIsLogin) {
//       next({ name: 'Login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
