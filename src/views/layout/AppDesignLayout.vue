<template>
    <v-app style="background-color: white">
        <v-content>
            <v-container fluid class="pt-1" style="height: 100%">
                <router-view></router-view>
            </v-container>
        </v-content>
        <app-message/>
    </v-app>
</template>
<script>
    import AppMessage from "@/views/app/AppMessage.vue";

    export default {
        components: {
            AppMessage
        },
        name: "AppDesignLayout",
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
        created() {
        },
        methods: {
        }
    };
</script>