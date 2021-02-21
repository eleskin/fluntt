import axios from 'axios';

interface State {
  token: string;
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
    AUTH_SUCCESS: (state: State, response: any) => {
      state.token = `${response.data.token_type} ${response.data.access_token}`;
    },
  },
  actions: {
    AUTH_LOGOUT: (store: any) => new Promise((resolve) => {
      store.commit('AUTH_LOGOUT');
      localStorage.removeItem('token');
      resolve();
    }),
    USER_REQUEST: (store: any) => {
      axios.get('http://localhost:8000/api/auth/user/')
        .catch(() => {
          store.dispatch('AUTH_LOGOUT');
        });
    },
    LOGIN_REQUEST: (store: any, data: any) => new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8000/api/auth/login/', data)
        .then((response) => {
          localStorage.setItem('token', `${response.data.token_type} ${response.data.access_token}`);
          store.commit('AUTH_SUCCESS', response);
          // store.response(USER_REQUEST);
          resolve(response);
        })
        .catch((error) => {
          localStorage.removeItem('token');
          reject(error.response);
        });
    }),
    REGISTER_REQUEST: (store: any, data: any) => new Promise((resolve, reject) => {
      axios
        .post('http://localhost:8000/api/auth/register/', data)
        .then((response) => {
          localStorage.setItem('token', `${response.data.token_type} ${response.data.access_token}`);
          store.commit('AUTH_SUCCESS', response);
          // store.response(USER_REQUEST);
          resolve(response);
        })
        .catch((error) => {
          localStorage.removeItem('token');
          reject(error.response);
        });
    }),
  },
};

export default authModule;
