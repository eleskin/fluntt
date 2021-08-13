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
  id?: number;
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

interface Date {
  id: number;
  date: string;
  operations: Array<Operation>;
}

const operationsModule = {
  state: {
    operations: [],
  },
  getters: {
    getOperations: (state: State) => {
      const isIncludeDate = (dates: Array<Date>, operationDate: string) => {
        let index = -1;
        dates.forEach((date, i) => {
          if (date.date === operationDate) {
            index = i;
          }
        });
        return index;
      };
      const { operations } = state;
      const dates: Array<Date> = [];
      let id = 0;
      operations.forEach((operation) => {
        const operationDate = operation.created_at.split(' ')[0];
        const isIncluding = isIncludeDate(dates, operationDate);
        if (isIncluding !== -1) {
          dates[isIncluding].operations.push(operation);
        } else {
          dates.push({
            id,
            date: operationDate,
            operations: [operation],
          });
          id += 1;
        }
      });
      return dates;
    },
    getBalance: (state: State) => {
      let balance = 0;
      if (state.operations.length) {
        state.operations.forEach((operation) => {
          if (operation.type === Type.Income) balance += operation.value;
          if (operation.type === Type.Expense) balance -= operation.value;
        });
      }
      return balance;
    },
    getSpending: (state: State) => {
      let spending = 0;
      if (state.operations.length) {
        const { operations } = state;
        operations.forEach((operation) => {
          if (operation.type === Type.Expense) spending += operation.value;
        });
      }
      return spending;
    },
    getChartData: (state: State) => {
      const isIncludeDate = (dates: Array<Date>, operationDate: string) => {
        let index = -1;
        dates.forEach((date, i) => {
          if (date.date === operationDate) {
            index = i;
          }
        });
        return index;
      };
      const { operations } = state;
      const dates: Array<Date> = [];
      let id = 0;
      operations.forEach((operation) => {
        const operationDate = operation.created_at.split(' ')[0];
        const isIncluding = isIncludeDate(dates, operationDate);
        if (isIncluding !== -1) {
          dates[isIncluding].operations.push(operation);
        } else {
          dates.push({
            id,
            date: operationDate,
            operations: [operation],
          });
          id += 1;
        }
      });
      const formatDates = dates.reverse().map((date: Date) => {
        let result = 0;
        date.operations.map((operation: Operation) => {
          if (operation.type === 'income') {
            result += operation.value;
          } else if (operation.type === 'expense') {
            result -= operation.value;
          }
          return null;
        });
        return result;
      });
      const summaryDates = formatDates.map((item, i) => {
        if (i > 0) {
          formatDates[i] = item + formatDates[i - 1];
          return item + formatDates[i - 1];
        }
        return item;
      });
      window.console.log(summaryDates);
      return summaryDates;
    },
  },
  mutations: {
    ADD_OPERATION: (state: State, response: Response) => {
      state.operations = [response.data.operation, ...state.operations];
    },
    EDIT_OPERATION: (state: State, response: Response) => {
      state.operations.map((operation, i) => {
        if (operation.id === response.data.operation.id) {
          state.operations[i].value = response.data.operation.value;
          state.operations[i].category = response.data.operation.category;
          state.operations[i].type = response.data.operation.type;
        }
        return null;
      });
    },
    SET_OPERATIONS: (
      state: State, {
        operations,
      }: { operations: Array<Operation> },
    ) => {
      operations.sort((a, b) => {
        const dateA = a.created_at.split(' ')[0].split('-');
        const dateB = b.created_at.split(' ')[0].split('-');
        if (Number(dateA[0]) < Number(dateB[0])) {
          return 1;
        }
        if (Number(dateA[0]) > Number(dateB[0])) {
          return -1;
        }
        if (Number(dateA[0]) === Number(dateB[0])) {
          if (Number(dateA[1]) < Number(dateB[1])) {
            return 1;
          }
          if (Number(dateA[1]) > Number(dateB[1])) {
            return -1;
          }
          if (Number(dateA[1]) === Number(dateB[1])) {
            if (Number(dateA[2]) < Number(dateB[2])) {
              return 1;
            }
            if (Number(dateA[2]) > Number(dateB[2])) {
              return -1;
            }
            if (Number(dateA[2]) === Number(dateB[2])) {
              return 0;
            }
          }
        }
        return 0;
      });
      state.operations.push(...operations);
    },
    DELETE_OPERATION: (state: State, payload: { data: number }) => {
      state.operations = state.operations.filter(
        (operation) => operation.id !== Number(payload.data),
      );
    },
    CLEAR_STATE: (state: State) => {
      state.operations = [];
    },
  },
  actions: {
    ADD_OPERATION: (
      { commit }: { commit: Commit },
      data: Data,
    ) => new Promise((resolve) => {
      axios
        .post('http://localhost:8000/api/operations', data, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          commit('ADD_OPERATION', response);
          resolve(response);
        });
    }),
    EDIT_OPERATION: (
      { commit }: { commit: Commit },
      data: Data,
    ) => new Promise((resolve) => {
      axios
        .patch(`http://localhost:8000/api/operations/${data.id}`, data, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response) => {
          commit('EDIT_OPERATION', response);
          resolve(response);
        });
    }),
    GET_OPERATIONS: (
      { commit }: { commit: Commit },
      userId: number,
    ) => new Promise(() => {
      axios
        .get('http://localhost:8000/api/operations', {
          headers: {
            Authorization: localStorage.getItem('token'),
            'user-id': userId,
          },
        })
        .then((response: AxiosResponse) => {
          commit('SET_OPERATIONS', { operations: response.data.operations });
        });
    }),
    DELETE_OPERATION: (
      { commit }: { commit: Commit },
      id: number,
    ) => new Promise(() => {
      axios
        .delete(`http://localhost:8000/api/operations/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response: AxiosResponse) => {
          commit('DELETE_OPERATION', response);
        });
    }),
  },
};

export default operationsModule;
