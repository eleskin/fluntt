<template>
  <header class="header">
    <router-link to="/" class="header__logo">Fluntt</router-link>
  </header>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
})
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

.header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 14px;
  box-sizing: border-box;
  .header__logo {
    font-weight: 600;
    font-size: 20px;
    font-family: 'Josefin Sans', sans-serif;
    text-decoration: none;
    color: #000000;
  }
  .header__btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    font-size: 14px;
    border: none;
    outline: none;
  }
  .header__back {
    background-color: #4376f9;
    color: #ffffff;
  }
  .header__back[disabled] {
    background: #d7d7d7;
  }
  .header__notifications {
    color: #4376f9;
  }
}
</style>
