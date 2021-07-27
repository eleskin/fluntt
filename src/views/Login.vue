<template>
  <div class="center">
    <div class="page">
      <FormGroup @submit="login">
        <h2 class="title title-2">Sign in</h2>
        <TextField
          placeholder="Email"
          type="email"
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
        <Button style-type="link" to="/register">Register now</Button>
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import FormGroup from '@/components/FormGroup.vue';
import store from '@/store';
import router from '@/router';
import { AxiosResponse } from 'axios';

interface Data {
  email: string;
  password: string;
}

@Options({
  data() {
    return {
      data: {
        email: '',
        password: '',
      },
      errors: {},
    };
  },
  components: {
    Button,
    TextField,
    FormGroup,
  },
  methods: {
    login(event: Event) {
      event.preventDefault();

      this.errors = {};

      const data: Data = {
        email: this.data.email,
        password: this.data.password,
      };
      store.dispatch('LOGIN_REQUEST', data)
        .then((response: AxiosResponse) => {
          store.dispatch('GET_OPERATIONS', response.data.id);
          router.push('/');
        })
        .catch((response) => {
          const errors = response?.data.errors || {};
          this.errors = {
            email: Array.isArray(errors.email) ? errors.email[0] : '',
            password: Array.isArray(errors.password) ? errors.password[0] : '',
          };
          if (response?.data.message === 'Unauthorized') {
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

<style lang="scss" scoped>
</style>
