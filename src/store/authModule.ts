import axios, { AxiosResponse } from 'axios';

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
  actions: {
    register: (data: any) => {
      const { name, email, password } = data;

      axios
        .post('http://localhost/fluntt-api/api/register/')
        .then((response: AxiosResponse) => console.log(response));
    },
  },
};

export default authModule;
