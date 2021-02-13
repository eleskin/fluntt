<template>
  <div class="container">
    <Header/>
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';
import Navbar from '@/components/Navbar.vue';

@Options({
  components: {
    Header,
    Navbar,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
.container {
  position: relative;
}
</style>
