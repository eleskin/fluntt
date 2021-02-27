<template>
  <div class="latest-activity">
    <Widget title="Latest activity">
      <div class="latest-activity__container">
<!--        <h4 class="latest-activity__title">25 Feb</h4>-->
        <ul class="latest-activity__list">
          <li
            class="latest-activity__item operation"
            v-for="item in $store.getters.getOperations"
            :key="item.id"
          >
            <div
              :class="`operation__description ${
                item.type === 'income' ? 'operation__description-income' :
                item.type === 'expense' ? 'operation__description-expense' : ''
              }`"
            >
              <span class="operation__category">{{ item.category }}</span>
              <span class="operation__value">{{ item.value }} USD</span>
            </div>
          </li>
        </ul>
      </div>
    </Widget>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Widget from '@/components/Widget.vue';

@Options({
  components: {
    Widget,
  },
})
export default class LatestActivity extends Vue {}
</script>

<style lang="scss" scoped>
.latest-activity {
  .latest-activity__container {
    padding: 12px;
    .latest-activity__title {
      margin: 0 0 12px 0;
    }
    .latest-activity__list {
      padding: 0;
      margin: 0;
      list-style: none;
      display: grid;
      grid-template-columns: 1fr;
      grid-row-gap: 8px;
    }
  }
}
.operation {
  .operation__description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .operation__category {
      font-size: 12px;
      line-height: 100%;
      margin-bottom: 2px;
      color: rgba(33, 33, 33, 0.8);
    }
    .operation__value {
      font-weight: 600;
      font-size: 14px;
      line-height: 100%;
      margin-top: 2px;
      color: rgba(33, 33, 33, 0.8);
    }
  }
  .operation__description-income {
    .operation__value {
      color: #00C12F;
    }
  }
  .operation__description-expense {
    .operation__value {
      color: #E32602;
    }
  }
}
</style>
