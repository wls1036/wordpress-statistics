<template>
    <v-card>
        <v-toolbar flat color="white">
            <v-text-field
                    placeholder="输入关键字查询"
                    prepend-inner-icon="search"
                    hide-details
                    clearable
                    class="ml-3"
                    v-model="searchText"
                    @keydown="queryTableData"
            ></v-text-field>
        </v-toolbar>
        <v-card-text>
            <v-data-table
                    v-model="headerSelected"
                    :headers="headers"
                    :items="rows.items"
                    no-data-text="无数据"
                    no-results-text="未查询到数据"
                    class="elevation-1"
                    :loading="queryLoading"
                    @click:row="selectedRow"
                    :items-per-page="8"
                    :page.sync="currentPage"
                    :server-items-length="rows.total"
                    @update:options="pageQuery"
                    loading-text="正在查询数据...."
                    fixed-header
                    :footer-props="lovFooter"
            ></v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :loading="actionLoading" @click="okAction">确定</v-btn>
            <v-btn color="primary" outlined @click="cancelAction">返回</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    import ApmMinxins from "@/minxins/ApmMinxins";
    import QueryPageMinxins from "@/minxins/QueryPageMinxins";

    export default {
        name: "apm-lov-dialog",
        props: [
            "value",
            "headers",
            "items",
            "api",
            "params",
            "idAttr",
            "nameAttr",
            "rowData",
            "tag",
            "initDisplayName",
            "label"
        ],
        created() {
            this.rowValue = this.rowData || {};
            if (this.items) {
                this.tableItems = this.items;
            }
            if (this.initDisplayName) {
                this.showName = this.initDisplayName;
            } else {
                this.showName = this.rowValue[this.nameAttr];
            }
        },
        data() {
            return {
                showLov: false,
                tableItems: [],
                showName: null,
                rowValue: {},
                searchText: null,
                headerSelected: [],
                meta: {
                    rowIdName: "id",
                    queryApi: this.api
                },
                lovFooter: {
                    showFirstLastPage: true,
                    "show-current-page": true,
                    "items-per-page-options": [8],
                    "items-per-page-text": "每页"
                }
            };
        },
        mixins: [ApmMinxins, QueryPageMinxins],
        computed: {},
        methods: {
            okAction() {
                this.showLov = false;
            },
            cancelAction() {
                this.showLov = false;
            },
            queryLovData(api, param) {
                param = param || {};
                if (this.searchText) {
                    param["text"] = this.searchText;
                }
                this.$request.request(api, param).then(response => {
                    this.tableItems = response.table;
                });
            },
            showLovDialog() {
                this.showLov = true;
                if (this.api) {
                    this.queryLovData(this.api, this.params);
                }
            },
            selectedRow(row) {
                row["tag"] = this.tag;
                this.rowValue = row;
                this.showLov = false;
                this.updateValue();
            },
            updateValue() {
                this.$emit("rowSelected", this.rowValue);
                this.$emit("input", this.rowValue[this.idAttr]);
                this.showName = this.rowValue[this.nameAttr];
            }
        }
    };
</script>