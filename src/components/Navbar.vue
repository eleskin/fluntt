<template>
  <nav class="navbar">
    <router-link to="/" class="navbar__link">
      <font-awesome-icon icon="home"/>
    </router-link>
    <router-link to="/wallet" class="navbar__link">
      <font-awesome-icon icon="wallet"/>
    </router-link>
    <router-link to="/history" class="navbar__link">
      <font-awesome-icon icon="history"/>
    </router-link>
    <router-link to="/settings" class="navbar__link">
      <font-awesome-icon icon="sliders-h"/>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Navbar extends Vue {
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 6px 12px;
  background: #FFFFFF;
  box-shadow: 0px -3px 3px rgba(0, 0, 0, 0.05);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  .navbar__link {
    padding: 12px;
    border-radius: 4px;
    font-size: 16px;
    color: rgba(#424242, 0.5);
    text-decoration: none;
    transition: 0.2s ease-in-out;
    background: #FFFFFF;
  }
  .navbar__link.router-link-exact-active {
    background: rgba(67, 118, 249, 0.2);
    color: #4376F9;
    transition: 0.2s ease-in-out;
  }
}
</style>
