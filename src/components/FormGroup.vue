<template>
  <div>
    <form class="form" novalidate>
      <div class="grid">
        <slot></slot>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
})
export default class FormGroup extends Vue {
}
</script>

<style lang="scss">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>
