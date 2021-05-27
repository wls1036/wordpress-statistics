<template>
    <v-layout>
        <v-dialog width="800" v-if="showFunctionDialog" v-model="showFunctionDialog">
            <v-card class="pa-1">
                <v-card-title>"编辑表达式"</v-card-title>
                <v-card-text class="pa-1" style="min-height: 450px;">
                    <v-expression-editor v-model="expression"></v-expression-editor>
                </v-card-text>
                <v-card-actions>
                    <v-spacer/>
                    <v-btn tile color="primary" @click="showFunctionDialog=false" >确定</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-form-textarea v-model="expression" :disable="disable"
                         :label="label"
                         :readonly="readonly"
                         :text="text" :height="height">
            <template v-slot:append>
                <v-btn icon color="primary" @click="showFunctionDialog=true">
                    <v-icon>mdi-function-variant</v-icon>
                </v-btn>
            </template>
        </v-form-textarea>
    </v-layout>
</template>

<script>
    export default {
        name: "FormFunctionField",
        props: {
            label: {
                type: String
            },
            disable: {
                type: Boolean,
                default: false,
            },
            value: String,
            readonly: {
                type: Boolean,
                default: false
            },
            text: String,
            height: {
                type: Number,
                default: 45
            }
        },
        created() {
            if (this.value) {
                this.expression = this.value;
            }
        },
        watch: {
            expression: {
                deep: true,
                handler: function () {
                    this.$emit('input', this.expression);
                }
            }
        },
        data() {
            return {
                showFunctionDialog: false,
                expression: null
            }
        }
    }
</script>

<style scoped>

</style>