import { Commit, Getter, GetterTree } from 'vuex';
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

interface Response {
  data: {
    operation: {
      id: number;
      category: string;
      type: Type;
      userId: number;
      value: number;
    };
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
    ) => new Promise((resolve) => {
      axios
        .get('http://localhost:8000/api/operations/', {
          headers: {
            Authorization: localStorage.getItem('token'),
            'user-id': userId,
          },
        })
        .then((response) => {
          console.log(response);
          // commit('ADD_OPERATION', response);
          // resolve(response);
        });
    }),
  },
};

export default operationsModule;
