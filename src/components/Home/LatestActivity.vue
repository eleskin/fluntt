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
            <div class="operation__control">
              <button class="operation__delete" @click="(event) => deleteOperation(event, item.id)">
                <font-awesome-icon icon="trash"/>
              </button>
            </div>
          </li>
          <img
            class="latest-activity__illustration"
            src="@/assets/illustrations/undraw_empty_xct9.svg"
            v-if="!$store.getters.getOperations.length"
            alt=""
          />
          <span
            v-if="!$store.getters.getOperations.length"
            class="latest-activity__empty-text"
          >
            There is nothing
          </span>
        </ul>
      </div>
    </Widget>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Widget from '@/components/Widget.vue';
import store from '@/store';

@Options({
  components: {
    Widget,
  },
  methods: {
    deleteOperation(event: Event, id: number) {
      store.dispatch('DELETE_OPERATION', id);
    },
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
      grid-row-gap: 12px;
      .latest-activity__illustration {
        height: 100%;
        width: 100%;
        margin: auto;
        max-height: 240px;
      }
      .latest-activity__empty-text {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
.operation {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  .operation__delete {
    font-weight: 900;
    font-size: 12px;
    color: #E32602;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
  }
}
</style>
