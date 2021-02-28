import axios, { AxiosResponse } from 'axios';
import { Commit, Dispatch } from 'vuex';

interface State {
  token: string;
  user: {
    id: number;
    name: string;
  };
}

interface Response {
  data: {
    token_type: string;
    access_token: string;
    id: number;
    name: string;
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
    user: {
      id: null,
      name: '',
    },
  },
  getters: {
    isAuthenticated: (state: State) => !!state.token,
    getUserName: (state: State) => state.user.name,
    getId: (state: State) => state.user.id,
  },
  mutations: {
    AUTH_LOGOUT: (state: State) => {
      state.token = '';
    },
    AUTH_SUCCESS: (state: State, response: Response) => {
      state.token = `${response.data.token_type} ${response.data.access_token}`;
      state.user.id = response.data.id;
      state.user.name = response.data.name;
    },
  },
  actions: {
    AUTH_LOGOUT: ({ commit }: { commit: Commit }) => new Promise((resolve) => {
      commit('AUTH_LOGOUT');
      localStorage.removeItem('token');
      resolve();
    }),
    USER_REQUEST: (
      {
        commit,
        dispatch,
      }: { commit: Commit; dispatch: Dispatch },
    ) => new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/api/auth/user', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      })
        .then((response: AxiosResponse) => {
          commit('AUTH_SUCCESS', response);
          resolve(response);
        })
        .catch(() => {
          dispatch('AUTH_LOGOUT');
          reject();
        });
    }),
    LOGIN_REQUEST: (
      { commit }: { commit: Commit },
      data: DataLogin,
    ) => new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8000/api/auth/login', data, {
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
        .post('http://localhost:8000/api/auth/register', data, {
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
        .get('http://localhost:8000/api/auth/logout', {
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
