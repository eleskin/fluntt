<template>
  <div class="profile">
    <span>{{ userName }}</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {},
  props: {
    userName: '',
  },
})
export default class Profile extends Vue {}
</script>

<style scoped>

</style>
