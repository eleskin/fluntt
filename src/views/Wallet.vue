<template>
  <div class="page page-with-buttons">Wallet</div>
  <ControlButtons/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ControlButtons from '@/components/ControlButtons.vue';

@Options({
  components: {
    ControlButtons,
  },
})
export default class Wallet extends Vue {}
</script>

<style scoped>

</style>
