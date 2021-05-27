import app from './module/app'
import user from "./module/user";
import Vue from 'vue'
import Vuex from 'vuex'
import states from './getter'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        app,
        user
    },
    getters: states
})

export default store