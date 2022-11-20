const state = {
    user: null
};

const getters = {
    user: (state) => {
        return state.user
    }
};

const actions = {
    user(context, user) {
        context.commit('user', user)
    }
};

const mutations = {
    user(state, user){
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};
