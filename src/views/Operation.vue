<template>
  <form class="page" @submit="(event) => addOperation(event, operationType)">
    <h2 class="title title-2">Add {{ operationType }}</h2>
    <TextField
      type="number"
      placeholder="Enter value"
      :value="value"
      @input="value = $event.target.value;"
    />
    <TextField
      type="text"
      placeholder="Enter category"
      :value="category"
      @input="category = $event.target.value;"
    />
    <Button style-type="primary">Add {{ operationType }}</Button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TextField, Button } from '@/assets/fluntt-ui/index';

enum Type {
  Income = 'income',
  Expense = 'expense'
}

interface Data {
  value: number;
  category: string;
}

@Options({
  data: () => ({
    value: null,
    category: '',
  }),
  components: {
    TextField,
    Button,
  },
  props: {},
  methods: {
    addOperation(event: Event, type: Type) {
      event.preventDefault();
      const data: Data = {
        value: this.value,
        category: this.category,
      };
      if (data.value && data.category) {
        console.log(data, type);
      }
    },
  },
  computed: {
    operationType() {
      if (this.$router.currentRoute.value.path === '/operation/income' || this.$router.currentRoute.value.path === '/operation/income/') {
        return Type.Income;
      }
      if (this.$router.currentRoute.value.path === '/operation/expense' || this.$router.currentRoute.value.path === '/operation/expense/') {
        return Type.Expense;
      }
      return '';
    },
  },
})
export default class Operation extends Vue {
}
</script>

<style scoped>

</style>
