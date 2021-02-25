<template>
  <div class="latest-activity">
    <Widget title="Latest activity">
      <div class="latest-activity__container">
        <h4 class="latest-activity__title">25 Feb</h4>
      </div>
    </Widget>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Widget from '@/components/Widget.vue';

@Options({
  components: {
    Widget,
  },
})
export default class LatestActivity extends Vue {}
</script>

<style lang="scss" scoped>
.latest-activity {
  .latest-activity__container {
    padding: 12px;
    .latest-activity__title {
      margin: 0 0 12px 0;
    }
  }
}
</style>
