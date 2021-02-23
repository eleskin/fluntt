<template>
  <div class="skeleton" :style="style"></div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    height: '',
  },
  computed: {
    style() {
      return `height: ${this.height}`;
    },
  },
})
export default class Skeleton extends Vue {}
</script>

<style lang="scss" scoped>
.skeleton {
  background: rgba(#CDCDCD, 0.6);
  border-radius: 4px;
}
</style>
