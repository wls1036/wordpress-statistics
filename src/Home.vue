<template>
    <app-home-layout/>
</template>

<script>
    import AppHomeLayout from "@/views/layout/AppHomeLayout";

    export default {
        name: "home",
        components: {
            AppHomeLayout
        },
        created() {
            window.theApp = this;
        }
    };
</script>

<style>
</style>
