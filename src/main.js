import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

import App from './App.vue';
import router from './router';
import vuexStoreConfig from './vuexStore';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  theme: {
    primary: '#039BE5',
    secondary: '#0288D1',
    accent: '#0277BD',
    error: '#E53935',
    warning: '#FFA000',
    info: '#2196F3',
    success: '#4caf50',
  },
});

Vue.use(Vuex);

new Vue({
  store: new Vuex.Store(vuexStoreConfig),
  router,
  render: h => h(App),
}).$mount('#app');
