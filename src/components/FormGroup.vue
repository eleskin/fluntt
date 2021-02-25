<template>
  <form class="form">
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class FormGroup extends Vue {}
</script>

<style lang="scss">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  .text-field, .button {
    margin-bottom: 12px;
  }
}
</style>
