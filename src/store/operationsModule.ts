import { Commit } from 'vuex';
import axios from 'axios';

interface State {
  incomes: Array<object>;
  expenses: Array<object>;
}

enum Type {
  Income = 'income',
  Expense = 'expense'
}

interface Data {
  value: number;
  category: string;
  userId: number;
  type: Type;
}

interface Operation {
  id: number;
  category: string;
  type: Type;
  userId: number;
  value: number;
}

interface Response {
  data: {
    operation: Operation;
  };
}

const operationsModule = {
  state: {
    incomes: [],
    expenses: [],
  },
  getters: {
    getIncomes: (state: State) => state.incomes,
    getExpenses: (state: State) => state.expenses,
  },
  mutations: {
    ADD_OPERATION: (state: State, response: Response) => {
      if (response.data.operation.type === Type.Income) {
        state.incomes.push(response.data.operation);
      }
      if (response.data.operation.type === Type.Expense) {
        state.expenses.push(response.data.operation);
      }
    },
    SET_OPERATIONS: (
      state: State, {
        incomes,
        expenses,
      }: { incomes: Array<Operation>; expenses: Array<Operation> },
    ) => {
      incomes.forEach((income) => state.incomes.push(income));
      expenses.forEach((expense) => state.expenses.push(expense));
    },
  },
  actions: {
    ADD_OPERATION: (
      { commit }: { commit: Commit },
      data: Data,
    ) => new Promise((resolve) => {
      axios
        .post('http://localhost:8000/api/operations/add/', data, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          commit('ADD_OPERATION', response);
          resolve(response);
        });
    }),
    GET_OPERATIONS: (
      { commit }: { commit: Commit },
      userId: number,
    ) => new Promise(() => {
      axios
        .get('http://localhost:8000/api/operations/', {
          headers: {
            Authorization: localStorage.getItem('token'),
            'user-id': userId,
          },
        })
        .then((response) => {
          const incomes = response.data.operations.filter(
            (operation: Operation) => operation.type === Type.Income,
          );

          const expenses = response.data.operations.filter(
            (operation: Operation) => operation.type === Type.Expense,
          );
          commit('SET_OPERATIONS', { incomes, expenses });

          // commit('ADD_OPERATION', response);
          // resolve(response);
        });
    }),
  },
};

export default operationsModule;
