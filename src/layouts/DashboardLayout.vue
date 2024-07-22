<template>
  <q-layout view="lHh Lpr lFf" style="height: 100vh;">
    <q-header style="box-shadow:none">
      <q-toolbar>
        <q-img class="q-ml-xl" src="../assets/logo.png" style="width:58px; height:48px;" fit="contain" @click="router.push('/')" />

        <q-input placeholder="Caută orice în back-office" dense v-model="search" borderless
          style="box-shadow: none; border-radius: 12px; width: 476px; flex-shrink: 0; margin-left: 550px">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-space />
        
        <q-avatar>
          <q-img src="https://cdn.quasar.dev/img/avatar2.jpg" alt="User Avatar"/>
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above :mini="miniMode" mini-to-overlay :width="250" :breakpoint="500"
      bordered :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white'">
      <div style="display: flex; flex-direction: column; justify-content: space-between;
        align-items: center; width: 100%; height: 100vh; background: var(--color-bg, #FFF);">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; flex: 1 0 auto; width: 100%;">
          <q-list v-for="tab in tabs" :key="tab.id" style="width: 100%;">
            <q-item clickable>
              <q-item-section avatar v-if="miniMode">
                <q-btn flat icon="none" @click="toggleTab(tab)">
                  <q-icon :name="tab.icon" />
                  <q-tooltip style="white-space: nowrap">{{ tab.title }}</q-tooltip>
                </q-btn>
              </q-item-section>
              <q-expansion-item
                style="text-align: start; width: 220px;"
                :label="tab.title" 
                :icon="tab.icon"
                v-if="!miniMode"
                :model-value="tab.expanded" 
                @update:model-value="updateExpanded(tab)"
              >
                <q-item-section>
                  <q-item class="q-ml-md" clickable v-ripple v-for="item in tab.content" :key="item">
                    <q-item-section @click="router.push('/dashboard/' + pathify(item))" class="q-item-section-left-align">
                      {{ item }}
                    </q-item-section>
                  </q-item>
                </q-item-section>
              </q-expansion-item>
            </q-item>
          </q-list>
        </div>
        <div v-if="miniMode" style="width: 100%; display: flex; justify-content: center; margin-bottom: 20px;">
          <q-btn flat icon="logout" @click="logout" style="width: 24px; height: 24px;">
            <q-tooltip>Logout</q-tooltip>
          </q-btn>
        </div>
        <div v-else style="width: 100%; padding: 0 20px 20px;">
          <q-btn label="Logout" @click="logout" style="width: 100%; border-radius: 12px;" />
        </div>
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
  console.log('Logging out...');
  router.push('/auth/login');
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

const toggleTab = (tab: { expanded: boolean; }) => {
  tab.expanded = !tab.expanded;
  miniMode.value = false;
  updateExpanded(tab);
  console.log(tab)
};

const updateExpanded = (tab: { expanded?: boolean; id?: any; }) => {
  for (let i = 0; i < tabs.value.length; i++) {
    if (tabs.value[i].id !== tab.id) {
      tabs.value[i].expanded = false;
    } else {
      tabs.value[i].expanded = true;
    }
  }
}

const pathify = (item: string) => {
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

.q-expansion-item-left-align .q-item__label,
.q-item-section-left-align {
  align-items: start;
}

</style>
