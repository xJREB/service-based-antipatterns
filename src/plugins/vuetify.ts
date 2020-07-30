import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: { base: "#10627a", darken1: "#455066" },
                secondary: "#ffa500",
                accent: "#4395AD",
                error: "#FF5252",
                info: "#4395AD",
                success: "#FFFFFF",
                warning: "#FFC107"
            }
        }
    },
    icons: {
        iconfont: "md"
    }
});
