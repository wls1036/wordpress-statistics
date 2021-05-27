<template>
    <div>
        <v-app-bar dense color="primary accent-1" fixed dark app>
            <v-toolbar-title v-if="showToggle">
                <v-app-bar-nav-icon @click="handleDrawerToggle"></v-app-bar-nav-icon>
            </v-toolbar-title>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>

            <v-toolbar-items>
                <v-btn style="text-transform: none;" text>{{userDisplayName}}</v-btn>
                <v-btn icon @click="handleFullScreen()">
                    <v-icon>fullscreen</v-icon>
                </v-btn>
                <v-menu offset-y origin="center center" class="elelvation-1" transition="scale-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn icon text slot="activator" v-on="on">
                            <v-badge color="red" overlap>
                                <span slot="badge">{{noticeNumber}}</span>
                                <v-icon medium>notifications</v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <app-notification></app-notification>
                </v-menu>
                <v-menu offset-y origin="center center" class="elelvation-1" transition="scale-transition">
                    <template v-slot:activator="{ on }">
                        <v-btn icon large slot="activator" v-on="on">
                            <v-avatar size="30px">
                                <img src="avator.png" alt="Helen"/>
                            </v-avatar>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item-group>
                            <v-list-item @click="handleProfile">
                                <v-list-item-avatar>
                                    <v-icon>account_circle</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>User Profile</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item @click="handleLogout">
                                <v-list-item-avatar>
                                    <v-icon>fullscreen_exit</v-icon>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Logout</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-app-bar>
    </div>
</template>
<script>
    import ApmUtil from "@/util/ApmUtil";
    import AppNotification from "@/views/app/AppNotification";

    export default {
        name: "AppToolbar",
        props: {
            title: {},
            showToggle: {
                type: Boolean,
                default: true
            }
        },
        components: {
            AppNotification
        },
        data() {
            return {
                items: [
                    {
                        icon: "account_circle",
                        href: "#",
                        title: "Profile",
                        click: this.handleProfile
                    },
                    {
                        icon: "settings",
                        href: "#",
                        title: "Settings",
                        click: this.handleSetting
                    },
                    {
                        icon: "fullscreen_exit",
                        href: "#",
                        title: "Logout",
                        click: this.handleLogut
                    }
                ]
            };
        }
        ,
        methods: {
            handleDrawerToggle() {
                window.theApp.$emit("APP_DRAWER_TOGGLED");
            }
            ,
            handleFullScreen() {
                ApmUtil.toggleFullScreen();
            }
            ,
            handleLogout() {
                this.logout();
            }
            ,
            handleProfile() {
            }
        }
        ,
        computed: {
            noticeNumber() {
                return this.$store.getters.notifications.length;
            },
            userDisplayName() {
                let s = localStorage.getItem("profile");
                let name = 'UNKnow';
                if (s) {
                    let user = JSON.parse(s);
                    name = user.displayName;
                }
                return name;
            }
        }
    }
    ;
</script>

<style lang="stylus" scoped></style>
