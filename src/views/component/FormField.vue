<template>
    <v-layout class="form-input-text d-flex flex-row  pl-2 align-center mb-1"
              style="min-height: 28px;color: black !important;">
        <slot name="prepend"></slot>
        <span v-if="label" class="mr-2"
              :style="{width: labelWidth+'px',fontSize:'13px',textAlign:'right'}">{{label}} :</span>
        <v-layout :style="{width:fieldWidth+'px',maxWidth: fieldWidth+'px'}">
            <slot name="content">
                <v-text-field v-if="!readonly" :autofocus="autofocus" autocomplete="off" class="form-input__border" solo
                              flat
                              clearable
                              :placeholder="placeholder"
                              :disabled="disableEnable"
                              hide-details single-line dense v-model="textContent"
                              @keydown="onKeydown"
                              @change="onchange">
                </v-text-field>
                <span v-else>{{text}}</span>
            </slot>
        </v-layout>
        <slot name="append"></slot>
    </v-layout>
</template>

<script>
    export default {
        name: "FormField",
        props: {
            small: {
                type: Boolean,
                default: false
            },
            xSmall: {
                type: Boolean,
                default: false
            },
            xxSmall: {
                type: Boolean,
                default: false
            },
            middle: {
                type: Boolean,
                default: false
            },
            large: {
                type: Boolean,
                default: false
            },
            xLarge: {
                type: Boolean,
                default: false
            },
            xxLarge: {
                type: Boolean,
                default: false
            },
            labelSmall: {
                type: Boolean,
                default: false
            },
            labelMiddle: {
                type: Boolean,
                default: false
            },
            labelLarge: {
                type: Boolean,
                default: false
            },
            fieldSmall: {
                type: Boolean,
                default: false
            },
            fieldMiddle: {
                type: Boolean,
                default: false
            },
            fieldLarge: {
                type: Boolean,
                default: false
            },
            fieldXLarge: {
                type: Boolean,
                default: false
            },
            fieldXxLarge: {
                type: Boolean,
                default: false
            },
            label: {
                type: String
            },
            disable: {
                type: Boolean,
                default: false,
            },
            value: {},
            readonly: {
                type: Boolean,
                default: false
            },
            text: {},
            placeholder: {type: String},
            autofocus: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                labelWidth: 80,
                fieldWidth: 100,
                textContent: null
            }
        },
        computed: {
            disableEnable: {
                get() {
                    return this.disable;
                }
            }
        },
        watch: {
            value(val) {
                this.textContent = val;
            },
            text(val){
                this.textContent = val;
            }
        },
        created() {
            let fieldBase = 220;
            let labelBase = 70;
            let step = 20;
            let labelLevel = 0;
            let fieldLevel = 0;
            if (this.small) {
                labelLevel = -1;
                fieldLevel = -2;
            } else if (this.xSmall) {
                labelLevel = -2;
                fieldLevel = -4;
            } else if (this.xxSmall) {
                labelLevel = -3;
                fieldLevel = -6;
            } else if (this.large) {
                labelLevel = 1;
                fieldLevel = 2;
            } else if (this.xLarge) {
                labelLevel = 2;
                fieldLevel = 4;
            } else if (this.xxLarge) {
                labelLevel = 3;
                fieldLevel = 10;
            }
            if (this.labelSmall) {
                labelLevel = -1;
            } else if (this.labelMiddle) {
                labelLevel = 0;
            } else if (this.labelLarge) {
                labelLevel = 3;
            }
            if (this.fieldSmall) {
                fieldLevel = -3;
            } else if (this.fieldMiddle) {
                fieldLevel = 0;
            } else if (this.fieldLarge) {
                fieldLevel = 2;
            } else if (this.fieldXLarge) {
                fieldLevel = 4;
            } else if (this.fieldXxLarge) {
                fieldLevel = 10;
            }
            this.labelWidth = labelBase + (labelLevel * step);
            this.fieldWidth = fieldBase + (fieldLevel * step);
            this.textContent = this.value;
            if(!this.textContent){
                this.textContent=this.text;
            }

        },
        methods: {
            onchange(val) {
                this.$emit('input', val);
                this.$emit('change', val);
            },
            onKeydown(e) {
                if (e.keyCode === 13) {
                    this.$emit('enter', e);
                }
            }
        }
    }
</script>

<style scoped>

</style>