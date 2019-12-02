import Vue from 'vue';
import App from './App.vue';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.min.css';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App),
}).$mount('#app');
