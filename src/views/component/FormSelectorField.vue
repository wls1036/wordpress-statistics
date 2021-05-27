<template>
    <v-layout class="form-input-text d-flex flex-row  pl-2 align-center mb-1" style="color: black !important;">
        <slot name="prepend"></slot>
        <span v-if="label&&label.length>0" class="mr-2 font-weight-regular"
              :style="{width: labelWidth+'px',fontSize:'13px',textAlign:'right'}">{{label}} :</span>
        <v-layout :style="{width:fieldWidth+'px',maxWidth: fieldWidth+'px'}">
            <slot name="content">
                <v-select v-model="selectValue" class="form-input__border" solo flat
                          hide-details
                          clearable
                          :disabled="disable"
                          :items="itemList" @change="onchange">
                </v-select>
            </slot>
        </v-layout>
        <slot name="append"></slot>
    </v-layout>
</template>

<script>
    export default {
        name: "FormSelectorField",
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
            items: String,
            dataItems: {
                type: Array
            },
            value: null,
            dataApi: String,
            itemText: {
                type: String,
                default: 'text'
            },
            itemValue: {
                type: String,
                default: 'value'
            },
            dataQueryParam: {}
        },
        data() {
            return {
                labelWidth: 80,
                fieldWidth: 100,
                itemList: [],
                selectValue: null
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
                this.selectValue = val;
            },
            dataItems(val) {
                if (val) {
                    this.itemList = [];
                    val.forEach(x => this.itemList.push({text: x[this.itemText], value: x[this.itemValue]}));
                }
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
            this.selectValue = this.value;
            if (this.dataApi) {
                this.loadRemoteApi();
            } else if (this.dataItems) {
                this.dataItems.forEach(x => this.itemList.push({text: x[this.itemText], value: x[this.itemValue]}));
            } else {
                this.parseExpression(this.items);
            }
        },
        methods: {
            parseExpression(exp) {
                if (exp) {
                    let exps = exp.split(",");
                    exps.forEach(item => {
                        let ss = item.split("|");
                        this.itemList.push({
                            text: ss[0],
                            value: ss.length > 1 ? ss[1] : ss[0]
                        })
                    })
                }
            },
            loadRemoteApi() {
                this.$request.request(this.dataApi, this.dataQueryParam).then(response => {
                    response.table.forEach(item => {
                        this.itemList.push({
                            text: item[this.itemText],
                            value: item[this.itemValue]
                        })
                    })
                })
            },
            onchange(val) {
                this.$emit('input', val);
                this.$emit('change', val);
            }
        }
    }
</script>

<style scoped>

</style>