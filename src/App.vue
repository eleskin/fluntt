<template>
  <Header/>
  <router-view/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import Header from '@/components/Header.vue';

@Options({
  components: {
    Header,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">

</style>
