<template>
  <div class="container">
    <Header/>
    <div class="main">
      <router-view/>
    </div>
    <Navbar v-if="this.$store.getters.isAuthenticated"/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';

@Options({
  components: {
    Header,
    Navbar,
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch('USER_REQUEST');
    }
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
.container {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  //grid-template-areas:
  //  'header'
  //  'main'
  //  'navbar';
  .main {
    //grid-area: main;
    overflow-y: scroll;
    height: 100%;
    position: relative;
  }
}
</style>
