<template>
  <div class="widget">
    <h3 class="widget__title">{{ title }}</h3>
    <div class="widget__card">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    title: String,
  },
})
export default class Widget extends Vue {}
</script>

<style lang="scss" scoped>
.widget {
  margin: 12px 0;
  .widget__title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
    color: #212121;
  }
  .widget__card {
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
}
</style>
