const state = {
  tracks: [],
  currentTrack: null,
};

const mutations = {
  ADD_TRACK(state, payload) {
    state.tracks.push(payload.track);
  },

  UNSHIFT_TRACK(state, payload) {
    state.tracks.unshift(payload.track);
  },

  SET_TRACKS(state, payload) {
    state.tracks = payload.tracks;
  },

  SET_CURRENT_TRACK(state, payload) {
    state.currentTrack = payload.track;
  },

  SET_CURRENT_TRACK_INDEX(state, payload) {
    state.currentTrack = state.tracks[payload.index];
  },

  CLEAR_TRACKS(state) {
    state.tracks = [];
    state.currentTrack = null;
  },
};

const getters = {
  currentTrack: (state) => state.currentTrack,
  tracks: (state) => state.tracks,
  currentTrackIndex: (state) => {
    if (!state.currentTrack) return -1;

    return state.tracks.findIndex(
      (track) => track.encodeId === state.currentTrack.encodeId
    );
  },
};

const actions = {
  addTrack({ commit }, track) {
    commit("ADD_TRACK", { track });
  },

  unshiftTrack({ commit }, track) {
    commit("UNSHIFT_TRACK", { track });
  },

  setCurrentTrack({ commit }, track) {
    commit("SET_CURRENT_TRACK", { track });
  },

  setCurrentTrackIndex({ commit }, index) {
    commit("SET_CURRENT_TRACK_INDEX", { index });
  },

  setTracks({ commit }, tracks) {
    commit("SET_TRACKS", { tracks });
  },

  clearTracks({ commit }) {
    commit("CLEAR_TRACKS");
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
