<template>
  <button :class="`button button-${styleType}`">
    <slot/>
  </button>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    styleType: String,
  },
})
export default class Button extends Vue {}
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.05em;
  padding: 12px 24px;
  line-height: 100%;
  text-transform: uppercase;
  outline: none;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;
}

.button:hover {
  box-shadow: none;
  transition: 0.2s ease-in-out;
}

.button:active {
  transition: 0.2s ease-in-out;
}

.button-primary {
  background: #4376f9;
  box-shadow: 0 5px 10px rgba(#4376f9, 0.25);
  color: #ffffff;
}

.button-primary:active {
  background: darken(#4376f9, 4%);
}

.button-secondary {
  background: #ffffff;
  color: #4376f9;
  border: 1px solid #4376f9;
}

.button-secondary:active {
  background: darken(#ffffff, 4%);
}

.button-success {
  background: #00C12F;
  box-shadow: 0 5px 10px rgba(#00C12F, 0.25);
  color: #ffffff;
}

.button-success:active {
  background: darken(#00C12F, 4%);
}

.button-warning {
  background: #FAD30F;
  box-shadow: 0 5px 10px rgba(#FAD30F, 0.25);
  color: #000000;
}

.button-warning:active {
  background: darken(#FAD30F, 4%);
}

.button-danger {
  background: #E32602;
  box-shadow: 0 5px 10px rgba(#E32602, 0.25);
  color: #ffffff;
}

.button-danger:active {
  background: darken(#E32602, 4%);
}

.button-additional {
  background: #6003FD;
  box-shadow: 0 5px 10px rgba(#6003FD, 0.25);
  color: #ffffff;
}

.button-additional:active {
  background: darken(#6003FD, 4%);
}

.button-link {
  background: transparent;
  box-shadow: none;
  color: #4376F9;
  padding: 0;
}

.button-link::after {
  content: '';
  display: block;
  width: 0;
  height: 1px;
  background: #4376F9;
  transition: 0.2s ease-in-out;
}

.button-link:hover::after {
  width: 100%;
  transition: 0.2s ease-in-out;
}

.button-link:active {
  color: darken(#4376F9, 4%);
}
</style>
