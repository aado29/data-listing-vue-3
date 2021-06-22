import { createStore } from 'vuex';

export default createStore({
  state: {
    query: {},
    isFetching: false,
    isError: false,
    error: null,
    characters: [],
    pagination: null,
  },

  mutations: {
    setCharacters(state, payload) {
      state.query = payload;
      state.isFetching = true;
      state.isError = false;
      state.error = null;
    },

    setCharactersSuccess(state, payload) {
      state.isFetching = false;
      state.characters = payload.results;
      state.pagination = payload.info;
    },

    setCharactersError(state, payload) {
      state.isFetching = false;
      state.isError = true;
      state.error = payload;
    },
  },

  actions: {
    getCharacters({ commit }, query) {
      commit('setCharacters', query);

      let queryString = Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join('&');

      queryString = queryString.length ? `?${queryString}` : '';

      const url = `${process.env.VUE_APP_BASE_URL_API}/character/${queryString}`;

      fetch(url)
        .then((res) => {
          if (!res.ok) {
            return { results: [], info: null };
          }

          return res.json();
        })
        .then((data) => commit('setCharactersSuccess', data))
        .catch((err) => commit('setCharactersError', err));
    },
  },

  modules: {
  },
});
