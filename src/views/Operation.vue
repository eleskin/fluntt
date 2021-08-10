<template>
  <div class="page">
    <FormGroup @submit="(event) => onSubmit(event, operationType)">
      <h2 class="title title-2">
        {{ procedureType }} {{ operationType }}
      </h2>
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
<!--      <Select-->
<!--        :options="['Dollar', 'Euro', 'Pound Sterling', 'Ruble', 'Pound Sterling', 'Ruble']"-->
<!--        :default-value="$store.getters.getCurrency"-->
<!--        :callback="changeCurrency"-->
<!--        :placeholder="'Select category'"-->
<!--      />-->
      <div class="operation__date">
        <Select
          :options="getDays"
          :default-value="date.day"
          :callback="addDay"
          placeholder="Day"
        />
        <Select
          :options="months"
          :default-value="months[date.month - 1]"
          :callback="addMonth"
          placeholder="Month"
        />
        <Select
          :options="getYears"
          :default-value="date.year"
          :callback="addYear"
          placeholder="Year"
        />
      </div>
      <Button style-type="primary">Save</Button>
    </FormGroup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TextField, Button, Select } from '@/assets/fluntt-ui/index';
import store from '@/store';
import FormGroup from '@/components/FormGroup.vue';
import router from '@/router';

enum OperationType {
  Income = 'income',
  Expense = 'expense'
}

enum ProcedureType {
  Add = 'Add',
  Edit = 'Edit',
}

interface AddOperationData {
  value: number;
  category: string;
  userId: number;
  type: OperationType;
  created_at: string;
  updated_at: string;
}

interface EditOperationData {
  value: number;
  category: string;
  id: number;
  updated_at: string;
}

enum Type {
  Income = 'income',
  Expense = 'expense'
}

interface OperationInterface {
  id: number;
  category: string;
  type: Type;
  userId: number;
  value: number;
  created_at: string;
  date?: string;
}

interface State {
  operations: Array<OperationInterface>;
}

@Options({
  data() {
    return {
      value: null,
      category: '',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      date: {
        day: '',
        month: '',
        year: '',
      },
    };
  },
  components: {
    TextField,
    Button,
    FormGroup,
    Select,
  },
  props: {},
  methods: {
    addOperation(type: OperationType) {
      window.console.log(this.getAt());
      const data: AddOperationData = {
        value: this.value,
        category: this.category,
        userId: store.getters.getId,
        type,
        // eslint-disable-next-line @typescript-eslint/camelcase
        created_at: this.getAt(),
        // eslint-disable-next-line @typescript-eslint/camelcase
        updated_at: this.getAt(),
      };
      if (data.value && data.category) {
        store.dispatch('ADD_OPERATION', data)
          .then(() => {
            router.push('/');
          });
      }
    },
    editOperation() {
      const { id }: { id: number } = this.$router.currentRoute.value.params;
      const data: EditOperationData = {
        value: this.value,
        category: this.category,
        // eslint-disable-next-line @typescript-eslint/camelcase
        updated_at: this.updated_at,
        id,
      };
      if (data.value && data.category) {
        store.dispatch('EDIT_OPERATION', data)
          .then(() => {
            router.push('/');
          });
      }
    },
    onSubmit(event: Event, type: OperationType) {
      event.preventDefault();
      if (this.procedureType === ProcedureType.Add) {
        this.addOperation(type);
      }
      if (this.procedureType === ProcedureType.Edit) {
        this.editOperation();
      }
    },
    addDay(data: string) {
      this.date.day = data;
    },
    addMonth(data: string) {
      this.date.month = this.months.indexOf(data) + 1;
    },
    addYear(data: string) {
      this.date.year = data;
    },
    getNewDate() {
      return new Date();
    },
    getAt() {
      return `${this.date.year}-${this.date.month < 10 ? `0${this.date.month}` : this.date.month}-${this.date.day < 10 ? `0${this.date.day}` : this.date.day} ${this.getNewDate().getHours() < 10 ? `0${this.getNewDate().getHours()}` : this.getNewDate().getHours()}:${this.getNewDate().getMinutes() < 10 ? `0${this.getNewDate().getMinutes()}` : this.getNewDate().getMinutes()}:${this.getNewDate().getSeconds() < 10 ? `0${this.getNewDate().getSeconds()}` : this.getNewDate().getSeconds()}`;
    },
  },
  computed: {
    operationType() {
      const { id }: { id: number } = this.$router.currentRoute.value.params;
      const getData = (operations: Array<State>) => {
        operations.forEach((operation: State) => {
          operation.operations.forEach((item) => {
            if (item.id === Number(id)) {
              this.value = item.value;
              this.category = item.category;
            }
          });
        });
      };
      getData(store.getters.getOperations);

      if (this.$router.currentRoute.value.path === '/operation/income' || this.$router.currentRoute.value.path === '/operation/income/') {
        return OperationType.Income;
      }
      if (this.$router.currentRoute.value.path === '/operation/expense' || this.$router.currentRoute.value.path === '/operation/expense/') {
        return OperationType.Expense;
      }
      if (Number(id)) {
        return 'operation';
      }
      return router.push('/');
    },
    procedureType() {
      const { id }: { id: number } = this.$router.currentRoute.value.params;
      return Number(id) ? ProcedureType.Edit : ProcedureType.Add;
    },
    getDays() {
      const days: number[] = [];
      for (let i = 1; i <= 31; i += 1) {
        days.push(i);
      }
      return days;
    },
    getYears() {
      const years: number[] = [];
      const date: Date = new Date();
      const currentYear: number = date.getFullYear();
      for (let i = 2020; i <= currentYear; i += 1) {
        years.push(i);
      }
      return years;
    },
  },
  mounted() {
    this.date.day = this.getNewDate().getDate();
    this.date.month = this.getNewDate().getMonth() + 1;
    this.date.year = this.getNewDate().getFullYear();
  },
})
export default class Operation extends Vue {
}
</script>

<style scoped>
.operation__date {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 12px;
}
</style>
