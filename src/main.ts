import Vue from 'vue';
import './plugins/vuetify';
import './plugins/clipboard';
import './plugins/toasted';
import App from './App.vue';
import router from './router';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import {library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {faGithub} from "@fortawesome/free-brands-svg-icons";

Vue.config.productionTip = false;

library.add(faGithub);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
