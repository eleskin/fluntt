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
      <Button style-type="primary">Save</Button>
    </FormGroup>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { TextField, Button } from '@/assets/fluntt-ui/index';
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
}

interface EditOperationData {
  value: number;
  category: string;
  id: number;
  updated_at: string;
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
    addOperation(type: OperationType) {
      const data: AddOperationData = {
        value: this.value,
        category: this.category,
        userId: store.getters.getId,
        type,
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
  },
  computed: {
    operationType() {
      const { id }: { id: number } = this.$router.currentRoute.value.params;
      store.getters.getOperations.forEach(
        (operation: {
          date: string; operations: Array<{ id: number; value: string; category: string }>;
        }) => {
          operation.operations.forEach((item: { id: number; value: string; category: string }) => {
            if (item.id === Number(id)) {
              this.value = item.value;
              this.category = item.category;
            }
          });
        },
      );

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
  },
})
export default class Operation extends Vue {
}
</script>

<style scoped>

</style>
