<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox-input">
    <span class="checkbox__box"><font-awesome-icon icon="check"/></span>
    <span class="checkbox__text"><slot></slot></span>
  </label>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
  },
})
export default class Checkbox extends Vue {}
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 12px 0;
  .checkbox__text {
    font-size: 16px;
  }
  .checkbox-input {
    opacity: 0;
    z-index: -1;
    visibility: hidden;
    position: absolute;
  }
  .checkbox__box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 16px;
    width: 16px;
    box-sizing: border-box;
    border: 2px solid #E0E0E0;
    border-radius: 2px;
    margin-right: 4px;
    color: transparent;
    font-size: 8px;
    transition: 0.3s ease-in-out;
  }
  .checkbox-input:checked + .checkbox__box {
    color: #4376F9;
    border-color: #4376F9;
    transition: 0.3s ease-in-out;
  }
}
</style>
