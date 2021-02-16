<template>
  <div class="page page-sign">
    <h2 class="title title-2">Sign in</h2>
    <TextField placeholder="Email" type="email"/>
    <TextField placeholder="Password" type="password"/>
    <Checkbox>Remember me</Checkbox>
    <Button style-type="primary">Log in</Button>
    <router-link class="page-sign__link" to="/register">Register now</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField, Checkbox } from '@/assets/fluntt-ui';

@Options({
  components: {
    Button,
    TextField,
    Checkbox,
  },
})
export default class Login extends Vue {
}
</script>

<style scoped>

</style>
