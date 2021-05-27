import Vue from 'vue'
import App from './App.vue'
import Home from './Home.vue'
import Login from './Login.vue'
import clipboard from 'clipboard';

import axios from 'axios'
import VueAxios from 'vue-axios'
import vuetify from '@/plugins/vuetify'
import router from '@/router/'
import request from '@/http/request'
import store from '@/store/'
import message from '@/util/message'
import '@/assets/main.css'

require('./config/index')
require('@/views/component/')

Vue.config.productionTip = false
Vue.prototype.clipboard = clipboard;

Vue.use(VueAxios, axios)
Vue.use(request)
Vue.use(message)

Vue.prototype.logout = function () {
    localStorage.clear();
    window.location.href = '/';
}
Vue.prototype.globalParam = function (name) {
    let params = localStorage.getItem("globalRouteParams");
    return params ? JSON.parse(params)[name] : null;
}

var token = localStorage.getItem('token');

window.appConfig = Object.create(null);


if (token) {
    new Vue({
        vuetify,
        router,
        store,
        render: h => h(App),
    }).$mount('#app')
} else {
    new Vue({
        vuetify,
        router,
        store,
        render: h => h(Login),
    }).$mount('#app')
}

Vue.filter('dateFormat', function (value, fmt) {
    let getDate = new Date(Number(value));
    let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }
    return fmt;
});
