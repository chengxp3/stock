'use strict';

// Global dependencies
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import MintUI from 'mint-ui';

// Local dependencies
import routerConfig from './routes'

// App Styles
import '../src/css/app.css'
import 'mint-ui/lib/style.css';

// Init Vue app
Vue.use(VueRouter).use(VueResource).use(MintUI)
Vue.http.options.crossOrigin = true;
Vue.http.options.xhr = { withCredentials: true };

const router = new VueRouter()
routerConfig(router)
router.start(Vue.extend({}), '#app')
