<template>
  <div class="container">
    <Header/>
    <router-view/>
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
  position: relative;
}
</style>
