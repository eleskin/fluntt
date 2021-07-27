<template>
  <div class="select" @click="isVisibleOptions = !isVisibleOptions">
    <span class="select__placeholder" v-if="!(value || defaultValue)">
      <span>Select currency</span>
      <span class="select__arrow">
        <font-awesome-icon icon="chevron-down"/>
      </span>
    </span>
    <span class="select__value" v-if="value || defaultValue">
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
    },
  },
})
export default class Select extends Vue {
}
</script>

<style lang="scss">
.select {
  width: fit-content;
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

  .select__placeholder, .select__value {
    color: rgba(33, 33, 33, 0.4);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    transition: 0.2s ease-in-out;

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
    opacity: 0;
    position: absolute;
    margin: 0;
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
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    padding: 4px 0;

    li {
      font-size: 14px;
      padding: 12px;
      cursor: pointer;
      background-color: #ffffff;
      transition: 0.2s ease-in-out;
      white-space: nowrap;
      min-width: fit-content;
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
    opacity: 1;
    z-index: 1;
    transition: 0.2s ease-in-out 0s, z-index 0s ease-in-out 0s;
  }
}
</style>
