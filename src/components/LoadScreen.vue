<template>
  <div class="load-screen">
    <span class="load-screen__logo">Fluntt</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class LoadScreen extends Vue {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

.load-screen {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #ffffff;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .load-screen__logo {
    font-weight: 600;
    font-size: 32px;
    font-family: 'Josefin Sans', sans-serif;
    text-decoration: none;
    color: #000000;
  }
}
</style>
