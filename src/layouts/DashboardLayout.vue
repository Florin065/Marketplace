<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="menu" @click="drawer" />
        <!-- Logo on the left -->
        <q-img src="../assets/logo.png" style="width:58px; height:48px;"/>
        
        <!-- Flex spacer to push elements to the sides -->
        <q-space />
        
        <!-- Search bar in the center -->
        <q-input
          placeholder="Caută orice în back-office"
          style="width: 476px;"
          v-model="search"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <!-- Flex spacer to push elements to the sides -->
        <q-space />

        <!-- Profile avatar on the right -->
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="User Avatar">
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" bordered
      style="
        display: flex; flex-direction: column; width: 55px;
        background-color: #ffffff; box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
        color: var(--color-text, #09090B); font-family: Inter; font-size: 16px; font-style: normal; font-weight: 500;
      "
      :show-if-above="true"
      persistent
    >
      <q-list>
        <q-item v-for="tab in tabs" :key="tab.id" clickable v-ripple @click="toggleTab(tab)" class="sidebar-icon">
          <q-item-section avatar>
            <q-icon :class="tab.icon" :style="{color: tab.color}" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const search = ref('');
  const drawer = ref(true);

  const tabs = ref([
      { id: 1, title: 'Dashboard', content: ['Overview', 'Notifications', 'Performance Metrics'],
          icon: 'bi bi-window-desktop', color: '#0000004D', expanded: true, alwaysVisible: true },
      { id: 2, title: 'Order Management', content: ['Orders', 'Invoices'],
          icon: 'bi bi-file-earmark-text-fill', color: '#0000004D', expanded: true, alwaysVisible: true },
      { id: 3, title: 'Product Management', content: ['Add New Product', 'Product List', 'Pricing List', 'Manage pricing in bulk'],
          icon: 'bi bi-box-fill', color: '#0000004D', expanded: true, alwaysVisible: true },
      { id: 4, title: 'Marketing', content: ['Vouchers', 'Promotional Banners'],
          icon: 'bi bi-megaphone-fill', color: '#0000004D', expanded: true, alwaysVisible: true },
      { id: 5, title: 'Inventory', content: ['View Stock', 'Restock Alerts', 'Generate Inventory Reports'],
          icon: 'bi bi bi-stack', color: '#0000004D', expanded: true, alwaysVisible: true },
      { id: 6, title: 'Reports', content: ['Sales Reports', 'Revenue Reports', 'Customer Insights'],
          icon: 'bi bi-clipboard2-data-fill', color: '#0000004D', expanded: true, alwaysVisible: true },
      { id: 7, title: 'Store Settings', content: ['Shipping', 'Tax Settings', 'Notifications Settings'],
          icon: 'bi bi-gear-fill', color: '#0000004D', expanded: true, alwaysVisible: true},
      { id: 8, title: 'Account Settings', content: ['Profile Settings', 'Banking Information', 'User Roles and Permissions'],
          icon: 'bi bi-person-circle', color: '#0000004D', expanded: true, alwaysVisible: true},
  ]);
</script>

<style scoped>
.q-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.q-drawer {
  width: 55px;
  overflow: visible;
  background-color: #ffffff;
}

.q-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.sidebar-icon {
  justify-content: center;
}

.sidebar-icon .q-item-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

.q-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
