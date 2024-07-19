<template>
    <highcharts :options="chartOptions"></highcharts>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import Highcharts from 'highcharts';
  
  export default defineComponent({
    name: 'ChartComponent',
    components: {
      highcharts: () => import('highcharts-vue')
    },
    setup() {
      const chartOptions = ref({
        chart: {
          type: 'line'
        },
        title: {
          text: 'Sales Data'
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
          title: {
            text: 'Sales'
          }
        },
        series: [{
          name: 'Sales',
          data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
      });
  
      return {
        chartOptions
      };
    }
  });
  </script>
  
  <style scoped>
  </style>