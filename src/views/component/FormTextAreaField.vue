<template>
    <v-layout class="form-input-text d-flex flex-row  pl-2 align-center mb-1" style="color: black !important;">
        <slot name="prepend"></slot>
        <span v-if="label&&label.length>0" class="mr-2 font-weight-regular"
              :style="{width: labelWidth+'px',fontSize:'13px',textAlign:'right'}">{{label}} :</span>
        <v-layout :style="{width:fieldWidth+'px',maxWidth: fieldWidth+'px'}">
            <slot name="content">
                <v-textarea v-if="!readonly"
                            class="form-input__border"
                            style="line-height: 5px;"
                            :height="height"
                            flat
                            solo
                            :disabled="disableEnable"
                            hide-details dense v-model="textContent"
                            @change="onchange"
                ></v-textarea>
                <span v-else>{{text}}</span>
            </slot>
        </v-layout>
        <slot name="append"></slot>
    </v-layout>
</template>

<script>
    export default {
        name: "FormTextAreaField",
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
            value: String,
            readonly: {
                type: Boolean,
                default: false
            },
            text: String,
            height: {
                type: Number,
                default: 80
            }
        },
        data() {
            return {
                labelWidth: 100,
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
            }
        },
        created() {
            let fieldBase = 300;
            let labelBase = 80;
            let step = 30;
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
                fieldLevel = -1;
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

        },
        methods: {
            onchange(val) {
                this.$emit('input', val);
                this.$emit('change', val);
            }
        }
    }
</script>

<style scoped>

</style>