import Vue from 'vue'
import VueRouter from 'vue-router'

import Icon from "../views/biz/tool/icon";

import RealTime from "../views/biz/blog/RealTime";
import Analysis from "../views/biz/blog/Rank";
import days from "../views/biz/blog/days";

import path from './menu'


const routes = [
    {path: '/', name: "home", component: RealTime},
    {path: '/tool/icon', name: "icon", component: Icon},
    {path: '/realtime', name: "realtime", component: RealTime},
    {path: '/rank', name: "rank", component: Analysis},
    {path: '/days', name: "days", component: days}
]

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "hash",
    linkActiveClass: "active",
    routes: routes
})

router.beforeEach((to, from, next) => {
    //控制首页和app内部页面
    let m = to.path.match(/\/project\/([^\/]+)\//);
    if (m) {
        let projectId = m[1];
        localStorage.setItem("httpHeader", JSON.stringify({
            projectId: projectId
        }));
        localStorage.setItem("globalRouteParams", JSON.stringify({
            projectId: projectId
        }));
    }

    if (to.path == '/' || to.path == '' || to.path == '/#/') {
        if (window.appConfig.container && window.appConfig.container == 'app') {
            window.location.href = '/';
        } else {
            next();
        }
        return;
    } else if (window.appConfig.container && window.appConfig.container == 'home') {
        location.reload();
        return;
    }
    let token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/';
        return;
    }
    next();
})

router.apmRoute = (to, query, params, source) => {
    let routerInfo = router.routerInfo(to);
    if (routerInfo) {
        if (source) {
            routerInfo.source = source;
        }
        query = Object.assign(routerInfo.query || {}, query || {});
        routerInfo.query = query;
    }
    params = Object.assign(params || {}, JSON.parse(localStorage.getItem("globalRouteParams") || "{}"));
    router.push({name: routerInfo.router.name, query: query, params: params});
}

router.goBack = () => {
    router.go(-1);
    window.theApp.$emit("ROUTER_GOBACK");
}

/**
 * 获取路由信息
 * path先根据name进行查找，如果没找到再按照path进行查找
 */
router.routerInfo = (to) => {
    let index = to.indexOf('?');
    let result = {};
    if (index != -1) {
        let query = {};
        //解析参数
        let uri = to.slice(index + 1, to.length);
        to = to.slice(0, index);
        uri.split('&').forEach(item => {
            let items = item.split('=');
            if (items.length > 1) {
                query[items[0]] = items[1];
            }
        })
        result.query = query;
    }
    let routerItem = routes.filter(item => item.name == to).pop();
    if (!routerItem) {
        routerItem = routes.filter(item => item.path == to).pop();
    }
    if (!routerItem) {
        return;
    }
    result.router = routerItem;
    let meta = path.filter(item => item.path && (item.path == routerItem.path || "/" + item.path == routerItem.path)).pop();

    //先从根结点获取，如果找不到再从chidren节点获取
    if (!meta || meta.length == 0) {
        path.filter(item => item.children).forEach(item => {
            item.children.forEach(row => {
                if (row.path == routerItem.path || "/" + row.path == routerItem.path) {
                    meta = row;
                }
            })
        })
    }

    //路由信息不在菜单里
    if (!meta) {
        meta = {
            name: routerItem.title
        }
    }
    result.meta = meta;
    return result;
}

export default router;