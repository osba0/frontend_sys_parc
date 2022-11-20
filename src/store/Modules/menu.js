import axios from 'axios';

const state = {
    loadingState: false,
    message: {},
};

const getters = {
    loadingMenu: state => state.loadingState,
    retrieveMessageMenu: state => state.message,
};

const actions = {
    async storeNewMenu({ commit }, input) {
        const response = await axios
            .post('/menu/save', {
                nom_menu: input.nom_menu,
                route_menu:input.route_menu,
                level_menu: input.level_menu,
                etat_menu: input.etat_menu,
                icone_menu: input.icone_menu
            }).catch(error => {
                console.log(error);
            });
        if (response.status === 200) {
            commit('message', response.data);
            return true;
        }

    },
    async deleteMenu({ commit }, routeId) {
        const response = await axios.delete('/menu/delete/' + routeId);

        if (response.status === 200) {
            commit('message', response.data);
            return true;
        }
    },
    async updateMenu({ commit }, perm) {
        const response = await axios
            .put('/menu/update/' + perm.id, {
                nom_menu: perm.nom_menu,
                route_menu:perm.route_menu,
                level_menu: perm.level_menu,
                etat_menu: perm.etat_menu,
                icone_menu: perm.icone_menu
            })
            .catch(error => {
                console.log(error);
            });
        if (response.status === 200) {
            commit('message', response.data);
            return true;
        }
    }
};

const mutations = {
    loadingStatus: (state, payload) => (state.loadingState = payload),
    message: (state, payload) => (state.message = payload),
};

export default {
    state,
    getters,
    actions,
    mutations,
};
