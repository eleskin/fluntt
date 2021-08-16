<template>
  <div class="page page-with-buttons">
    <div class="grid">
      <Profile
        :user-name="this.$store.getters.getUserName"
        :balance="this.$store.getters.getBalance"
        :ticker="this.$store.getters.getTicker"
        :spending="this.$store.getters.getSpending"
      />
      <BalanceChanges
        :balance="this.$store.getters.getBalance"
        :ticker="this.$store.getters.getTicker"
        v-if="this.$store.getters.getOperations.length > 0"
      />
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
import BalanceChanges from '@/components/Home/BalanceChanges.vue';
import LatestActivity from '@/components/Home/LatestActivity.vue';

@Options({
  components: {
    Button,
    TextField,
    Profile,
    ControlButtons,
    BalanceChanges,
    LatestActivity,
  },
})
export default class Home extends Vue {
}
</script>
