import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import VueClipboard from 'vue-clipboard2';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;
Vue.use(VueClipboard);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
