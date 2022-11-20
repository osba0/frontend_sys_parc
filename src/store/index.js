import Vue from 'vue'
import Vuex from 'vuex'
import User from './Modules/user';
import Role from './Modules/roles';
import Permission from './Modules/permissions';
import Menu from './Modules/menu';

Vue.use(Vuex);

const Store = new Vuex.Store({
  modules: {
    User,
    Role,
    Permission,
    Menu
  },
});

export default Store;

