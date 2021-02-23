<template>
  <div class="page">
    <Profile :user-name="this.$store.getters.getUserName" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import Profile from '@/components/Profile.vue';

@Options({
  components: {
    Button,
    TextField,
    Profile,
  },
})
export default class Home extends Vue {}
</script>
