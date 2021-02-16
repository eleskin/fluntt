<template>
  <div class="page">
    Settings
    <router-link to="/login">Login</router-link>
    <router-link to="/register">Register</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
})
export default class Settings extends Vue {}
</script>

<style scoped>

</style>
