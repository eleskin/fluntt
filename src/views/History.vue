<template>
  <div class="page">History</div>
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
export default class History extends Vue {
}
</script>

<style scoped>

</style>
