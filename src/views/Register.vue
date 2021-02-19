<template>
  <div class="page page-sign">
    <h2 class="title title-2">Sign up</h2>
    <form class="page-sign__form" @submit="register">
      <TextField
        placeholder="Your name"
        type="text"
        required
        :value="name"
        @input="name = $event.target.value"
      />
      <TextField
        placeholder="Your email"
        type="email"
        required
        :value="email"
        @input="email = $event.target.value"
      />
      <TextField
        placeholder="Password"
        type="password"
        required
        :value="password"
        @input="password = $event.target.value"
      />
      <Button style-type="primary">Create account</Button>
    </form>
    <router-link class="page-sign__link" to="/login">Sign in</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import axios, { AxiosResponse } from 'axios';
import store from '@/store/index';
import router from '@/router';

interface Data {
  name: string;
  email: string;
  password: string;
}

@Options({
  data: () => ({
    name: '',
    email: '',
    password: '',
  }),
  components: {
    Button,
    TextField,
  },
  methods: {
    register(event: Event) {
      event.preventDefault();

      const data: Data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      axios
        .post('http://localhost:8000/api/auth/register/', data)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            store.commit('LOG_IN');
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('token_type', response.data.token_type);
            router.push('/');
          }
        });
    },
  },
})
export default class Register extends Vue {
}
</script>

<style scoped>

</style>
