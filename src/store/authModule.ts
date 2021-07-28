import axios, { AxiosResponse } from 'axios';
import { Commit, Dispatch } from 'vuex';

interface State {
  token: string;
  user: {
    id: number | null;
    name: string;
    currency: string;
  };
}

interface Response {
  data: {
    token_type: string;
    access_token: string;
    id: number;
    name: string;
    currency: string;
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

interface Tickers {
  [key: string]: string;
}

const tickers: Tickers = {
  Dollar: 'USD',
  Euro: 'EUR',
  'Pound Sterling': 'GBP',
  Ruble: 'RUB',
};

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
    getCurrency: (state: State) => state.user.currency,
    getTicker: (state: State) => tickers[state.user.currency],
  },
  mutations: {
    AUTH_LOGOUT: (state: State) => {
      state.token = '';
      state.user.id = null;
      state.user.name = '';
      state.user.currency = '';
    },
    AUTH_SUCCESS: (state: State, response: Response) => {
      state.token = `${response.data.token_type} ${response.data.access_token}`;
      state.user.id = response.data.id;
      state.user.name = response.data.name;
      state.user.currency = response.data.currency;
    },
    UPDATE_CURRENCY: (state: State, response: Response) => {
      state.user.currency = response.data.currency;
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
    UPDATE_CURRENCY: (
      { commit }: { commit: Commit },
      data: { currency: string; userId: number },
    ) => new Promise((resolve) => {
      axios
        .patch('http://localhost:8000/api/auth/change-currency', {
          currency: data.currency,
          userId: data.userId,
        }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((response: AxiosResponse) => {
          commit('UPDATE_CURRENCY', { data: response.data.user });
          resolve(response);
        });
    }),
  },
};

export default authModule;
