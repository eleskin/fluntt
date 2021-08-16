<template>
  <div class="balance-changes">
    <Widget title="Balance changes">
      <header class="balance-changes__header">
        {{ balance }} {{ ticker }}
      </header>
      <apexchart
        type="area"
        height="120"
        width="100%"
        :options="{
          chart: {
            type: 'area',
            toolbar: {
              show: false,
            },
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          fill: {
            colors: ['#4376F9', '#ffffff']
          },
          stroke: {
            curve: 'smooth',
            width: 2,
            colors: ['#4376F9']
          },
          xaxis: {
            labels: {
              show: false
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          tooltip: {
            enabled: false
          },
          grid: {
            show: false,
            padding: {
              left: 0,
              right: 0,
              bottom: 0
            }
          }
        }"
        :series="[{
          name: 'series1',
          data: $store.getters.getChartData,
        }]"
      />
    </Widget>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import Widget from '@/components/Widget.vue';

@Options({
  data() {
    return {};
  },
  props: {
    balance: Number,
    ticker: String,
  },
  components: {
    Widget,
  },
})
export default class BalanceChanges extends Vue {
}
</script>

<style scoped>
.balance-changes__header {
  background: #F5F5F5;
  border-radius: 4px 4px 0 0;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  color: #000000;
}
</style>
