<template>
  <div class="control-buttons">
    <Button style-type="success" to="/operation/income" :show-shadow="true">Add income</Button>
    <Button style-type="danger" to="/operation/expense" :show-shadow="true">Add expense</Button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button } from '@/assets/fluntt-ui';

@Options({
  components: {
    Button,
  },
})
export default class ControlButtons extends Vue {}
</script>

<style lang="scss" scoped>
.control-buttons {
  position: absolute;
  width: 100%;
  bottom: 0;
  margin-bottom: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button:first-child {
    margin-left: 12px;
    margin-right: 6px;
  }
  button:last-child {
    margin-left: 6px;
    margin-right: 12px;
  }
}
</style>
