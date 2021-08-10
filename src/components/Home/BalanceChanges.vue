<template>
  <div class="balance-changes">
    <Widget title="Balance changes">
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
