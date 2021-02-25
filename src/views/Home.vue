<template>
  <div class="page page-with-buttons">
    <div class="grid">
      <Profile :user-name="this.$store.getters.getUserName"/>
      <LatestActivity/>
    </div>
  </div>
  <ControlButtons/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Button, TextField } from '@/assets/fluntt-ui';
import Profile from '@/components/Home/Profile.vue';
import ControlButtons from '@/components/ControlButtons.vue';
import LatestActivity from '@/components/Home/LatestActivity.vue';

@Options({
  components: {
    Button,
    TextField,
    Profile,
    ControlButtons,
    LatestActivity,
  },
})
export default class Home extends Vue {
}
</script>
