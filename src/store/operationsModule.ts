import { Commit } from 'vuex';
import axios, { AxiosResponse } from 'axios';

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
  created_at: string;
  date?: string;
}

interface Response {
  data: {
    operation: Operation;
  };
}

interface State {
  operations: Array<Operation>;
}

const operationsModule = {
  state: {
    operations: [],
  },
  getters: {
    getOperations: (state: State) => {
      const { operations } = state;
      return operations;
    },
    getBalance: (state: State) => {
      let balance = 0;
      if (state.operations.length) {
        state.operations.forEach((operaion) => {
          if (operaion.type === Type.Income) balance += operaion.value;
          if (operaion.type === Type.Expense) balance -= operaion.value;
        });
      }
      return balance;
    },
  },
  mutations: {
    ADD_OPERATION: (state: State, response: Response) => {
      state.operations = [response.data.operation, ...state.operations];
    },
    SET_OPERATIONS: (
      state: State, {
        operations,
      }: { operations: Array<Operation> },
    ) => {
      operations.forEach((operation) => state.operations.push(operation));
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
        .then((response: AxiosResponse) => {
          commit('SET_OPERATIONS', { operations: response.data.operations });
        });
    }),
  },
};

export default operationsModule;
