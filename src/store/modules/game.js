

const state = {
    gamestate: {}
};

const getters = {
    getGamestate: (state) => state.gamestate
};

const actions = {
    setGamestate: (context, payload) => {
        context.commit('setGamestate', payload);
    }
};

const mutations = {
    setGamestate(state, payload) {
        state.gamestate = payload;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};