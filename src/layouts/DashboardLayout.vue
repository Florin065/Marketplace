<template>
  <q-layout view="lHh Lpr lFf" style="height: 100vh;">
    <q-header style="box-shadow:none">
      <q-toolbar>
        <!-- Logo on the left -->
        <q-img src="../assets/logo.png" style="width:58px; height:48px;" fit="contain" @click="router.push('/')" />

        <!-- Flex spacer to push elements to the sides -->
        <q-space />

        <!-- Search bar in the center -->
        <!-- Use "flex-shrink: 0" to prevent it from shrinking in smaller screens -->
        <q-input placeholder="Caută orice în back-office" class="q-mr-md q-ml-md" dense
          style="box-shadow: none; border-radius: 12px; width: 476px; flex-shrink: 0;" v-model="search">
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

    <q-drawer v-model="leftDrawerOpen" show-if-above :mini="miniMode" mini-to-overlay :width="250" :breakpoint="500"
      bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white'">
      <div style="display: flex; padding: 3.07vh 0.87vw; flex-direction: column; justify-content: space-between;
      align-items: flex-end; width: 55px; height: 100vh; background: var(--color-bg, #FFF);">
        <div style="display: flex; padding: 12.96vh 0px; flex-direction: column; justify-content: space-between;
        align-items: flex-start; flex: 1 0 0; align-self: stretch;">
          <q-list v-for="tab in tabs" :key="tab.id">
            <q-item>
              <q-item-section avatar @click="toggleTab(tab)" v-if="miniMode">
                <q-icon :class="tab.icon" />
              </q-item-section>
              <q-expansion-item 
                :label="tab.title" 
                :icon="tab.icon" 
                class v-if="!miniMode" 
                :model-value="tab.expanded" 
                @update:model-value="updateExpanded(tab)"
              >
                <q-item-section >
                  <q-item clickable v-ripple v-for="item in tab.content" :key="item" >
                    <q-item-section @click="router.push('/dashboard/' + pathify(item))" >
                      {{ item }}
                    </q-item-section>
                  </q-item>
                </q-item-section>
              </q-expansion-item>
            </q-item>
          </q-list>
        </div>
        <q-icon name="logout" @click="logout" style="width: 24px; height: 24px;" />
      </div>
    </q-drawer>

    <q-page-container style="width: 100%;" @click="miniMode=true">
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const search = ref('');
const leftDrawerOpen = ref(false);
const miniMode = ref(true);


const logout = () => {
  console.log('Logout');
};

const tabs = ref([
  {
    id: 1, title: 'Dashboard', content: ['Overview', 'Notifications', 'Performance Metrics'],
    icon: 'bi-window-desktop', color: '#0000004D', expanded: false, alwaysVisible: true,
  },
  {
    id: 2, title: 'Order Management', content: ['Orders', 'Invoices'],
    icon: 'bi-file-earmark-text-fill', color: '#0000004D', expanded: false, alwaysVisible: true
  },
  {
    id: 3, title: 'Product Management', content: ['Add New Product', 'Product List', 'Pricing List', 'Manage pricing in bulk'],
    icon: 'bi-box-fill', color: '#0000004D', expanded: false, alwaysVisible: true
  },
  {
    id: 4, title: 'Marketing', content: ['Vouchers', 'Promotional Banners'],
    icon: 'bi-megaphone-fill', color: '#0000004D', expanded: false, alwaysVisible: true
  },
  {
    id: 5, title: 'Inventory', content: ['View Stock', 'Restock Alerts', 'Generate Inventory Reports'],
    icon: 'bi-stack', color: '#0000004D', expanded: false, alwaysVisible: true
  },
  {
    id: 6, title: 'Reports', content: ['Sales Reports', 'Revenue Reports', 'Customer Insights'],
    icon: 'bi-clipboard2-data-fill', color: '#0000004D', expanded: false, alwaysVisible: true
  },
  {
    id: 7, title: 'Store Settings', content: ['Shipping', 'Tax Settings', 'Notifications Settings'],
    icon: 'bi-gear-fill', color: '#0000004D', expanded: false, alwaysVisible: true
  },
  {
    id: 8, title: 'Account Settings', content: ['Profile Settings', 'Banking Information', 'User Roles and Permissions'],
    icon: 'bi-person-circle', expanded: false, alwaysVisible: true
  },
]);


const toggleTab = (tab) => {
  tab.expanded = !tab.expanded;
  miniMode.value = false;
  updateExpanded(tab);
  console.log(tab)
};

const updateExpanded = (tab) => {
  for (let i = 0; i < tabs.value.length; i++) {
    if (tabs.value[i].id !== tab.id) {
      tabs.value[i].expanded = false;
    } else {
      tabs.value[i].expanded = true;
    }
  }
}

const pathify = (item) => {
  return item.toLowerCase().replace(/\s/g, '-');
}

</script>

<style scoped>
.q-header {
  background: #F5F6FA;
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
