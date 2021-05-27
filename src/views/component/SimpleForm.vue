<template>
    <v-expansion-panels accordion :readonly="!showAction" :value="expanded">
        <v-expansion-panel class="pa-0" style="border-radius: 0;border: 0px;">
            <v-expansion-panel-header :hide-actions="!showAction" class="v-form-header"
                                      v-if="title!=undefined&&title!=null">
                {{title}}
                <v-layout :class="title&&title.length>0 ? 'ml-4':'ml-0'">
                    <slot name="toolbar"></slot>
                </v-layout>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="ma-0 pa-0 mt-1">
                <v-layout class="d-flex flex-column ma-0 pa-0" :style="{'min-height':minHeight?minHeight+'px':''}">
                    <slot name="content"></slot>
                </v-layout>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        name: "SimpleForm",
        props: {
            title: {
                type: String
            },
            showAction: {
                type: Boolean,
                default: false
            },
            hide: {
                type: Boolean,
                default: false
            },
            minHeight: {
                type: Number
            }
        },
        data() {
            return {}
        },
        computed: {
            expanded: function () {
                return this.hide ? -1 : 0;
            }
        }
    }
</script>

<style scoped>

</style>