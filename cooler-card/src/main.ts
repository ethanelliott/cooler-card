import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from 'axios';

Vue.config.productionTip = false;

const PROD = process.env.NODE_ENV !== 'development';
axios.defaults.baseURL = (PROD ? 'https://cooler-card-api.herokuapp.com/' : 'http://localhost:9898/');

Vue.prototype.$socketURL = (PROD ? 'https://cooler-card-api.herokuapp.com/' : 'http://localhost:9898/');


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
