<template>
  <div class="profile">
    <span class="profile__name"><Skeleton v-if="!userName" :height="16"/> {{ userName }}</span>
    <div class="profile__indicators">
      <div class="profile__indicator">
        <i>My balance</i>
        <span>{{ balance }} {{ ticker }}</span>
      </div>
<!--      <div class="profile__indicator">-->
<!--        <i>My budget</i>-->
<!--        <span>310000 USD</span>-->
<!--      </div>-->
      <div class="profile__indicator">
        <i>My spending</i>
        <span>{{ spending }} {{ ticker }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Skeleton } from '@/assets/fluntt-ui';

@Options({
  components: {
    Skeleton,
  },
  props: {
    userName: String,
    balance: Number,
    ticker: String,
    spending: Number,
  },
})
export default class Profile extends Vue {}
</script>

<style lang="scss" scoped>
.profile {
  background: #4376F9;
  border-radius: 4px;
  padding: 12px;
  color: #ffffff;
  .profile__name {
    font-weight: 600;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 100%;
    display: block;
  }
  .profile__indicators {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
    margin-top: 12px;
    .profile__indicator {
      display: flex;
      flex-direction: column;
      i {
        font-style: normal;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
      }
      span {
        font-size: 16px;
        line-height: 100%;
        color: #FFFFFF;
        white-space: nowrap;
      }
    }
  }
}
</style>
