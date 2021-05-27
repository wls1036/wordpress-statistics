<template>
    <span class="pointer-text" @click="handle(item)">{{text}}</span>
</template>

<script>
    export default {
        name: "LinkText",
        props: ["text"],
        methods: {
            handle: function (item) {
                this.$emit('clickText', item);
            }
        }
    }
</script>

<style scoped>

</style>