import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from "@/layouts/MainLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Home from "@/pages/Home.vue";
import HomeLayout from "../layouts/HomeLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => DefaultLayout,
    children: [
      {
        path: 'login',
        component: () => import('@/pages/Auth/Login.vue')
      },
      {
        path: 'merchant-register',
        component: () => import('@/pages/Auth/Merchant.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/Auth/Customer.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => HomeLayout,
    children: [
      {
        path: '', 
        component: () => Home,
      },
      {
        path: 'product',
        component: () => import('@@/Products/Product.vue'),
      },
    ],
  },

  {
    path: '/dashboard',
    component: () => DashboardLayout,
    children: [
      {
        path: 'overview',
        component: () => import('@@/DashBoard/dashboard/Overview.vue'),
      },
      {
        path: 'notifications',
        component: () => import('@@/DashBoard/dashboard/Notifications.vue'),
      },
      {
        path: 'performance-metrics',
        component: () => import('@@/DashBoard/dashboard/PerformanceMetrics.vue'),
      },
      {
        path: 'orders',
        component: () => import('@@/DashBoard/order-management/Orders.vue'),
      },
      {
        path: 'invoices',
        component: () => import('@@/DashBoard/order-management/Invoices.vue'),
      },
      {
        path: 'add-product',
        component: () => import('@@/DashBoard/product-management/AddNewProduct.vue'),
      },
      {
        path: 'product-list',
        component: () => import('@@/DashBoard/product-management/ProductList.vue'),
      },
      {
        path: 'pricing-list',
        component: () => import('@@/DashBoard/product-management/PricingList.vue'),
      },
      {
        path: 'pricing-in-bulk',
        component: () => import('@@/DashBoard/product-management/ManagePricingInBulk.vue'),
      },
      {
        path: 'vouchers',
        component: () => import('@@/DashBoard/marketing/Vouchers.vue'),
      },
      {
        path: 'banners',
        component: () => import('@@/DashBoard/marketing/PromotionalBanners.vue'),
      },
      {
        path: 'stock',
        component: () => import('@@/DashBoard/inventory/ViewStock.vue'),
      },
      {
        path: 'restock-alerts',
        component: () => import('@@/DashBoard/inventory/RestockAlerts.vue'),
      },
      {
        path: 'generate-inventory-reports',
        component: () => import('@@/DashBoard/inventory/GenerateInventoryReports.vue'),
      },
      {
        path: 'sales-reports',
        component: () => import('@@/DashBoard/reports/SalesReports.vue'),
      },
      {
        path: 'revenue-reports',
        component: () => import('@@/DashBoard/reports/RevenueReports.vue'),
      },
      {
        path: 'customer-insights',
        component: () => import('@@/DashBoard/reports/CustomerInsights.vue'),
      },
      {
        path: 'shipping',
        component: () => import('@@/DashBoard/store-settings/Shipping.vue'),
      },
      {
        path: 'tax-settings',
        component: () => import('@@/DashBoard/store-settings/TaxSettings.vue'),
      },
      {
        path: 'notifications-settings',
        component: () => import('@@/DashBoard/store-settings/NotificationsSettings.vue'),
      },
      {
        path: 'profile-settings',
        component: () => import('@@/DashBoard/account-settings/ProfileSettings.vue'),
      },
      {
        path: 'banking-information',
        component: () => import('@@/DashBoard/account-settings/BankingInformation.vue'),
      },
      {
        path: 'user-roles-permissions',
        component: () => import('@@/DashBoard/account-settings/UserRolesAndPermissions.vue'),
      }
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
