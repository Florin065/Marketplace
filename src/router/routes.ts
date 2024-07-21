import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from "@/layouts/MainLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import Home from "@/pages/Home.vue";
import HomeLayout from "../layouts/HomeLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: DefaultLayout,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@@/Auth/Login.vue')
      },
      {
        path: 'merchant-register',
        name: 'merchant-register',
        component: () => import('@@/Auth/MerchantRegister.vue'),
      },
      {
        path: 'customer-register',
        name: 'customer-register',
        component: () => import('@@/Auth/CustomerRegister.vue'),
      },
    ],
  },

  {
    path: '/',
    component: HomeLayout,
    children: [
      {
        path: '', 
        name: 'home',
        component: () => Home,
      },
      {
        path: 'product/:id',
        name: 'product-id',
        component: () => import('@@/Products/Product.vue'),
      },
    ],
  },

  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: 'overview',
        name: 'overview',
        component: () => import('@@/DashBoard/dashboard/Overview.vue'),
      },
      {
        path: 'notifications',
        name: 'notifications',
        component: () => import('@@/DashBoard/dashboard/Notifications.vue'),
      },
      {
        path: 'performance-metrics',
        name: 'performance-metrics',
        component: () => import('@@/DashBoard/dashboard/PerformanceMetrics.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@@/DashBoard/order-management/Orders.vue'),
      },
      {
        path: 'invoices',
        name: 'invoices',
        component: () => import('@@/DashBoard/order-management/Invoices.vue'),
      },
      {
        path: 'add-new-product',
        name: 'add-new-product',
        component: () => import('@@/DashBoard/product-management/AddNewProduct.vue'),
      },
      {
        path: 'product-list',
        name: 'product-list',
        component: () => import('@@/DashBoard/product-management/ProductList.vue'),
      },
      {
        path: 'pricing-list',
        name: 'pricing-list',
        component: () => import('@@/DashBoard/product-management/PricingList.vue'),
      },
      {
        path: 'manage-pricing-in-bulk',
        name: 'manage-pricing-in-bulk',
        component: () => import('@@/DashBoard/product-management/ManagePricingInBulk.vue'),
      },
      {
        path: 'vouchers',
        name: 'vouchers',
        component: () => import('@@/DashBoard/marketing/Vouchers.vue'),
      },
      {
        path: 'promotional-banners',
        name: 'promotional-banners',
        component: () => import('@@/DashBoard/marketing/PromotionalBanners.vue'),
      },
      {
        path: 'view-stock',
        name: 'view-stock',
        component: () => import('@@/DashBoard/inventory/ViewStock.vue'),
      },
      {
        path: 'restock-alerts',
        name: 'restock-alerts',
        component: () => import('@@/DashBoard/inventory/RestockAlerts.vue'),
      },
      {
        path: 'generate-inventory-reports',
        name: 'generate-inventory-reports',
        component: () => import('@@/DashBoard/inventory/GenerateInventoryReports.vue'),
      },
      {
        path: 'sales-reports',
        name: 'sales-reports',
        component: () => import('@@/DashBoard/reports/SalesReports.vue'),
      },
      {
        path: 'revenue-reports',
        name: 'revenue-reports',
        component: () => import('@@/DashBoard/reports/RevenueReports.vue'),
      },
      {
        path: 'customer-insights',
        name: 'customer-insights',
        component: () => import('@@/DashBoard/reports/CustomerInsights.vue'),
      },
      {
        path: 'shipping',
        name: 'shipping',
        component: () => import('@@/DashBoard/store-settings/Shipping.vue'),
      },
      {
        path: 'tax-settings',
        name: 'tax-settings',
        component: () => import('@@/DashBoard/store-settings/TaxSettings.vue'),
      },
      {
        path: 'notifications-settings',
        name: 'notifications-settings',
        component: () => import('@@/DashBoard/store-settings/NotificationsSettings.vue'),
      },
      {
        path: 'profile-settings',
        name: 'profile-settings',
        component: () => import('@@/DashBoard/account-settings/ProfileSettings.vue'),
      },
      {
        path: 'banking-information',
        name: 'banking-information',
        component: () => import('@@/DashBoard/account-settings/BankingInformation.vue'),
      },
      {
        path: 'user-roles-and-permissions',
        name: 'user-roles-and-permissions',
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
