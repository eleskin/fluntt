interface AuthModule {
  isLogin: boolean;
  id: number;
}

const authModule = {
  state: {
    isLogin: false,
    id: null,
  },
  getters: {
    getIsLogin: (state: AuthModule) => state.isLogin,
  },
  mutations: {
    LOG_IN: (state: AuthModule, id: number) => {
      state.isLogin = true;
      state.id = id;
    },
  },
  actions: {
  },
};

export default authModule;
