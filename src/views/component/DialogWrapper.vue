<template>
    <v-card class="pa-1">
        <v-card-title v-if="title">{{title}}</v-card-title>
        <v-card-text class="pa-1" style="min-height: 450px;">
            <component v-bind:is="componentPanel" v-model="componentData" @updateData="onUpdateData"/>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn tile color="primary" @click="onOk" :loading="actionLoading">保存</v-btn>
<!--            <v-btn outlined color="primary" @click="onCancel">取消</v-btn>-->
        </v-card-actions>
    </v-card>
</template>

<script>
    import ApmMinxins from "@/minxins/ApmMinxins";

    export default {
        name: "DialogWrapper",
        props: ["title", "componentPanel", "tag", "data"],
        mixins: [ApmMinxins],
        data() {
            return {
                componentData: null
            }
        },
        created() {
            this.componentData = this.data;
        },
        watch: {},
        methods: {
            onOk() {
                this.$emit('ok', this.tag, this.componentData);
            },
            onCancel() {
                this.$emit('cancel');
            },
            onUpdateData(cell, data) {
                this.componentData = data;
            }
        }
    }
</script>

<style scoped>

</style>