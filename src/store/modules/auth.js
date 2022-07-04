import axios from 'axios';

export default {
  state: {
    key: null,
    user: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    StateUser: (state) => state.user,
    StateKey: (state) => state.key,
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
  },
  mutations: {
    setKey(state, key) {
      state.key = key;
    },
    setUser(state, data) {
      state.user = data;
    },
    logout(state) {
      state.user = null;
    },
  },
};
