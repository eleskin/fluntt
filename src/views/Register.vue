<template>
  <div class="page page-sign">
    <h2 class="title title-2">Sign up</h2>
    <form class="page-sign__form" @submit="register">
      <TextField
        placeholder="Your name"
        type="text"
        required
        v-model="name"
      />
      <TextField
        placeholder="Your email"
        type="email"
        required
      />
      <TextField
        placeholder="Password"
        type="password"
        required
      />
      <Button style-type="primary">Create account</Button>
    </form>
    <router-link class="page-sign__link" to="/login">Sign in</router-link>
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';

@Options({
  data: {
    name: String,
    email: String,
    password: String,
  },
  components: {
    Button,
    TextField,
  },
  methods: {
    register: (event) => {
      event.preventDefault();
    },
  },
})
export default class Register extends Vue {
}
</script>

<style scoped>

</style>
