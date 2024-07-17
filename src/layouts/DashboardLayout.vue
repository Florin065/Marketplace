<template>
  <q-layout view="lHh Lpr lFf" style="height: 100vh;">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="menu" @click="toggleLeftDrawer" />
        <!-- Logo on the left -->
        <q-img src="../assets/logo.png" style="width:58px; height:48px;"/>
        
        <!-- Flex spacer to push elements to the sides -->
        <q-space />
        
        <!-- Search bar in the center -->
        <!-- Use "flex-shrink: 0" to prevent it from shrinking in smaller screens -->
        <q-input
          filled
          placeholder="Caută orice în back-office"
          class="q-mr-md q-ml-md"
          style="box-shadow: none; border-radius: 12px; width: 476px; flex-shrink: 0;"
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

    <q-drawer
    v-model="leftDrawerOpen"
    show-if-above

    :mini="miniMode"
    @click="miniMode = !miniMode"
    mini-to-overlay

    :width="200"
    :breakpoint="500"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
  >
      <q-list v-for="tab in tabs" :key="tab.id">
        <q-item clickable v-ripple @click="toggleTab(tab)">
          <q-item-section avatar>
            <q-icon :class="tab.icon" />
          </q-item-section>
          <q-item-section>
            {{ tab.title }}
          </q-item-section>
          <q-item-section side>
            <q-icon :name="tab.expanded ? 'chevron-up' : 'chevron-down'" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page padding>
        <p v-for="n in 15" :key="n">
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaasssssssssssssssssss
        </p>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const search = ref('');
  const leftDrawerOpen = ref(false);
  const miniMode = ref(true);

  const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  };

  const logout = () => {
    console.log('Logout');
  };

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
          icon: 'bi bi-person-circle', expanded: true, alwaysVisible: true},
  ]);


  const toggleTab = (tab) => {
    tab.expanded = !tab.expanded;
  };

  </script>

<style scoped>
.q-header {
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.q-drawer {
  width: 250px;
}

.q-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
