import { createStore } from 'vuex';

interface AuthModule {
  isLogin: boolean;
}

const authModule = {
  state: {
    isLogin: false,
  },
  getters: {
    getIsLogin: (state: AuthModule) => state.isLogin,
  },
};

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    authModule,
  },
});
