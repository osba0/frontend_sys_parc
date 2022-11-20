import axios from 'axios';

const state = {
    permissions: {data:{}},
    permission: {},
    newPerm: {},
    message: {},
    edit: {},
};

const getters = {
    permissions: state => state.permissions,
    permission: state => state.permission,
    newPermPage: state => state.newPerm,
    retrieveMessage2: state => state.message,
    editPerm: state => state.edit,
};

const actions = {
    getPermissions({ commit }, page) {
        if (typeof page == undefined) {
            page = 1;
        }

        commit('loadingStatus', true);
        axios.get('/configuration/permissions?page=' + page)
            .then(response => {
                if (response.status == 200) {
                    commit('permissions', response.data);
                    commit('loadingStatus', false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },

    viewPermission({ commit }, id) {
        commit('loadingStatus', true);
        axios
            .get('/configuration/permissions/' + id)
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data);
                    commit('permission', response.data);
                    commit('loadingStatus', false);
                }
            })
            .catch(error => {
                console.log(error);
            });
    },

    createPermission({ commit }) {
        commit('loadingStatus', true);
        axios
            .get('/configuration/permissions/create')
            .then(response => {
                commit('mutateNewPermission', response.data);
                commit('loadingStatus', false);
            })
            .catch(error => {
                console.log(error);
            });
    },

    async storeNewPermission({ commit }, input) {
        const response = await axios
            .post('/configuration/permissions', {
                newPermission: input,
            }).catch(error => {
                console.log(error);
            });
        if (response.status === 200) {
            commit('message', response.data);
            return true;
        }
    },

    editPermission({ commit }, id) {
        commit('loadingStatus', true);
        axios.get('/configuration/permissions/' + id + '/edit').then(response => {
            if (response.status == 200) {
                commit('edit', response.data);
                commit('loadingStatus', false);
            }
        });
    },

    updatePermission({ commit }, data) {
        axios
            .put('/configuration/permissions/' + data.id, {
                data: data.update,
            })
            .then(response => {
                if (response.status == 200) {
                    console.log(response.data);
                    commit('message', response.data);
                }
            });
    },

    deletePermission({ commit }, routeId) {
        axios.delete('/configuration/permissions/' + routeId).then(response => {
            if (response.status == 200) {
                commit('message', response.data);
            }
        });
    },
};

const mutations = {
    permissions: (state, payload) => (state.permissions = payload),
    permission: (state, payload) => (state.permission = payload),
    mutateNewPermission: (state, payload) => (state.newPerm = payload),
    message: (state, payload) => (state.message = payload),
    edit: (state, payload) => (state.edit = payload),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
