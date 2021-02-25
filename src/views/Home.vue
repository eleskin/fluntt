<template>
  <div class="page">
    <Profile :user-name="this.$store.getters.getUserName" />
  </div>
  <ControlButtons/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import Profile from '@/components/Home/Profile.vue';
import ControlButtons from '@/components/ControlButtons.vue';

@Options({
  components: {
    Button,
    TextField,
    Profile,
    ControlButtons,
  },
})
export default class Home extends Vue {}
</script>
