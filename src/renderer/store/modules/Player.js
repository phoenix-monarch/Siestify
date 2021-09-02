const state = {
  isPlaying: false,
};

const mutations = {
  PLAY(state) {
    state.isPlaying = true;
  },

  PAUSE(state) {
    state.isPlaying = false;
  },
};

const actions = {
  play({ commit }) {
    commit("PLAY");
  },
  pause({ commit }) {
    commit("PAUSE");
  },
};

const getters = {
  isPlaying: (state) => state.isPlaying,
};

export default {
  getters,
  state,
  mutations,
  actions,
};
