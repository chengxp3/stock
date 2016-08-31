import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = { withCredentials: true };

