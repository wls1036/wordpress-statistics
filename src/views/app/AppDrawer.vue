<template>
    <v-navigation-drawer app floating width="240" v-model="showDrawer">
        <v-toolbar dense color="primary darken-1" dark class="d-flex justify-center align-center">
            <img :src="logo" height="36" :alt="title"/>
        </v-toolbar>
        <v-list dense>
            <v-list-item-group color="primary">
                <template v-for="(item,index) in menu">
                    <v-list-group :prepend-icon="item.icon" :key="index" v-if="item.children" color="primary">
                        <template v-slot:activator>
                            <v-list-item-title>{{item.name}}</v-list-item-title>
                        </template>

                        <v-list-item
                                link
                                nav
                                @click="router(item2.path)"
                                v-for="(item2,index2) in item.children"
                                :key="index2"
                        >
                            <v-list-item-icon style="visibility:hidden">
                                <v-icon>{{item2.icon}}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title v-text="item2.name" class="nav-sub-item"></v-list-item-title>
                            <v-list-item-icon>
                                <v-icon>{{item2.icon}}</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-group>

                    <v-list-item nav link @click="router(item.path)" v-if="!item.children" :key="index">
                        <v-list-item-icon>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{item.name}}</v-list-item-title>
                    </v-list-item>
                </template>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>

    export default {
        name: "AppDrawer",
        props: ["menu","title","logo"],
        data() {
            return {
                showDrawer: true,
                mode: 'normal'
            };
        },
        created() {
            window.theApp.$on("APP_DRAWER_TOGGLED", () => {
                this.showDrawer = !this.showDrawer;
            });
        },
        methods: {
            router: function (path) {
                this.$router.apmRoute(path, {}, {}, "menu");
            },
        }
    };
</script>