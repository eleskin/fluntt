import { createStore } from 'vuex';
import authModule from '@/store/authModule';
import operationsModule from '@/store/operationsModule';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authModule,
    operationsModule,
  },
});
