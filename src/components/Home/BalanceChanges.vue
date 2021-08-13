<template>
  <div class="balance-changes">
    <Widget title="Balance changes">
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
  components: {
    Widget,
  },
})
export default class BalanceChanges extends Vue {
}
</script>

<style scoped>

</style>
