<template>
  <div class="page page-sign">
    <h2 class="title title-2">Sign up</h2>
    <TextField placeholder="Your name" type="text"/>
    <TextField placeholder="Your email" type="email"/>
    <TextField placeholder="Password" type="password"/>
    <Button style-type="primary">Create account</Button>
    <router-link class="page-sign__link" to="/login">Sign in</router-link>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';

@Options({
  components: {
    Button,
    TextField,
  },
})
export default class Register extends Vue {
}
</script>

<style scoped>

</style>
