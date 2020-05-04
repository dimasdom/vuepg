import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import store from './vuex/main'
import VueRouter from 'vue-router'
import ServersPage from "@/components/ServersPage";
import ServerPage from "@/components/ServerPage";
import 'vue-datetime/dist/vue-datetime.css'
import { Datetime } from 'vue-datetime'
import VuejsPaginate from 'vuejs-paginate'
import ToggleButton from 'vue-js-toggle-button'
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Datetime);
Vue.component('paginate', VuejsPaginate);
Vue.use(ToggleButton)
const routes = [
  {path:'/',component:ServersPage},
  {path:'/databases',component:ServerPage },
];
const router = new VueRouter({
  routes // short for `routes: routes`
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
