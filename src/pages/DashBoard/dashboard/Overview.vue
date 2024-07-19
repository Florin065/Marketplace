<template>
  <div style="width:80vw">
    <q-card flat style="background: transparent">
      <q-card-section class="q-ml-md title" style="text-align: left">
        Dashboard
      </q-card-section>
      <div class="row">
        <div class="col" style="margin-left:30px; margin-right:30px" v-for="(stat, index) in stats" :key="index">
          <q-card class="q-pa-md" style="width:320px; height: 180px; border-radius: 20px">
            <div class="row card-text" style="text-align:left">
              <div class="col">
                <div class="q-pa-md" style="color: #202224; opacity: 0.7">{{ stat.title }}</div>
                <div class="text-number q-pl-md q-pb-md">{{ stat.value }}</div>
                <div style="color: #606060; white-space: nowrap;" class="q-pl-md">
                  <q-icon size="20px"
                    :name="stat.changeType === 'up' ? 'trending_up' : 'trending_down'"
                    :style="{ color: stat.changeColor, flexShrink: 0 }" />
                  <span :style="{ marginLeft: '7px', color: stat.changeColor }">{{ stat.change }}</span>
                    {{ stat.changeType === 'up' ? 'Up' : 'Down' }} from last month
                </div>
              </div>
              <div class="col-auto">
                <q-avatar size="60px" :style="{ backgroundColor: stat.bgColor }">
                  <q-icon :name="stat.icon" size="32px" :style="{ color: stat.iconColor }" />
                </q-avatar>
              </div>
            </div>
          </q-card>
        </div>
      </div>

      <q-card class="q-mt-xl q-ml-lg q-mr-lg" style="border-radius: 20px">
        <q-card-section class="title" style="text-align: left">
          Sales Chart
        </q-card-section>
        <q-card-section>
          <chart></chart>
        </q-card-section>
      </q-card>

      <q-card class="q-mt-xl q-ml-lg q-mr-lg table" style="border-radius: 20px;">
        <q-card-section class="title" style="text-align: left; display: flex; justify-content: space-between; align-items: center; font-weight: 700">
          Recent Orders
          <q-select
            v-model="selectedTimeframe"
            :options="timeframeOptions.map(option => option.value)"
            outlined
            dense
          />
        </q-card-section>
        <q-table
          :rows="filteredOrders"
          :columns="columns"
          row-key="id"
          flat
          wrap-cells
          separator="none"
          style="max-height: 400px; overflow-y: auto; font-weight: 600; opacity: 0.9"
        >
          <template v-slot:body-cell-status="props">
            <q-td :props="props">
              <q-badge :color="props.row.statusColor" :label="props.row.status" />
            </q-td>
          </template>
        </q-table>
      </q-card>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { format, subYears, subMonths, subWeeks, subDays, isAfter } from "date-fns";
import Chart from "./components/ChartComponent.vue";

const stats = [
  {
    title: "Total Products",
    value: "689",
    change: "8.5%",
    changeType: "up",
    changeColor: "#00B69B",
    iconColor: "rgba(130, 128, 255, 0.78)",
    bgColor: "rgba(130, 128, 255, 0.21)",
    icon: "bi-cart"
  },
  {
    title: "Total Orders",
    value: "1.293",
    change: "1.3%",
    changeType: "up",
    changeColor: "#00B69B",
    iconColor: "#FEC53D",
    bgColor: "rgba(254, 197, 61, 0.21)",
    icon: "bi-card-list"
  },
  {
    title: "Total Sales",
    value: "€89.000",
    change: "4.3%",
    changeType: "down",
    changeColor: "#F93C65",
    iconColor: "#4AD991",
    bgColor: "rgba(74, 217, 145, 0.21)",
    icon: "bi-currency-dollar"
  },
  {
    title: "Total Pending",
    value: "204",
    change: "1.8%",
    changeType: "up",
    changeColor: "#00B69B",
    iconColor: "rgba(255, 144, 102, 0.78)",
    bgColor: "rgba(255, 144, 102, 0.3)",
    icon: "bi-hourglass-split"
  }
];

const columns = [
  { name: 'id', required: true, label: 'ID', align: 'left', field: (row: { id: any; }) => row.id, format: (val: any) => `${val}`, sortable: true },
  { name: 'price', label: 'Price', align: 'left', field: 'price', sortable: true },
  { name: 'quantity', label: 'Quantity', align: 'left', field: 'quantity', sortable: true },
  { name: 'customer', label: 'Customer', align: 'left', field: 'customer', sortable: true },
  { name: 'location', label: 'Location', align: 'left', field: 'location', sortable: true },
  { name: 'date', label: 'Date', align: 'left', field: 'date', sortable: true },
  { name: 'category', label: 'Category', align: 'left', field: 'category', sortable: true },
  { name: 'status', label: 'Status', align: 'left', field: 'status', sortable: true }
];

const orders = ref([
  {
    id: '00001',
    price: '€36',
    quantity: 6,
    customer: 'Christine Brooks',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-09-04',
    category: 'Scânduri',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: '00002',
    price: '€200',
    quantity: 8,
    customer: 'Rosie Pearson',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-05-28',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00003',
    price: '€200',
    quantity: 16,
    customer: 'Darrell Caldwell',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-11-23',
    category: 'Ciment, lianți, var',
    status: 'Rejected',
    statusColor: 'red'
  },
  {
    id: '00004',
    price: '€200',
    quantity: 1,
    customer: 'Donald Trump',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-11-23',
    category: 'Ciment, lianți, var',
    status: 'Pending',
    statusColor: 'orange'
  },
  {
    id: '00005',
    price: '€200',
    quantity: 112,
    customer: 'Joe Biden',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-11-23',
    category: 'Ciment, lianți, var',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: '00006',
    price: '€200',
    quantity: 182,
    customer: 'Hugh Campbell',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-11-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00007',
    price: '€200',
    quantity: 172,
    customer: 'William Butcher',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-11-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00008',
    price: '€200',
    quantity: 122,
    customer: 'Homeblender',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-11-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00009',
    price: '€200',
    quantity: 1512,
    customer: 'MM',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-01-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00010',
    price: '€200',
    quantity: 32,
    customer: 'Frenchie',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2024-03-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00011',
    price: '€200',
    quantity: 76766,
    customer: 'Kimiko',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2010-11-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00012',
    price: '€200',
    quantity: 5445,
    customer: 'Hugh Campbell',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2012-11-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
  {
    id: '00013',
    price: '€200',
    quantity: 2222,
    customer: 'Hugh Campbell',
    location: 'Str Tâmplari, Sector 3, București, nr 144',
    date: '2014-11-23',
    category: 'Ciment, lianți, var',
    status: 'Processing',
    statusColor: 'purple'
  },
]);

const timeframeOptions =
  ['All time', 'Last 5 years', 'Last 3 years', 'Last year','Last 6 months', 'Last 3 months', 'Last month', 'Last week', 'Yesterday', 'Today']
    .map(value => ({ value }));

const selectedTimeframe = ref('All time');

const filteredOrders = computed(() => {
  if (!Array.isArray(orders.value)) {
    console.error('orders.value is not an array');
    return [];
  }

  const today = new Date();
  let filtered = orders.value;
  console.log('Selected timeframe:', selectedTimeframe.value);

  switch (selectedTimeframe.value) {
    case 'All time':
      // No filtering needed
      break;
    case 'Last 5 years':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subYears(today, 5)));
      break;
    case 'Last 3 years':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subYears(today, 3)));
      break;
    case 'Last year':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subYears(today, 1)));
      break;
    case 'Last 6 months':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subMonths(today, 6)));
      break;
    case 'Last 3 months':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subMonths(today, 3)));
      break;
    case 'Last month':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subMonths(today, 1)));
      break;
    case 'Last week':
      filtered = filtered.filter(order => isAfter(new Date(order.date), subWeeks(today, 1)));
      break;
    case 'Yesterday':
      filtered = filtered.filter(order => {
        const yesterday = subDays(today, 1);
        return format(new Date(order.date), 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd');
      });
      break;
    case 'Today':
      filtered = filtered.filter(order => format(new Date(order.date), 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'));
      break;
    default:
      console.error('Invalid selectedTimeframe:', selectedTimeframe.value);
  }

  return filtered;
});
</script>

<style scoped>
.title {
  color: #202224;
  font-family: "Nunito Sans";
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.114px;
}

.card-text {
  font-family: "Nunito Sans";
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.text-number {
  color: #202224;
  font-family: "Nunito Sans";
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1px;
}

.table {
  color: #202224;
  font-family: "Nunito Sans";
  font-size: 14px;
  font-style: normal;
  line-height: normal;
}
</style>

<!-- <template>
  <div><chart></chart></div>
</template>

<script setup lang="ts">
import Chart from "./components/ChartComponent.vue";

const Overview = {
  components: {
    chart: Chart
  },
  methods: {
    handler() {
      var args = arguments;
      for (var arg of args) {
        if (arg instanceof Function) {
          arg();
        }
      }
    }
  }
};

</script> -->
