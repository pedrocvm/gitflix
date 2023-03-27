import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'primeicons/primeicons.css';

Vue.config.productionTip = false;

store.dispatch('auth/initAuth').then(() => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
});
