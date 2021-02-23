<template>
  <div class="container">
    <Header/>
    <ControlButtons v-if="this.$store.getters.isAuthenticated"/>
    <Navbar v-if="this.$store.getters.isAuthenticated"/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';
import ControlButtons from '@/components/ControlButtons.vue';

@Options({
  components: {
    Header,
    Navbar,
    ControlButtons,
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
