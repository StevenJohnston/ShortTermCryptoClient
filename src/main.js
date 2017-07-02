// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './app';
import { sync } from 'vuex-router-sync';
import router from './router';
import store from './store/store';
Vue.config.productionTip = false;
Vue.config.debug = true;

sync(store, router);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
