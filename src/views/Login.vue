<template>
  <div class="page page-sign">
    <h2 class="title title-2">Sign in</h2>
    <form class="page-sign__form" @submit="login">
      <TextField
        placeholder="Email"
        type="text"
        :error="errors.email"
        :value="data.email"
        @input="data.email = $event.target.value; errors.email = '';"
      />
      <TextField
        placeholder="Password"
        type="password"
        :error="errors.password"
        :value="data.password"
        @input="data.password = $event.target.value; errors.password = '';"
      />
      <Button style-type="primary">Log in</Button>
    </form>
    <router-link class="page-sign__link" to="/register">Register now</router-link>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import axios, { AxiosError, AxiosResponse } from 'axios';
import store from '@/store';
import router from '@/router';

interface Data {
  email: string;
  password: string;
}

@Options({
  data: () => ({
    data: {
      email: '',
      password: '',
    },
    errors: {},
  }),
  components: {
    Button,
    TextField,
  },
  methods: {
    login(event: Event) {
      event.preventDefault();

      this.errors = {};

      const data: Data = {
        email: this.data.email,
        password: this.data.password,
      };
      axios
        .post('http://localhost:8000/api/auth/login/', data)
        .then((response: AxiosResponse) => {
          if (response.status === 200) {
            store.commit('LOG_IN');
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('token_type', response.data.token_type);
            router.push('/');
          }
        })
        .catch((error: AxiosError) => {
          const errors = error.response?.data.errors || {};
          this.errors = {
            email: Array.isArray(errors.email) ? errors.email[0] : '',
            password: Array.isArray(errors.password) ? errors.password[0] : '',
          };
          if (error.response?.data.message === 'Unauthorized') {
            this.errors = {
              email: 'Check if your email is correct',
              password: 'Check if your password is correct',
            };
          }
        });
    },
  },
})
export default class Login extends Vue {
}
</script>

<style scoped>

</style>
