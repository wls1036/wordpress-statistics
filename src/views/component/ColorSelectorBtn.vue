<template>
    <v-layout>
        <v-dialog v-model="colorShow" max-width="800">
            <v-card>
                <v-toolbar flat color="primary" dark class="mb-1" dense>
                    <v-toolbar-title>颜色选择</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-color-selector v-model="color"></v-color-selector>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="onSelectColor">确定</v-btn>
                    <v-btn color="primary" outlined @click="colorShow=false">取消</v-btn>
                </v-card-actions>
            </v-card>

        </v-dialog>
        <v-btn text @click="colorShow=true" v-if="color==null">选择颜色</v-btn>
        <v-layout class="d-flex flex-row align-center" v-else>
            <v-btn x-small fab :color="color" @click="colorShow=true" class="mr-2">
            </v-btn>
            <v-btn x-small icon @click="color=null">
                <v-icon color="error">mdi-close-circle</v-icon>
            </v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
    export default {
        name: "ColorSelectorBtn",
        data() {
            return {
                colorShow: false,
                color: null
            }
        },
        methods: {
            onSelectColor() {
                this.$emit('input', this.color);
                this.colorShow = false;
            }
        },
        watch: {
            value: function (v) {
                this.color = v;
            }
        },
    }
</script>

<style scoped>

</style>