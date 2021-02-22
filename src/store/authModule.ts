import axios, { AxiosResponse } from 'axios';
import { Commit, Dispatch } from 'vuex';

interface State {
  token: string;
}

interface Response {
  data: {
    token_type: 'string';
    access_token: 'string';
  };
}

interface DataLogin {
  email: string;
  password: string;
}

interface DataRegister {
  name: string;
  email: string;
  password: string;
}

const authModule = {
  state: {
    token: localStorage.getItem('token') || '',
  },
  getters: {
    isAuthenticated: (state: State) => !!state.token,
  },
  mutations: {
    AUTH_LOGOUT: (state: State) => {
      state.token = '';
    },
    AUTH_SUCCESS: (state: State, response: Response) => {
      state.token = `${response.data.token_type} ${response.data.access_token}`;
    },
  },
  actions: {
    AUTH_LOGOUT: ({ commit }: { commit: Commit }) => new Promise((resolve) => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('token');
      resolve();
    }),
    USER_REQUEST: ({ dispatch }: { dispatch: Dispatch }) => {
      axios.get('http://localhost:8000/api/auth/user/', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .catch(() => {
          dispatch('AUTH_LOGOUT');
        });
    },
    LOGIN_REQUEST: (
      { commit }: { commit: Commit },
      data: DataLogin,
    ) => new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8000/api/auth/login/', data, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response: AxiosResponse) => {
          localStorage.setItem('token', `${response.data.token_type} ${response.data.access_token}`);
          commit('AUTH_SUCCESS', response);
          // store.response(USER_REQUEST);
          resolve(response);
        })
        .catch((error) => {
          localStorage.removeItem('token');
          reject(error.response);
        });
    }),
    REGISTER_REQUEST: (
      { commit }: { commit: Commit },
      data: DataRegister,
    ) => new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8000/api/auth/register/', data, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response: AxiosResponse) => {
          localStorage.setItem('token', `${response.data.token_type} ${response.data.access_token}`);
          commit('AUTH_SUCCESS', response);
          // store.response(USER_REQUEST);
          resolve(response);
        })
        .catch((error) => {
          localStorage.removeItem('token');
          reject(error.response);
        });
    }),
    LOGOUT_REQUEST: (
      { commit }: { commit: Commit },
    ) => new Promise((resolve) => {
      axios
        .get('http://localhost:8000/api/auth/logout/', {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response: AxiosResponse) => {
          localStorage.removeItem('token');
          commit('AUTH_LOGOUT');
          resolve(response);
        });
    }),
  },
};

export default authModule;
