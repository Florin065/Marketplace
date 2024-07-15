import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from "@/layouts/MainLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Home from "@/pages/Home.vue";
import HomeLayout from "../layouts/HomeLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => HomeLayout,
    children: [
      {
        path: '', 
        component: () => Home,
      },
      {
        path: '/login',
        component: () => import('@/pages/Auth/Login.vue')
      },
      {
        path: '/merchant-register',
        component: () => import('@/pages/Auth/Merchant.vue'),
      },
      {
        path: '/register',
        component: () => import('@/pages/Auth/Customer.vue'),
      },
      {
        path: '/product',
        component: () => import('@/pages/Products/Product.vue'),
      },
    ],
  },

  {
    path: '/dashboard',
    component: () => DashboardLayout,
    children: [
      {
        path: '',
        component: () => import('@/pages/DashBoard/DashBoard.vue'),
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
