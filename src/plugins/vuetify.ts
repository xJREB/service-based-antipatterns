import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#455066',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#FFFFFF',
        warning: '#FFC107',
    },
    iconfont: 'md',
});
