<template>
  <div
    :class="isVisibleOptions ? 'select_active' : 'select'"
  >
    <div
      class="select__overlay"
      @click="isVisibleOptions = false"
    />
    <span
      class="select__placeholder"
      v-if="!(value || defaultValue)"
      @click="isVisibleOptions = true"
    >
      <span>{{ placeholder || 'Select currency' }}</span>
      <span class="select__arrow">
        <font-awesome-icon icon="chevron-down"/>
      </span>
    </span>
    <span
      class="select__value"
      v-if="value || defaultValue"
      @click="isVisibleOptions = true"
    >
      <span>{{ value || defaultValue }}</span>
      <span class="select__arrow">
        <font-awesome-icon icon="chevron-down"/>
      </span>
    </span>
    <ul :class="!isVisibleOptions ? 'select__options' : 'select__options_visible'">
      <li
        v-for="option of options"
        :key="options.indexOf(option)"
        @click="() => {
          onSelect(option);
          callback(option);
        }"
        :class="options.indexOf(option) === options.indexOf(value || defaultValue) ? 'active' : ''"
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
    defaultValue: String,
    callback: Function,
    placeholder: String,
  },
  data() {
    return {
      isVisibleOptions: false,
      value: '',
    };
  },
  methods: {
    onSelect(selected: string) {
      this.value = selected;
      this.isVisibleOptions = false;
    },
  },
})
export default class Select extends Vue {
}
</script>

<style lang="scss">
.select, .select_active {
  background: #ffffff;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 12px;
  outline: none;
  line-height: 100%;
  font-size: 14px;
  transition: 0.3s ease-in-out;
  position: relative;
  cursor: pointer;

  .select__placeholder, .select__value {
    color: rgba(33, 33, 33, 0.4);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s ease-in-out;
    width: 100%;

    span:first-child {
      margin-right: 4px;
    }

    span:last-child {
      margin-left: 4px;
    }
  }

  .select__value {
    span:first-child {
      color: rgba(33, 33, 33, 1);
    }
  }

  .select__options, .select__options_visible {
    position: fixed;
    margin: auto 8px 8px 8px;
    list-style: none;
    box-shadow: 0 5px 10px rgba(#212121, 0.25);
    border-radius: 4px;
    width: calc(100% - 16px);
    background-color: #ffffff;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 4px 6px;
    box-sizing: border-box;
    bottom: 0;
    max-height: 174px;
    height: fit-content;
    transition: 0.3s ease-in-out;
    z-index: 3;
    transform: translateY(182px);

    li {
      font-size: 14px;
      padding: 12px;
      cursor: pointer;
      background-color: #ffffff;
      transition: 0.2s ease-in-out;
      white-space: nowrap;
      min-width: fit-content;
      border-radius: 4px;
      margin: 2px 0;
    }

    li:hover {
      background-color: #eeeeee;
      transition: 0.2s ease-in-out;
    }

    li.active {
      background-color: #eeeeee;
      transition: 0.2s ease-in-out;
    }
  }

  .select__options_visible {
    z-index: 3;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin-top: auto;
    overflow-y: scroll;
    transition: 0.3s ease-in-out;
    transform: translateY(0);
  }
}

.select .select__overlay {
  transition: 0.2s ease-in-out 0s;
}

.select .select__overlay, .select_active .select__overlay {
  content: '';
  background-color: rgba(33, 33, 33, 0);
  height: 100%;
  width: 100%;
  position: fixed;
  inset: 0;
  display: block;
  z-index: -1;
}

.select_active .select__overlay {
  background-color: rgba(33, 33, 33, 0.8);
  backdrop-filter: blur(2px);
  z-index: 3;
  transition: 0.2s ease-in-out 0s, z-index 0s ease-in-out 0s;
}
</style>
