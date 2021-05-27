<template>
    <v-menu bottom left offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list>
            <v-list-item @click="editAction" dense v-if="!hideEdit">
                <span class="text--bold-14">
                    <v-icon small
                            class="mr-2">mdi-file-document-edit-outline
                    </v-icon>编辑
                </span>
            </v-list-item>
            <v-list-item @click="deleteAction" dense v-if="!hideDelete">
                <span class="text--bold-14" style="color: red">
                    <v-icon color="red" small class="mr-2">mdi-alert
                    </v-icon>删除
                </span>
            </v-list-item>
            <v-list-item v-for="item in items" @click="userAction(item)" dense :key="item.action">
                <span class="text--bold-14" :style="{color:item.color}">
                    <v-icon :color="item.color" v-if="item.icon!=undefined" small
                            class="mr-2">{{item.icon}}
                    </v-icon>{{item.text}}
                </span>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
    export default {
        name: "apm-edit-delete-group",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            hideEdit: {
                type: Boolean,
                default: false
            },
            hideDelete: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        },
        methods: {
            editAction() {
                this.$emit("edit");
            },
            deleteAction() {
                this.$emit("delete");
            },
            detailAction() {
                this.$emit("detail");
            },
            userAction(item) {
                this.$emit(item.action);
                this.$emit('userAction',item.action);
            }
        }
    };
</script>