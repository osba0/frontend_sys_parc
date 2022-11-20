import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'
import { VuejsDatatableFactory } from 'vuejs-datatable'
import Notifications from 'vue-notification'
import VueResource from 'vue-resource';


Vue.config.productionTip = false
Vue.use(Notifications)
Vue.use(VuejsDatatableFactory);
Vue.use(VueResource);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
