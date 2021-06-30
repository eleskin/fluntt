<template>
  <div class="select" @click="isVisibleOptions = !isVisibleOptions">
    <span class="select__placeholder">
      <span>Select language</span>
      <span class="select__arrow">
        <font-awesome-icon icon="chevron-down"/>
      </span>
    </span>
    <ul :class="!isVisibleOptions ? 'select__options' : 'select__options_visible'">
      <li
        v-for="option of options"
        :key="options.indexOf(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    options: Array,
  },
  data: () => ({
    isVisibleOptions: false,
  }),
})
export default class Select extends Vue {
}
</script>

<style lang="scss">
.select {
  width: 100%;
  background: #ffffff;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px;
  outline: none;
  line-height: 100%;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  display: inline;
  position: relative;
  cursor: pointer;

  .select__placeholder {
    color: rgba(33, 33, 33, 0.4);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    span:first-child {
      margin-right: 4px;
    }

    span:last-child {
      margin-left: 4px;
    }
  }

  .select__options, .select__options_visible {
    opacity: 0;
    position: absolute;
    margin: 0;
    padding: 0;
    list-style: none;
    box-shadow: 0 5px 10px rgba(#212121, 0.25);
    border-radius: 4px;
    width: calc(100% + 4px);
    background-color: #ffffff;
    transform: translateX(-2px) translateY(-2px);
    top: 0;
    left: 0;
    right: 0;
    z-index: -1;
    transition: 0.2s ease-in-out 0s;
    li {
      font-size: 14px;
      padding: 12px;
      cursor: pointer;
      background-color: #ffffff;
      margin: 4px 0;
      transition: 0.2s ease-in-out;
    }

    li:hover {
      background-color: #eeeeee;
      transition: 0.2s ease-in-out;
    }
  }

  .select__options_visible {
    opacity: 1;
    z-index: 1;
    transition: 0.2s ease-in-out 0s, z-index 0s ease-in-out 0s;
  }
}
</style>
