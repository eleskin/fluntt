<template>
  <div class="center">
    <div class="page">
      <FormGroup @submit="register">
        <h2 class="title title-2">Sign up</h2>
        <TextField
          placeholder="Your name"
          type="text"
          :error="errors.name"
          :value="data.name"
          @input="data.name = $event.target.value; errors.name = '';"
        />
        <TextField
          placeholder="Your email"
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
        <Button style-type="primary">Create account</Button>
        <Button style-type="link" to="/login">Sign in</Button>
      </FormGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import store from '@/store/index';
import router from '@/router';
import FormGroup from '@/components/FormGroup.vue';

interface Data {
  name: string;
  email: string;
  password: string;
}

@Options({
  data: () => ({
    data: {
      name: '',
      email: '',
      password: '',
    },
    errors: {},
  }),
  components: {
    Button,
    TextField,
    FormGroup,
  },
  methods: {
    register(event: Event) {
      event.preventDefault();

      this.errors = {};

      const data: Data = {
        name: this.data.name,
        email: this.data.email,
        password: this.data.password,
      };

      store.dispatch('REGISTER_REQUEST', data)
        .then(() => {
          router.push('/');
        })
        .catch((response) => {
          const errors = response?.data.errors || {};
          this.errors = {
            name: Array.isArray(errors.name) ? errors.name[0] : '',
            email: Array.isArray(errors.email) ? errors.email[0] : '',
            password: Array.isArray(errors.password) ? errors.password[0] : '',
          };
        });
    },
  },
})
export default class Register extends Vue {
}
</script>

<style lang="scss" scoped>

</style>
