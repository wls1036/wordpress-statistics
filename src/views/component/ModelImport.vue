<template>

    <v-stepper v-model="currentStep">
        <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1">选择导入源</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="currentStep > 2" step="2">选择模型</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3">选择字段</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content :step="1">
                <v-card>
                    <v-layout class="align-center justify-center align-content-center d-flex">
                        <v-btn tile color="primary" large class="mr-3" @click="onSelectedSource('eo')">
                            <v-icon>mdi-import</v-icon>
                            从模型中导入
                        </v-btn>
                        <v-btn tile color="indigo" large class="mr-3" style="color:white"
                               @click="onSelectedSource('api')">
                            <v-icon>mdi-import</v-icon>
                            从接口中导入
                        </v-btn>

                        <v-btn tile color="purple" large class="mr-3" style="color: white"
                               @click="onSelectedSource('dto')">
                            <v-icon>mdi-import</v-icon>
                            从请求响应中导入
                        </v-btn>
                    </v-layout>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="lastStep">取消</v-btn>
                    </v-card-actions>
                </v-card>

            </v-stepper-content>

            <v-stepper-content :step="2">
                <v-card class="py-0" height="550">
                    <v-card-title>选择请求响应模型</v-card-title>
                    <v-toolbar flat color="white">
                        <v-text-field
                                placeholder="输入关键字查询"
                                prepend-inner-icon="search"
                                hide-details
                                autofocus
                                clearable
                                class="ml-3"
                                v-model="searchText"
                                @keydown="queryTableData"
                        ></v-text-field>

                    </v-toolbar>
                    <v-card-text>
                        <v-data-table
                                v-model="selected"
                                :headers="header.dto"
                                :items="rows.items"
                                item-key="id"
                                :page.sync="currentPage"
                                no-data-text="没有数据"
                                no-results-text="没有查询到数据"
                                class="elevation-1"
                                show-select
                                single-select
                                :loading="queryLoading"
                                :items-per-page="8"
                                loading-text="正在查询数据...."
                                :server-items-length="rows.total"
                                @update:options="pageQuery"
                                fixed-header
                                height="300px"
                                :footer-props="footer"
                        >

                        </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="nextStep" @loading="actionLoading">下一步</v-btn>
                        <v-btn text @click="lastStep">上一步</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>

            <v-stepper-content :step="3">
                <v-card class="py-0">
                    <v-card-text>
                        <v-data-table
                                :headers="header.field"
                                :items="fields"
                                v-model="selectedFields"
                                item-key="id"
                                no-data-text="没有数据"
                                no-results-text="没有查询到数据"
                                class="elevation-1"
                                show-select
                                :items-per-page="8"
                                loading-text="正在查询数据...."
                                fixed-header
                                hide-default-footer
                                height="300"
                        >

                        </v-data-table>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" dark @click="onOk">确定</v-btn>
                        <v-btn text @click="lastStep">上一步</v-btn>
                    </v-card-actions>
                </v-card>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    import ApmMinxins from "@/minxins/ApmMinxins";
    import QueryPageMinxins from "@/minxins/QueryPageMinxins";
    import {API} from "@/http/apis";

    export default {
        name: "ModelImport",
        mixins: [ApmMinxins, QueryPageMinxins],
        data() {
            return {
                currentStep: 1,
                config: {},
                header: {
                    dto: [
                        {
                            text: "DTO名称",
                            value: "dtoName",
                            align: "left"
                        }
                    ],
                    field: [
                        {
                            text: "字段名称",
                            value: "name",
                            align: "left"
                        },
                        {
                            text: "字段编码",
                            value: "code",
                            align: "left",
                            width: "150px"
                        },
                        {
                            text: "字段类型",
                            value: "type",
                            align: "center",
                            width: "100px"
                        }
                    ]
                },
                fields: [],
                selectedFields: [],
                meta: {
                    rowIdName: "id",
                    queryApi: API.APM_DTO_QUERY
                }
            }
        },
        methods: {
            onSelectedSource(source) {
                this.config.source = source;
                this.nextStep();
            },
            onOk() {
                this.config.fields = this.selectedFields;
                this.$emit('ok', this.config);
            },
            nextStep() {
                if (this.currentStep == 2) {
                    if (this.selected.length == 0) {
                        this.$message.info('请至少选择一行数据');
                    } else {
                        this.querydtoDetail(this.selected[0].id);
                    }
                } else {
                    this.currentStep = this.currentStep + 1;
                }
            },
            lastStep() {
                this.currentStep = this.currentStep - 1;
            },
            querydtoDetail(id) {
                this.$request
                    .request(API.APM_DTO_DETAIL, {rowid: id})
                    .then(response => {
                        this.fields = response.data.fields;
                        this.selectedFields = response.data.fields;
                        this.currentStep = this.currentStep + 1;
                        this.config.modelId = id;
                        this.config.mockData = response.data.mockData;
                    });
            },
        }
    }
</script>