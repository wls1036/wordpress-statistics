import Vue from 'vue'

var prod = false;
var envConfig = undefined;
if (process.env.NODE_ENV == "production") {
    prod = true;
    envConfig = require('./prod.env').config;
} else {
    envConfig = require('./dev.env').config;
}

envConfig.install = Vue => {
    Vue.prototype.$envConfig = envConfig;
    delete envConfig.install;
}
envConfig = Object.assign({
    mock: false
}, envConfig);


//安装插件
Vue.use(envConfig)

export default envConfig;

//非生产环境可以配置mock，生产环境禁止配置mock
if (envConfig.mock && !prod) {
    require('@/http/mock/mock.js')
}
