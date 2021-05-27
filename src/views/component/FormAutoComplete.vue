<template>
    <v-layout class="form-input-text d-flex flex-row  pl-2 align-center mb-1" style="color: black !important;">
        <slot name="prepend"></slot>
        <span v-if="label&&label.length>0" class="mr-2 font-weight-regular"
              :style="{width: labelWidth+'px',fontSize:'13px',textAlign:'right'}">{{label}} :</span>
        <v-layout :style="{width:fieldWidth+'px',maxWidth: fieldWidth+'px'}">
            <slot name="content">
                <v-autocomplete
                        v-model="selectValue"
                        clearable
                        class="form-input__border"
                        :items="itemList"
                        flat
                        solo
                        return-object
                        hide-details
                        :item-text="itemText"
                        :item-value="itemValue"
                        dense
                        @change="onchange"
                ></v-autocomplete>
            </slot>
        </v-layout>
        <slot name="append"></slot>
    </v-layout>
</template>

<script>
    export default {
        name: "FormSelectorField",
        props: {
            label: {
                type: String
            },
            disable: {
                type: Boolean,
                default: false,
            },
            items: String,
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
                labelWidth: 100,
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
            }
        },
        created() {
            let fieldBase = 300;
            let labelBase = 80;
            let step = 30;
            let labelLevel = 0;
            let fieldLevel = 0;
            this.labelWidth = labelBase + (labelLevel * step);
            this.fieldWidth = fieldBase + (fieldLevel * step);
            this.selectValue = this.value;
            if (this.dataApi) {
                this.loadRemoteApi();
            } else {
                this.parseExpression(this.items);
            }
        },
        methods: {
            parseExpression(exp) {
                let exps = exp.split(",");
                exps.forEach(item => {
                    let ss = item.split("|");
                    this.itemList.push({
                        text: ss[0],
                        value: ss.length > 1 ? ss[1] : ss[0]
                    })
                })
            },
            loadRemoteApi() {
                this.$request.request(this.dataApi, this.dataQueryParam).then(response => {
                    response.table.forEach(item => {
                        this.itemList.push(item)
                    })
                })
            },
            onchange(val) {
                this.$emit('input', val[this.itemValue]);
                this.$emit('change', val);
            }
        }
    }
</script>

<style scoped>

</style>