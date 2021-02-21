<template>
  <div class="container">
    <Header/>
<!--    <LoadScreen v-if="!isLoad"/>-->
    <Navbar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import LoadScreen from '@/components/LoadScreen.vue';
import store from '@/store';

@Options({
  data: () => ({
    isLoad: false,
  }),
  components: {
    Header,
    Navbar,
    LoadScreen,
  },
  created() {
    if (store.getters.isAuthenticated) {
      store.dispatch('USER_REQUEST');
    }
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
.container {
  position: relative;
}
</style>
