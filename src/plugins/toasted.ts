import Vue from "vue";
import Toasted from "vue-toasted";

// @ts-ignore
Vue.use(Toasted, {
    theme: "toasted-primary",
    position: "bottom-right",
    duration: 5000,
    iconPack: "material",
    icon: "info_outline",
    className: ["application", "toast"]
});
