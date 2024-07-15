<template>
  <!-- <q-page> -->
      <!-- <q-card> -->
        <!-- <q-card-section class="sidebar-overlay"> -->
          <!-- <div class="tab" v-for="tab in tabs" :key="tab.id" @click="toggleTab(tab)"> -->
            <!-- <div style="display:flex; align-items: flex-start;"> -->
              <!-- <i :class="tab.icon" :style="{ color: tab.color }"></i> -->
              <!-- <span class="tab-title" v-if="hover">{{ tab.title }}</span> -->
            <!-- </div> -->
            <!-- <div v-if="tab.expanded && (hover || tab.alwaysVisible)" class="tab-content"> -->
              <!-- <div v-for="content in tab.content" :key="content">{{ content }}</div> -->
            <!-- </div> -->
          <!-- </div> -->
          <!-- <div> -->
            <!-- If hover is true, show the logout button -->
            <!-- <q-btn v-if="hover" -->
              <!-- style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); color: red; border: 2px solid red;" -->
              <!-- @click="logout">Log out</q-btn> -->
            <!-- If hover is false, show the icon instead -->
            <!-- <i v-else class="bi bi-box-arrow-right" -->
              <!-- style="color: #0000004D" -->
              <!-- @click="logout" /> -->
          <!-- </div> -->
        <!-- </q-card-section> -->
<!--  -->
        <!-- <q-card-section class="col-12" style="box-shadow:none; display: flex; flex-direction: row;"> -->
          <!-- <q-card-section class="col-4" style="align-items: left"> -->
            <!-- <q-img src="../../assets/logo.png" style="width:58px; height:48px;"/> -->
          <!-- </q-card-section> -->
          <!-- <q-card-section class="col-4"> -->
            <!-- <q-input v-model="text" label="Caută orice în back-office" style="width:476px"> -->
              <!-- <template v-slot:prepend> -->
                <!-- <q-icon name="search" style="color:#60A5FA"/> -->
              <!-- </template> -->
            <!-- </q-input> -->
          <!-- </q-card-section> -->
          <!-- <q-card-section class="col-4" style="display: flex; flex-direction: row;"> -->
            <!-- <q-card-section style="display: flex; flex-direction: column;"> -->
              <!-- <i class="bi bi-person-circle" /> -->
            <!-- </q-card-section> -->
            <!-- <q-card-section style="display: flex; flex-direction: column;"> -->
              <!-- <div class="row">Domn Semaca</div> -->
              <!-- <label class="row">Contul tău</label> -->
            <!-- </q-card-section> -->
          <!-- </q-card-section> -->
        <!-- </q-card-section> -->
      <!-- </q-card> -->
<!--  -->
  <!-- </q-page> -->
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';

  const text = ref('');

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

    const hover = ref(false);

    const toggleTab = (tab) => {
        tab.expanded = !tab.expanded;
    };

    const logout = () => {
        console.log('Logging out...');
    };

  </script>
  
  <style scoped>

  
  .sidebar-overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 55px;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);

    color: var(--color-text, #09090B);
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
  }
  
  .sidebar-overlay:hover {
    width: auto;
    align-items: flex-start;
  }
  
  .tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }
  
  .sidebar-overlay:hover .tab-title {
    display: inline;
    color: var(--color-icon-interactive, #2563EB);
    margin-left: 10px;
  }
  
  .tab-content {
    display: none;
    align-items: flex-start;
  }

  .sidebar-overlay:hover .tab-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  </style>