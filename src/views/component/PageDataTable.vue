<template>
    <v-container class="pa-0">
        <v-dialog v-model="showConfirmDialog" max-width="400">
            <v-card>
                <v-card-title class="headline">提示</v-card-title>
                <v-card-text>确定删除数据？</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" :loading="actionLoading" @click="onConfirmDelete">确定</v-btn>
                    <v-btn color="primary" outlined @click="showConfirmDialog=false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card class="py-0">
            <v-card-title class="pt-0 pb-0" v-if="title" style="font-size: 18px;margin-right: 15px;">{{title}}
            </v-card-title>
            <v-vc @userAction="toolbarAction" :user-actions="toolbarActions" :default-filters="defaultFilters"
                  :list-filters="listFilters" :advance-filters="advanceFilters"
                  :advance-row-column-count="advanceRowColumnCount"
                  @export="onExport"
                  @search="onSearch"
                  :action-loading="actionLoading"/>
            <v-divider></v-divider>
            <v-card-text>
                <v-data-table
                        v-model="selectedItems"
                        :show-select="showSelect"
                        :headers="headers"
                        :items="dataItems?dataItems:items"
                        @click:row="onClickRow"
                        @dblclick:row="ondbClickRow"
                        :item-key="keyName"
                        :search="tableSearchText"
                        :page.sync="currentPage"
                        :no-data-text="noDataText"
                        :no-results-text="noDataText"
                        class="elevation-1"
                        :loading="queryLoading"
                        :items-per-page="disablePage?-1:10"
                        :height="height?height:''"
                        single-expand
                        :expanded.sync="expanded"
                        :show-expand="showExpand"
                        loading-text="Searching...."
                        :server-items-length="disablePage?undefined:totalCount"
                        @update:options="onRefresh"
                        :hide-default-footer="hideFooter||disablePage"
                        fixed-header
                        :footer-props="hideFooter?null:footer"
                >
                    <template v-slot:[h.id]="{ item }" v-for="h in headers">
                        <slot :name="h.value" :item="item">{{item[h.code]}}
                        </slot>
                    </template>
                    <template v-if="linkField" v-slot:[linkField]="{item}">
                        <span class="pointer-text" @click="onDetail(item)">{{ item[linkName] }}</span>
                    </template>
                    <template v-slot:item.operation="{ item }"
                              v-if="!hideRowAction&&(showDelete||showEdit||(rowActions&&rowActions.length>0))">
                        <v-edit-delete-group :hide-delete="!showDelete" :hide-edit="!showEdit" :items="rowActions"
                                             @edit="onEdit(item)"
                                             @delete="onDelete(item)"
                                             @userAction="emit($event,item)"></v-edit-delete-group>
                    </template>
                    <template v-slot:expanded-item="{ headers, item }" v-if="showExpand">
                        <td :colspan="headers.length">
                            <v-container style="width: 100%;">
                                <v-row class="d-flex flex-sm-column flex-md-row" no-gutters
                                       v-for="(rowItem,index) in expandFields" :key="index">
                                    <v-col :cols="12/expandRowColumnCount" v-for="(colItem,colIndex) in rowItem"
                                           :key="colIndex">
                                        <v-form-field label-large readonly :label="colItem.name"
                                                      :text="item[colItem.code]"></v-form-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </td>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>
<script>
    import _ from 'lodash';

    export default {
        name: "apm-page-data-table",
        props: {
            headerExp: {
                type: String
            },
            showDelete: {
                type: Boolean,
                default: true
            },
            showExpand: {
                type: Boolean,
                default: false
            },
            showEdit: {
                type: Boolean,
                default: true
            },
            showSelect: {
                type: Boolean,
                default: false
            },
            hideToolbar: {
                type: Boolean,
                default: false
            },
            hideSearch: {
                type: Boolean,
                default: false
            },
            hideRowAction: {
                type: Boolean,
                default: false
            },
            hideFooter: {
                type: Boolean,
                default: false
            },
            disablePage: {
                type: Boolean,
                default: false
            },
            rowActions: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            searchContent: {
                type: String
            },
            advanceRowColumnCount: {
                type: Number,
                default: 3
            },
            tableSearchText: String,
            noDataText: {
                type: String,
                default: '没有数据'
            },
            queryApi: String,
            exportApi: String,
            deleteApi: String,
            editRoute: String,
            detailRoute: String,
            keyName: {
                type: String,
                default: '_rowId_'
            },
            linkName: String,
            queryParams: {
                type: Object,
                default: function () {
                    return Object.create(null);
                }
            },
            height: {
                type: Number
            },
            title: String,
            fields: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            expandRowColumnCount: {
                type: Number,
                default: 3
            },
            toolbarActions: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            dataItems: {
                type: Array
            }
        },
        data() {
            return {
                headers: [],
                listFilters: [],
                defaultFilters: [],
                advanceFilters: [],
                expanded: [],
                expandFields: [],
                selectedItems: [],
                currentPage: 1,
                userQueryParam: {},
                totalCount: 0,
                items: [],
                showConfirmDialog: false,
                currentItem: null,
                footer: {
                    showFirstLastPage: true,
                    "show-current-page": true,
                    "items-per-page-options": [10],
                    "items-per-page-text": "每页"
                },
                queryInfo: {
                    page: 1,
                    pageSize: 10
                },
                linkField: null,
            }
        },
        created() {
            if (this.headerExp) {
                this.parseExp();
            }
            if (this.fields) {
                this.handleFields();
            }
            if (this.showExpand) {
                this.handleExpandFields();
            }
            if (!this.hideRowAction && (this.showEdit || this.showDelete || (this.rowActions && this.rowActions.length > 0))) {
                this.headers.push({
                    text: '操作',
                    value: 'operation',
                    width: '100px',
                    align: 'center'
                })
            }
            if (this.linkName) {
                this.linkField = "item." + this.linkName;
            }
            if (this.dataItems) {
                this.totalCount = this.dataItems.length;
                this.items = this.dataItems;
                this.postHandleItems();
            }
        },
        computed: {
            queryLoading: function () {
                return this.$store.getters.queryLoading;
            },
            actionLoading() {
                return this.$store.getters.actionLoading;
            },
            loading() {
                return this.$store.getters.loading;
            }
        },
        watch: {
            selectedItems(val) {
                this.emit("input", val)
            },
            queryParams: {
                deep: true,
                handler() {
                    this.query();
                }
            }
        },
        methods: {
            emit(action, item) {
                this.$emit(action, item);
            },
            query() {
                if (this.queryApi) {
                    this.items = [];
                    let params = this.makeParams();
                    this.$request
                        .request(this.queryApi, params)
                        .then(response => {
                            this.items = response.data;
                            this.totalCount = response.totalCount;
                            this.selectedItems = [];
                            this.postHandleItems();
                        })
                }
            },
            postHandleItems() {
                if (this.keyName === '_rowId_' && this.items) {
                    this.items.forEach(x => x[this.keyName] = _.uniqueId());
                }
            },
            makeParams() {
                let params = {
                    text: this.searchContent,
                    page: this.queryInfo.page,
                    limit: this.queryInfo.pageSize
                };
                params = Object.assign(params, this.queryParams);
                params = Object.assign(params, this.userQueryParam);
                return params;
            },
            onRefresh(info) {
                this.queryInfo.page = info.page;
                this.queryInfo.pageSize = info.itemsPerPage;
                this.query();
            },
            onDelete(item) {
                this.currentItem = item;
                this.showConfirmDialog = true;
            },
            onEdit(item) {
                if (this.editRoute) {
                    this.$router.apmRoute(this.editRoute, {id: item[this.keyName]}, item);
                }
                this.emit('edit', item);
            },
            onDetail(item) {
                if (this.detailRoute) {
                    this.$router.apmRoute(this.detailRoute, {id: item[this.keyName]}, item);
                }
                this.emit('detail', item);
            },
            onConfirmDelete() {
                if (this.deleteApi) {
                    this.$request
                        .request(this.deleteApi, {rowid: this.currentItem[this.keyName]})
                        .then(() => {
                            this.showConfirmDialog = false;
                            this.$message.success("删除成功");
                            this.query();
                        });
                }
                this.emit('delete', this.currentItem);
            },
            queryTableData: function (e) {
                if (e.keyCode === 13) {
                    if (this.currentPage != 1) {
                        this.currentPage = 1;
                    } else {
                        this.query();
                    }
                }
            },
            onCreate() {
                if (this.editRoute) {
                    this.$router.apmRoute(this.editRoute);
                }
                this.emit('create');
            },
            onClickRow(row) {
                this.emit('click', row);
            },
            ondbClickRow(row) {
                this.emit('dbClick', row);
            },

            parseExp() {
                let exp = this.headerExp.split(",");
                exp.forEach(item => {
                    let header = {};
                    let items = item.split("|");
                    header.text = items[0];
                    if (items.length > 1) {
                        header.value = items[1];
                    }
                    if (items.length > 2) {
                        header.width = items[2] + 'px';
                    }
                    if (items.length > 3) {
                        header.align = items[3];
                    }
                    header.id = "item." + header.value;
                    header.code = header.value;
                    this.headers.push(header);
                })
            },
            handleFields() {
                this.fields.filter(item => item.column).forEach(item => {
                    item.text = item.name;
                    item.value = item.code;
                    item.id = "item." + item.code;
                    this.headers.push(item);
                })
                this.fields.filter(item => item.defaultFilter).forEach(item => {
                    this.defaultFilters.push(item);
                })
                this.fields.filter(item => item.listFilter).forEach(item => {
                    this.listFilters.push(item);
                })
                this.fields.filter(item => item.advanceFilter).forEach(item => {
                    this.advanceFilters.push(item);
                })

            },
            handleExpandFields() {
                let count = 0;
                let tempFields = [];
                this.expandFields = [];
                this.fields.filter(item => item.showInExpand).forEach(item => {
                    tempFields.push(item);
                })
                for (let i = 0; i < tempFields.length; i = i + this.expandRowColumnCount) {
                    let row = [];
                    for (let j = 0; j < this.expandRowColumnCount && (i + j) < tempFields.length; ++j) {
                        ++count;
                        row.push(tempFields[i + j]);
                    }
                    this.expandFields.push(row);
                }
                let offset = tempFields.length - count;
                if (offset > 0) {
                    let offsetRow = [];
                    for (let i = 0; i < offset; ++i) {
                        offsetRow.push(tempFields[tempFields.length - offset + i]);
                    }
                    this.expandFields.push(offsetRow);
                }
            },
            toolbarAction(action) {
                this.$emit(action);
            },
            onSearch(params) {
                this.userQueryParam = params;
                this.queryInfo.page = 1;
                this.query();
            },
            onExport() {
                let queryParams = this.makeParams();
                this.$request
                    .request(this.exportApi, queryParams, {responseType: 'blob'})
                    .then(response => {
                        const blob = new Blob([response])
                        const objectUrl = URL.createObjectURL(blob)
                        const link = document.createElement('a')
                        const fname = this.title ? this.title + '.xls' : 'export.xls';
                        link.href = objectUrl
                        link.target = '_blank'
                        link.setAttribute('download', fname)
                        document.body.appendChild(link)
                        link.click()
                        document.body.removeChild(link)
                        window.URL.revokeObjectURL(objectUrl)
                    })
            },
            clearSelect() {
                this.selectedItems = [];
            }
        }
    };
</script>
