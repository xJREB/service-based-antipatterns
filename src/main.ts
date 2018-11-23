import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import VueClipboard from 'vue-clipboard2';
import Toasted from 'vue-toasted';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

// @ts-ignore
Vue.use(Toasted, {
    theme: "primary",
    position: "bottom-right",
    duration : 5000,
    iconPack: "material",
    icon: 'info_outline',
    className: "application",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
