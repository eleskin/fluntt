<template>
  <div class="page">
    <FormGroup @submit="(event) => addOperation(event, operationType)">
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
    </FormGroup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TextField, Button } from '@/assets/fluntt-ui/index';
import axios from 'axios';
import store from '@/store';
import FormGroup from '@/components/FormGroup.vue';

enum Type {
  Income = 'income',
  Expense = 'expense'
}

interface Data {
  value: number;
  category: string;
  userId: number;
}

@Options({
  data: () => ({
    value: null,
    category: '',
  }),
  components: {
    TextField,
    Button,
    FormGroup,
  },
  props: {},
  methods: {
    addOperation(event: Event, type: Type) {
      event.preventDefault();
      const data: Data = {
        value: this.value,
        category: this.category,
        userId: store.getters.getId,
      };
      if (data.value && data.category) {
        axios
          .post(`http://localhost:8000/api/operations/${type}/`, data, {
            headers: {
              Authorization: localStorage.getItem('token'),
            },
          })
          .then((response) => console.log(response));
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
