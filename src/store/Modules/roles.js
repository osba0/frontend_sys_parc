import axios from 'axios';

const state = {
    roles: {
        data: {}
    },
    role: {},
    newRolePage: {},
    message: {},
    editItems: {},
    loadingState: false,
};

const getters = {
    roles: state => state.roles,
    role: state => state.role,
    createRolePage: state => state.newRolePage,
    retrieveMessage: state => state.message,
    editRoleInputs: state => state.editItems,
    loading: state => state.loadingState,
};

const actions = {
    getRoles({ commit }, page) {
        if (typeof page == undefined) {
            page = 1;
        }
        commit('loadingStatus', true);
        axios
            .get('/configuration/roles?page=' + page)
            .then(response => {
                if (response.status == 200) {
                    commit('roles', response.data);
                    commit('loadingStatus', false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },

    viewRole({ commit }, id) {
        commit('loadingStatus', true);
        axios
            .get('/configuration/roles' + id)
            .then(response => {
                if (response.status == 200) {
                    commit('role', response.data);
                    commit('loadingStatus', false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },

    createRole({ commit }) {
        commit('loadingStatus', true);
        axios
            .get('/configuration/roles/create')
            .then(response => {
                commit('createNewRolePage', response.data);
                commit('loadingStatus', false);
            })
            .catch(error => {
                console.log(error);
            });
    },

    async storeNewRole({ commit }, input) {
        const response = await axios
            .post('/configuration/roles', {
                newRole: input,
            }).catch(error => {
                console.log(error);
            });
        if (response.status === 200) {
            commit('message', response.data);
            return true;
        }

    },

    async editRole({ commit }, routeId) {
        commit('loadingStatus', true);
        const response = await axios
            .get('/configuration/roles/' + routeId + '/edit')
            .catch(error => {
                console.log(error);
            });
        if(response){
            commit('edit', response.data);
            commit('loadingStatus', false);
            return response.data;
        }
    },

    updateRole({ commit }, perm) {
        axios
            .put('/configuration/roles/' + perm.roleId, {
                data: perm,
            })
            .then(response => {
                commit('message', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },

    async deleteRole({ commit }, routeId) {
        const response = await axios.delete('/configuration/roles/' + routeId);

        if (response.status === 200) {
            commit('message', response.data);
            return true;
        }
    },
};

const mutations = {
    roles: (state, payload) => (state.roles = payload),
    role: (state, payload) => (state.role = payload),
    createNewRolePage: (state, payload) => (state.newRolePage = payload),
    message: (state, payload) => (state.message = payload),
    edit: (state, payload) => (state.editItems = payload),
    loadingStatus: (state, payload) => (state.loadingState = payload),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
