const minxin = {
    data() {
        return {
            currentPage: 1,
            confirmDialog: false,
            selected: [],
            searchText: "",
            currentRow: {},
            rows: {
                total: 0,
                item: []
            },
            queryInfo: {
                page: 1,
                pageSize: 8
            },
            footer: {
                showFirstLastPage: true,
                "show-current-page": true,
                "items-per-page-options": [8],
                "items-per-page-text": "每页"
            },
            meta: {
                editRoute: null,
                rowIdName: 'id',
                queryApi: null,
                deleteApi: null,
            }
        }
    },
    methods: {
        rowEdit: function (row) {
            this.$router.apmRoute(this.meta.editRoute, { id: row[this.meta.rowIdName] }, row);
        },
        goDetail: function (row) {
            this.$router.apmRoute(this.meta.detailRoute, { id: row[this.meta.rowIdName] }, row);
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
        query() {
            this.rows.items = [];
            let params = {
                text: this.searchText,
                page: this.queryInfo.page,
                pageSize: this.queryInfo.pageSize
            };
            this.$request
                .request(this.meta.queryApi, params)
                .then(response => {
                    this.rows.items = response.table;
                    this.rows.total = response.total;
                })
        },
        pageQuery(info) {
            this.queryInfo.page = info.page;
            this.queryInfo.pageSize = info.itemsPerPage;
            this.query();
        },
        showConfirmDialog(row) {
            this.currentRow = row;
            this.confirmDialog = true;
        },
        deleteRow() {
            this.$request
                .request(this.meta.deleteApi, { rowid: this.currentRow[this.meta.rowIdName] })
                .then(response => {
                    this.confirmDialog = false;
                    this.$message.success("删除成功");
                    this.query();
                });
        },
        batchDelete() {
            let ids = [];
            this.selected.forEach(item => ids.push(item[this.meta.rowIdName]));
            this.$request
                .request(this.meta.batchDeleteApi, ids)
                .then(response => {
                    this.confirmDialog = false;
                    this.$message.success("删除成功");
                    this.selected = [];
                    this.query();
                });
        }
    }
}


export default minxin