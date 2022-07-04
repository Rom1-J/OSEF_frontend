import axios from 'axios';

export default {
  state: {
    key: null,
    user: null,
    transactions: null,
    files: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
    StateTransactions: (state) => state.transactions,
    StateFiles: (state) => state.files,
    StateKey: (state) => state.key,
    GetTransaction: (state) => (token) => {
      const transaction = state.transactions.filter((el) => el.token === token)[0];
      const externalUser = Object.keys(transaction.user1)[0] === state.user.username
        ? transaction.user2
        : transaction.user1;

      return {
        token: transaction.token,
        external: {
          username: Object.keys(externalUser)[0],
          pubkey: Object.values(externalUser)[0],
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
        (await axios.get(
          '/api/users/me/',
          {
            headers: {
              Authorization: `token ${getters.StateKey}`,
            },
          },
        )).data,
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
    async LoadFiles({ commit, getters }) {
      const req = await axios.get(
        '/api/files/',
        {
          headers: {
            Authorization: `token ${getters.StateKey}`,
          },
        },
      );
      // noinspection JSUnresolvedVariable
      await commit(
        'setFiles',
        req.data.sort((a, b) => (new Date(a.creation_date)) - (new Date(b.creation_date))),
      );
    },
  },
  mutations: {
    setKey(state, key) {
      state.key = key;
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
