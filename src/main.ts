import {library} from "@fortawesome/fontawesome-svg-core";
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import {faQuestionCircle} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import Vue from "vue";
import App from "./App.vue";
import "./plugins/clipboard";
import "./plugins/markdown";
import "./plugins/toasted";
import "./plugins/vuetify";
import router from "./router";

Vue.config.productionTip = false;

library.add(faQuestionCircle, faGithub);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
    router,
    render: (h) => h(App)
}).$mount("#app");
