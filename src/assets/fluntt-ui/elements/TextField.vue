<template>
  <label :class="`text-field ${error ? ' text-field-error' : ''}`">
    <span class="text-field__wrapper">
      <input
        class="text-field__input"
        :placeholder="placeholder"
        :type="type"
        :required="required"
        :value="value"
      />
      <span class="text-field__placeholder">{{ placeholder }}</span>
    </span>
    <span class="text-field__error">{{ error }}</span>
  </label>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    placeholder: String,
    type: String,
    error: String,
    required: Boolean,
    value: String,
  },
  data() {
    return {
      name: '',
    };
  },
})
export default class TextField extends Vue {
}
</script>

<style lang="scss" scoped>
.text-field {
  display: flex;
  flex-direction: column;
  width: 100%;

  .text-field__wrapper {
    position: relative;
    font-size: 14px;
    display: inline;

    .text-field__input {
      width: 100%;
      background-color: #f5f5f5;
      border: none;
      border-bottom: 2px solid #E0E0E0;
      border-radius: 4px 4px 0 0;
      box-sizing: border-box;
      //border-radius: 0;
      padding: 22px 12px 12px 12px;
      outline: none;
      line-height: 100%;
      font-size: 14px;
      transition: 0.3s ease-in-out;
      -webkit-box-shadow: inset 0 0 0 50px #f5f5f5;
      -webkit-text-fill-color: #000;
    }

    .text-field__input:focus {
      border-color: #4376F9;
      transition: 0.3s ease-in-out;
      color: #000000;
    }

    .text-field__placeholder {
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: absolute;
      margin: auto;
      z-index: 1;
      top: 0;
      bottom: 0;
      left: 12px;
      transform: translateX(0);
      cursor: text;
      color: rgba(33, 33, 33, 0.4);
      transition: 0.3s ease-in-out;
      padding: 0;
    }

    .text-field__input::placeholder {
      opacity: 0;
      transition: 0.3s ease-in-out;
    }

    .text-field__input:not(:placeholder-shown) + .text-field__placeholder,
    .text-field__input:focus + .text-field__placeholder {
      transform: translateY(-18px) translateX(0);
      transition: 0.3s ease-in-out;
      font-size: 12px;
    }

    .text-field__input:focus + .text-field__placeholder {
      transition: 0.3s ease-in-out;
      color: #4376f9;
      font-size: 12px;
    }
  }
}

.text-field-error {
  .text-field__wrapper {
    .text-field__input {
      border-color: #E32602;
      color: #e32602;
    }

    .text-field__placeholder {
      color: #e32602;
    }
  }

  .text-field__error {
    font-size: 14px;
    color: #E32602;
    margin-top: 4px;
  }
}
</style>
