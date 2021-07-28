<template>
  <div class="page">
    <Button style-type="link" @click="logout">Logout</Button>
    <div>
      <span>Currency: </span>
      <Select
        :options="['Dollar', 'Euro', 'Pound Sterling', 'Ruble']"
        :default-value="$store.getters.getCurrency"
        :callback="changeCurrency"
      ></Select>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, Select } from '@/assets/fluntt-ui/';
import store from '@/store';
import router from '@/router';

@Options({
  components: {
    Button,
    Select,
  },
  data() {
    return {
      currency: '',
    };
  },
  methods: {
    logout() {
      store.dispatch('LOGOUT_REQUEST')
        .then(() => {
          store.commit('CLEAR_STATE');
          router.push('/login');
        });
    },
    changeCurrency(currency: string) {
      store.dispatch('UPDATE_CURRENCY', {
        currency,
        userId: store.getters.getId,
      })
        .then((response) => {
          this.currency = response.data.currency;
        });
    },
  },
})
export default class Settings extends Vue {
}
</script>

<style scoped>

</style>
