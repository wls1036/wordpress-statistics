<template>
    <v-container flat tile class="ma-0 pa-0">
        <v-toolbar flat tile dense>
            <v-layout class="ml-3" v-if="userActions.length>0">
                <div v-for="(item,index) in userActions" :key="index">
                    <v-btn v-if="!item.children" :text="item.display=='text'" tile :color="item.color?item.color:''"
                           style="color: white"
                           :loading="item.async?actionLoading:false"
                           @click="userAction(item)"
                           class="mr-2">
                        <v-icon v-if="item.icon">{{item.icon}}</v-icon>
                        {{item.text}}
                    </v-btn>

                    <v-menu v-else bottom left offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn tile text v-bind="attrs" v-on="on" class="mr-2">
                                {{item.text}}
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(action,actionIndex) in item.children" @click="userAction(action)" dense
                                         :key="actionIndex">
                                                <span class="text--bold-14" :style="{color:action.color}">
                                                    <v-icon :color="action.color" v-if="action.icon!=undefined" small
                                                            class="mr-2">{{action.icon}}
                                                    </v-icon>{{action.text}}
                                                </span>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-layout>
            <v-spacer v-if="userActions.length>0"/>
            <v-text-field v-if="defaultFilters.length>0" class="vc-input__border mr-5" solo flat dense hide-details
                          clearable type="text"
                          @keydown="onKeydown"
                          v-model="searchContent"
                          :placeholder="searchPlaceholder">
                <template v-slot:prepend-inner>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-icon v-on="on" left>arrow_drop_down</v-icon>
                        </template>
                        <v-list style="min-width:100px;">
                            <v-list-item v-for="(item,index) in listFilters" :key="index" dense
                                         @click="onSelectedFilter(item)">
                                <v-list-item-title>{{item.name}}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-list-item-title v-if="selectedFilter" style="font-size: 12px;margin-right: 5px;">
                        <v-btn x-small icon @click="clearListFilter">
                            <v-icon small>mdi-close-circle</v-icon>
                        </v-btn>
                        {{selectedFilter.name}} :
                    </v-list-item-title>
                </template>
            </v-text-field>
            <v-spacer v-if="userActions.length==0"/>
            <span
                    class="pointer-text"
                    v-if="advanceFilters.length>0"
                    style="font-size:12px;margin-right:10px;"
                    @click="showAdvancesAction()"
            >{{showAdvances?'Normal Search':'Advance Search'}}</span>
            <v-btn small icon style="margin-right:10px;" @click="onExport">
                <v-icon>file_download</v-icon>
            </v-btn>
            <v-btn small icon style="margin-right:10px;" @click="onSearch">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
        </v-toolbar>
        <v-container v-show="showAdvances" class="ma-0 pa-0">
            <v-row class="d-flex flex-sm-column flex-md-row" no-gutters v-for="(item,index) in advanceRows"
                   :key="index">
                <v-col :cols="12/advanceRowColumnCount" v-for="(colItem,colIndex) in item" :key="colIndex">
                    <v-form-selector label-large :label="colItem.name" v-if="colItem.type=='select'"
                                     :items="colItem.value"
                                     v-model="colItem.componentData"></v-form-selector>
                    <v-form-date-selector label-large :label="colItem.name" v-else-if="colItem.type=='date'"
                                          v-model="colItem.componentData"></v-form-date-selector>
                    <v-form-field v-else label-large :label="colItem.name" v-model="colItem.componentData"/>
                </v-col>
            </v-row>
            <v-row class="d-flex flex-sm-column flex-md-row" no-gutters>
                <v-col cols="4" style="margin-left: 145px;" class="mt-2 mb-1">
                    <v-btn height="35" color="primary" tile class="mr-2" @click="onSearch">Search</v-btn>
                    <v-btn text tile @click="onReset">Reset</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>
<script>
    export default {
        name: "v-vc",
        props: {
            actionLoading: {
                type: Boolean,
                default: false
            },
            defaultFilters: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            listFilters: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            advanceFilters: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            searchPlaceholder: {
                type: String,
                default: '搜索'
            },
            advanceRowColumnCount: {
                type: Number,
                default: 3
            },
            userActions: {
                type: Array,
                default: function () {
                    return [];
                }
            }
        },
        created() {
            if (this.searchPlaceholder == '搜索') {
                this.handleSearchPlaceHolder();
            }
            this.handleAdvanceField();
        },
        data: function () {
            return {
                showAdvances: false,
                selectedFilter: null,
                searchContent: null,
                advanceRows: []
            };
        },
        methods: {
            showAdvancesAction: function () {
                this.showAdvances = !this.showAdvances;
            },
            handleSearchPlaceHolder() {
                if (this.defaultFilters.length > 0) {
                    let str = "根据以下字段搜索：";
                    let bok = false;
                    for (let i = 0; i < this.defaultFilters.length; ++i) {
                        if (i > 2) {
                            str = str + " ...";
                            break;
                        }
                        if (bok) {
                            str = str + ","
                        }
                        str = str + this.defaultFilters[i].name
                        bok = true;
                    }
                    this.searchPlaceholder = str;
                }
            },
            handleAdvanceField: function () {
                let count = 0;
                for (let i = 0; i < this.advanceFilters.length; i = i + this.advanceRowColumnCount) {
                    let row = [];
                    for (let j = 0; j < this.advanceRowColumnCount && (i + j) < this.advanceFilters.length; ++j) {
                        ++count;
                        row.push(this.advanceFilters[i + j]);
                    }
                    this.advanceRows.push(row);
                }
                let offset = this.advanceFilters.length - count;
                if (offset > 0) {
                    let offsetRow = [];
                    for (let i = 0; i < offset; ++i) {
                        offsetRow.push(this.advanceFilters[this.advanceFilters.length - offset + i]);
                    }
                    this.advanceRows.push(offsetRow);
                }
                this.advanceRows.forEach(item => item.forEach(x => this.$set(x, 'componentData', null)));
            },
            onSelectedFilter(item) {
                this.selectedFilter = item;
                this.searchPlaceholder = "Search by " + item.name;
            },
            onReset() {
                this.handleSearchPlaceHolder();
                this.selectedFilter = null;
                this.advanceRows.forEach(item => item.forEach(x => x.componentData = null));
                this.searchContent = null;
            },
            onSearch() {
                this.$emit('search', this.makeParam());
            },
            makeParam() {
                let params = {};
                this.advanceRows.forEach(item => item.filter(x => x.componentData).forEach(x => params[x.code] = x.componentData));
                if (this.searchContent && this.searchContent.length > 0) {
                    if (this.selectedFilter) {
                        params[this.selectedFilter.code] = this.searchContent;
                    } else {
                        params['searchContent'] = this.searchContent;
                    }
                }
                return params;
            },
            userAction(item) {
                this.$emit(item.action);
                this.$emit('userAction', item.action);
            },
            clearListFilter() {
                this.selectedFilter = null;
                this.handleSearchPlaceHolder();
            },
            onExport() {
                this.$emit('export', this.makeParam());
            },
            onKeydown(e) {
                if (e.keyCode === 13) {
                    this.onSearch();
                }
            }
        }
    };
</script>