<template>
    <v-app style="background-color: white">
        <app-drawer :title="appTitle" :logo="appLogo" :menu="menu"/>
        <app-toolbar :title="appTitle"  @side-icon-click="showAppDrawer"/>
        <v-main>
            <v-container fluid class="pt-1" style="height: 100%">
                <router-view></router-view>
            </v-container>
        </v-main>
        <app-message/>
    </v-app>
</template>
<script>
    import AppToolbar from "@/views/app/AppToolbar.vue";
    import AppDrawer from "@/views/app/AppDrawer.vue";
    import AppMessage from "@/views/app/AppMessage.vue";
    import menu from "@/router/menu"

    export default {
        components: {
            AppToolbar,
            AppDrawer,
            AppMessage
        },
        name: "app-main-layout",
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
                appTitle: '郑剑峰个人博客运营',
                appLogo: 'banner.png'
            };
        },
        created() {
            window.theApp.$on("APP_FULLSCREEN", () => {
                this.fullscreen = false;
            });
            window.theApp.$on("ROUTER_ROUTE", (routerInfo) => {
                if (routerInfo.router.meta && routerInfo.router.meta.fullscreen) {
                    this.fullscreen = true;
                }
            })
            this.menu = menu;
        },
        methods: {
            showAppDrawer: function () {
                this.showDrawer = !this.showDrawer;
            }
        }
    };
</script>