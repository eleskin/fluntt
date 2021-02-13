<template>
  <div class="page">
    Home
<!--    <Button style-type="primary">Primary Button</Button>-->
<!--    <Button style-type="secondary">Secondary Button</Button>-->
<!--    <Button style-type="success">Success Button</Button>-->
<!--    <Button style-type="warning">Warning Button</Button>-->
<!--    <Button style-type="danger">Danger Button</Button>-->
<!--    <Button style-type="additional">Additional Button</Button>-->
<!--    <Button style-type="link">Link</Button>-->
<!--    <TextField placeholder="Placeholder" type="text" error="Error"/>-->
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';

@Options({
  components: {
    Button,
    TextField,
  },
})
export default class Home extends Vue {}
</script>
