import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueConfig from 'vue-configuration'
import VueResource from 'vue-resource'
import vSelect from 'vue-select'

import config from './config';
import 'vue-awesome/icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';

import router1 from './router';

Vue.use(VueRouter)

import CustomRows from './components/CustomRows';
import Combinations from './components/Combinations';
import Pairs from './components/Pairs';
import Signin from './components/Signin';
import {AdminRole} from './components/roles';
import {UserRole} from './components/roles';


Vue.config.productionTip = false;

Vue.component('v-select', vSelect);

const _router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
      {
        path: '/',
        name: 'custom-rows',
        component: CustomRows
      },
      {
        path: '/custom',
        name: 'custom-rows1',
        component: CustomRows
      },
      {
        path: '/combinations',
        name: 'combinations',
        component: Combinations
      },
      {
        path: '/pairs',
        name: 'pairs',
        component: Pairs
      },
      {
        path: '/login',
        name: 'signin',
        component: Signin
      },
      {
        path: '/role',
        name: 'admin-role',
        component: AdminRole
      },
      {
        path: '/usersetting',
        name: 'user-role',
        component: UserRole
      },
      {
        path: '/fcustom',
        name: 'fcustom-rows',
        component: CustomRows
      },
      {
        path: '/fcombinations',
        name: 'fcombinations',
        component: Combinations
      },
      {
        path: '/fpairs',
        name: 'fpairs',
        component: Pairs
      },
    ]
})



new Vue({
    router: _router,
    data: {
        currentRoute: window.location.pathname
    },
    methods: {
        ViewComponent () {
            return router1(this.currentRoute)/* .then((d) => {return d}) */
        }
    },
    render (h) { return h(this.ViewComponent) }
}).$mount('#app');

Vue.use(VueConfig, {
    config: config
});

Vue.use(BootstrapVue);
Vue.use(VueResource);