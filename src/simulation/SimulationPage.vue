<template>
    <v-container>
        <v-dialog width="800" v-model="showCreateDialog">
            <v-card flat>
                <v-card-title>新建</v-card-title>
                <v-card-text>
                    <v-simple-form v-for="(item,index) in page.configuration.editor.forms" :key="index"
                                   :header="item.name">
                        <template v-slot:content>
                            <v-form-field :label="fitem.name" v-for="(fitem,findex) in  item.children"
                                          :key="findex"></v-form-field>
                        </template>
                    </v-simple-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="showCreateDialog=false">确定</v-btn>
                    <v-btn color="primary" outlined @click="showCreateDialog=false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card class="py-0">
            <v-toolbar flat color="white">
                <v-btn v-for="(item,index) in page.configuration.query.toolbars" :key="index" tile dark
                       :color="item.color||'primary'" class="mr-3" @click="showCreateDialog=true">
                    <v-icon v-if="item.icon" class="mr-1">{{item.icon}}</v-icon>
                    {{item.name}}
                </v-btn>
                <v-spacer/>
                <v-spacer/>
                <v-text-field
                        solo
                        flat
                        placeholder="输入关键字查询"
                        prepend-inner-icon="search"
                        hide-details
                        clearable
                        class="ml-3"
                ></v-text-field>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
                <v-data-table
                        :headers="headers"
                        :items="items"
                        item-key="id"
                        no-data-text="没有数据"
                        no-results-text="没有查询到数据"
                        class="elevation-1"
                        :items-per-page="8"
                        loading-text="正在查询数据...."
                        :server-items-length="100"
                        fixed-header
                        height="432px"
                >
                    <template v-slot:item.action="{ item }">
                        <v-edit-delete-group :items="rowToolbars"></v-edit-delete-group>
                    </template>
                </v-data-table>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {API} from "@/http/apis";

    export default {
        name: "SimulationPage",
        data() {
            return {
                showCreateDialog: false,
                pageId: null,
                appId: null,
                page: {},
                items: [{}]
            }
        },
        computed: {
            headers() {
                let headers = [];
                let fields = this.page.configuration.query.fields;
                fields.forEach(item => headers.push({text: item.name, value: item.code}))
                if (this.page.configuration.query.rowBars && this.page.configuration.query.rowBars.length > 0) {
                    headers.push({
                        text: '操作',
                        value: 'action'
                    })
                }
                return headers;
            },
            rowToolbars() {
                let bars = [];
                let rowBars = this.page.configuration.query.rowBars;
                rowBars.forEach(item => bars.push({
                    icon: item.icon,
                    text: item.name,
                    color: item.color
                }))
                return bars;
            }
        },
        created() {
            this.pageId = this.$route.query.pageId;
            this.requestPageContent();
        },
        methods: {
            requestPageContent() {
                this.$request.request(API.APM_PAGE_DETAIL, {rowid: this.pageId}).then((response) => {
                    this.page = response.data;
                    this.page.configuration = JSON.parse(response.data.configuration);
                })
            },
        }
    }
</script>

<style scoped>

</style>