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
import { AxiosResponse } from 'axios';

@Options({
  components: {
    Header,
    Navbar,
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch('USER_REQUEST')
        .then((response: AxiosResponse) => {
          this.$store.dispatch('GET_OPERATIONS', response.data.id);
        });
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

  .main {
    overflow-y: scroll;
    height: 100%;
    position: relative;

    .center {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;

      .page {
        height: auto;
      }
    }
  }
}
</style>
