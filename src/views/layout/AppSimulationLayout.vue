<template>
    <v-app style="background-color: white">
        <app-drawer :title="appTitle" :logo="appLogo" :menu="menu" :showDrawer="showDrawer"/>
        <app-toolbar :title="appTitle" @side-icon-click="showAppDrawer"/>
        <v-content>
            <v-container fluid class="pt-1" style="height: 100%">
                <router-view :key="$route.query.pageId"></router-view>
            </v-container>
        </v-content>
<!--        <v-content class="d-flex flex-column">-->
<!--            <router-view style="height: 100%"></router-view>-->
<!--        </v-content>-->
        <app-message/>
    </v-app>
</template>
<script>
    import AppToolbar from "@/views/app/AppToolbar.vue";
    import AppDrawer from "@/views/app/AppDrawer.vue";
    import AppMessage from "@/views/app/AppMessage.vue";
    import {API} from "@/http/apis";

    export default {
        components: {
            AppToolbar,
            AppDrawer,
            AppMessage
        },
        name: "AppSimulationLayout",
        props: {
            fullscreen: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showDrawer: true,
                menu: [],
                appTitle: '快速开发平台',
                appLogo: '/logo.png'
            };
        },
        created() {
            window.theApp.$on("ROUTER_ROUTE", (routerInfo) => {
                if (routerInfo.router.meta && routerInfo.router.meta.fullscreen) {
                    this.fullscreen = true;
                }
            })
            this.requestApplicationMenu(this.$route.query.appId);
        },
        methods: {
            showAppDrawer: function () {
                this.showDrawer = !this.showDrawer;
            },
            requestApplicationMenu: function (appId) {
                console.log(appId)
                this.$request.request(API.APM_PROJECT_MENU, {rowid: appId})
                    .then((response) => {
                        this.menu = response.table;
                    })
            }
        }
    };
</script>