<template>
  <div class="container">
    <Header/>
    <div class="main">
      <transition name="scale" mode="out-in">
        <router-view/>
      </transition>
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

.scale-enter-active,
.scale-leave-active {
  transition: all 0.55s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
