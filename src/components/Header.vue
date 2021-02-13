<template>
  <header class="header">
    <router-link to="/user" class="header__user header__btn">
      <font-awesome-icon icon="user"/>
    </router-link>
    <router-link to="/" class="header__logo">Fluntt</router-link>
    <router-link to="/notifications" class="header__notifications header__btn">
      <font-awesome-icon icon="bell"/>
    </router-link>
  </header>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class Header extends Vue {
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap');

.header {
  background: #FFFFFF;
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.05);
  border-radius: 0 0 4px 4px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  .header__logo {
    font-weight: 600;
    font-size: 16px;
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
  }
  .header__user {
    background-color: #4376f9;
    color: #ffffff;
  }
  .header__notifications {
    color: #4376f9;
  }
}
</style>
