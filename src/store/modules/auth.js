import axios from 'axios';
import { generateKeys } from '@/utils/crypto';

export default {
  state: {
    key: null,
    user: null,
    keys: null,
    transactions: null,
    files: { all: [] },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
    StateTransactions: (state) => state.transactions,
    StateFiles: (state) => state.files,
    StateKey: (state) => state.key,
    StateKeys: (state) => state.keys,
    GetTransaction: (state) => (token) => {
      const transaction = state.transactions.filter((el) => el.token === token)[0];
      const externalUser = Object.keys(transaction.user1)[0] === state.user.username
        ? transaction.user2
        : transaction.user1;

      return {
        token: transaction.token,
        external: {
          username: Object.keys(externalUser)[0],
          publicKey: Object.values(externalUser)[0],
        },
      };
    },
  },
  actions: {
    async Register({ dispatch }, form) {
      await axios.post('register', form);

      const UserForm = new FormData();
      UserForm.append('username', form.username);
      UserForm.append('password', form.password);

      await dispatch('LogIn', UserForm);
    },

    async LogIn({ commit, getters }, form) {
      const req = await axios.post('/api/accounts/login/', form);
      await commit('setKey', req.data.key);

      await commit(
        'setUser',
        {
          ...(await axios.get(
            '/api/users/me/',
            {
              headers: {
                Authorization: `token ${getters.StateKey}`,
              },
            },
          )).data,
          password: form.password,
        },
      );
    },

    async LogOut({ commit }) {
      await axios.post('/api/accounts/logout/');
      commit('logout');
    },

    async LoadTransactions({ commit, getters }) {
      const req = await axios.get(
        '/api/transactions/',
        {
          headers: {
            Authorization: `token ${getters.StateKey}`,
          },
        },
      );
      // noinspection JSUnresolvedVariable
      await commit(
        'setTransactions',
        req.data.sort((a, b) => (new Date(a.modification_date)) - (new Date(b.modification_date))),
      );
    },

    async LoadFiles({ commit, getters }, kwargs = {
      token: 'all',
      force: false,
    }) {
      const { force, token } = kwargs;
      if (!force && getters.StateFiles && (token in getters.StateFiles)) return;

      const args = (!force && token !== 'all') ? `?transaction__token=${token}` : '';
      const req = await axios.get(
        `/api/files/${args}`,
        {
          headers: {
            Authorization: `token ${getters.StateKey}`,
          },
        },
      );

      const data = req.data.sort(
        (a, b) => (new Date(b.creation_date)) - (new Date(a.creation_date)),
      );

      const filtered = {};
      data.forEach((el) => {
        if (!(el.transaction in filtered)) filtered[el.transaction] = [];
        filtered[el.transaction].push(el);
      });

      // noinspection JSUnresolvedVariable
      await commit(
        'setFiles',
        {
          all: data,
          ...filtered,
        },
      );
    },

    async LoadKeys({ commit, getters }) {
      if (getters.StateKey === null) return;

      const userData = getters.StateUser;
      await commit('setKeys', await generateKeys(userData.password, userData.salt));

      delete userData.password;
      delete userData.salt;
      await commit('setUser', userData);
    },

    async UpdatePublicKey({ getters }) {
      await axios.put('/api/users/pubkey/', {
        pub_key: getters.StateKey.publicKey,
      });
    },

    async UpdateUser({ commit, getters }, form) {
      const data = {
        first_name: form.firstName,
        last_name: form.lastName,
      };

      await axios.patch('/api/accounts/user/', data);
      await commit('setUser', { ...getters.StateUser, ...data });
    },
  },
  mutations: {
    setKey(state, key) {
      state.key = key;
    },
    setKeys(state, keys) {
      state.keys = keys;
    },
    setUser(state, data) {
      state.user = data;
    },
    setTransactions(state, data) {
      state.transactions = data;
    },
    setFiles(state, data) {
      state.files = data;
    },
    logout(state) {
      state.user = null;
    },
  },
};
