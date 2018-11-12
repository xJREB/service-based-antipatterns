import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import VueClipboards from 'vue-clipboards';
import Toasted from 'vue-toasted';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;
Vue.use(VueClipboards);

// @ts-ignore
Vue.use(Toasted, {
    theme: "primary",
    position: "bottom-right",
    duration : 5000,
    iconPack: "material",
    className: "application",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
