<template>
        <app-main-layout/>
</template>

<script>
    import AppMainLayout from "@/views/layout/AppMainLayout.vue";

    export default {
        name: "app",
        data() {
            return {
                fullscreen: false,
                simulation: false,
                layout: 'AppMainLayout'
            };
        },
        components: {
            AppMainLayout
        },
        created() {
            window.theApp = this;
        }
    };
</script>

<style>
</style>
