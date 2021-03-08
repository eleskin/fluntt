<template>
  <div class="page">
    <Button style-type="link" @click="logout">Logout</Button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button } from '@/assets/fluntt-ui/';
import store from '@/store';
import router from '@/router';

@Options({
  components: {
    Button,
  },
  methods: {
    logout() {
      store.dispatch('LOGOUT_REQUEST')
        .then(() => {
          store.commit('CLEAR_STATE');
          router.push('/login');
        });
    },
  },
})
export default class Settings extends Vue {
}
</script>

<style scoped>

</style>
