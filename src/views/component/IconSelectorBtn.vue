<template>
    <v-layout>
        <v-dialog width="850" v-model="iconShow">
            <v-icon-selector @selectIcon="onSelectIcon"></v-icon-selector>
        </v-dialog>
        <v-btn text @click="iconShow=true" v-if="value==null">选择图标</v-btn>
        <v-layout class="d-flex flex-row align-center" v-else>
            <v-btn large icon @click="iconShow=true">
                <v-icon large>{{value}}</v-icon>
            </v-btn>
            <v-btn x-small icon @click="value=null">
                <v-icon color="error">mdi-close-circle</v-icon>
            </v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        name: "IconSelectorBtn",
        props: ["value"],
        data() {
            return {
                iconShow: false
            }
        },
        methods: {
            onSelectIcon(icon) {
                this.iconShow = false;
                this.$emit("input", icon);
            },
            onClearIcon() {
                this.$emit("input", null)
            }
        }
    }
</script>

<style scoped>

</style>