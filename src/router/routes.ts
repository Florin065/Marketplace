import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from "src/layouts/MainLayout.vue";
import Home from "src/pages/Home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => DefaultLayout,
    children: [
      { path: '', component: Home },
      { path: '/login', component: () => import('../pages/Auth/Login.vue') },
      {
        path: '/merchant-register',
        component: () => import('../pages/Auth/Merchant.vue'),
      },
      {
        path: '/register',
        component: () => import('../pages/Auth/Customer.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/Error404.vue'),
  },
];

export default routes;