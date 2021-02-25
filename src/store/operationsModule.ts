interface State {
  incomes: Array<object>;
  expenses: Array<object>;
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
  },
  actions: {
  },
};

export default operationsModule;
