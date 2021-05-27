<template>
    <v-container class="pa-0">
        <v-data-table
                :hide-default-header="hideHeader"
                v-model="selectedItems"
                :show-select="showSelect"
                :headers="headers"
                :items="items"
                :dense="dense"
                :search="searchText"
                no-data-text="没有找到记录"
                class="elevation-1"
                fixed-header
                @dblclick:row="onDoubleClick"
                hide-default-footer
        >
            <template v-slot:[h.id]="{ item }" v-for="h in headers">
                <slot :name="h.value" :item="item">{{item[h.code]}}
                </slot>
            </template>
            <template v-slot:item.operation="{ item }" v-if="showDelete||showEdit||(rowActions&&rowActions.length>0)">
                <v-edit-delete-group :hide-delete="!showDelete" :hide-edit="!showEdit" :items="rowActions"
                                     @edit="emit('edit',item)"
                                     @delete="emit('delete',item)"
                                     @userAction="emit($event,item)"></v-edit-delete-group>
            </template>
        </v-data-table>
    </v-container>
</template>
<script>
    export default {
        name: "apm-simple-table",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            headerExp: {
                type: String
            },
            showDelete: {
                type: Boolean,
                default: false
            },
            showEdit: {
                type: Boolean,
                default: false
            },
            showSelect: {
                type: Boolean,
                default: false
            },
            hideHeader: {
                type: Boolean,
                default: false
            },
            dense: {
                type: Boolean,
                default: false
            },
            showGrid: {
                type: Boolean,
                default: false
            },
            rowActions: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            searchText: {
                type: String
            },
            queryApi: {
                type: String
            },
            queryParams: {
                type: Object,
                default: function () {
                    return Object.create(null);
                }
            }
        },
        data() {
            return {
                headers: [],
                selectedItems: [],
                tableItems: []
            }
        },
        created() {
            if (this.headerExp) {
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
                    header.divider = this.showGrid;
                    this.headers.push(header);
                })
            }
            if (this.showEdit || this.showDelete || (this.rowActions && this.rowActions.length > 0)) {
                this.headers.push({
                    text: '操作',
                    value: 'operation',
                    width: '100px',
                    align: 'center'
                })
            }

            if (this.queryApi) {
                this.query();
            } else {
                this.tableItems = this.items;
            }
        },
        watch: {
            selectedItems(val) {
                this.emit("input", val)
            }
        },
        methods: {
            emit(action, item) {
                this.$emit(action, item);
            },
            onDoubleClick(event, option) {
                this.$emit('dbclick', option.item);
            },
            query() {
                let params = Object.assign({}, this.queryParams);
                this.$request
                    .request(this.queryApi, params)
                    .then(response => {
                        this.tableItems = response.table;
                    })
            }
        }
    };
</script>