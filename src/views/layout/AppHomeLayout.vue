<template>
    <v-app style="background-color: white">
        <app-toolbar/>
        <v-content class="d-flex flex-column">
            <router-view style="height: 100%"></router-view>
        </v-content>
        <app-message/>
    </v-app>
</template>
<script>
    import AppToolbar from "@/views/app/AppToolbar.vue";
    import AppMessage from "@/views/app/AppMessage.vue";

    export default {
        components: {
            AppToolbar,
            AppMessage
        },
        name: "app-home-layout",
        props: {
            fullscreen: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                showDrawer: true
            };
        },
        methods: {
            showAppDrawer: function () {
                this.showDrawer = !this.showDrawer;
            }
        }
    };
</script>