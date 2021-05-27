<template>
    <v-card>
        <v-card-title>
            <v-toolbar flat>
                <v-text-field
                        solo
                        flat
                        autocomplete="off"
                        prepend-inner-icon="search"
                        placeholder="搜索图标(英文)"
                        hide-details
                        clearable
                        v-model="searchText"
                        @keydown="queryIcons"
                ></v-text-field>
            </v-toolbar>
        </v-card-title>
        <v-card-text>
            <div style="overflow: scroll;max-height: 500px;">
                <v-card
                        class="text-break d-flex flex-wrap">
                    <v-card v-for="icon in showIcons" :key="icon" class="ma-2 pa-1">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn x-large icon v-on="on" @click="selectIcon(icon)">
                                    <v-icon large dark>mdi-{{icon}}</v-icon>
                                </v-btn>
                            </template>
                            <span>mdi-{{icon}}</span>
                        </v-tooltip>

                    </v-card>
                </v-card>
                <v-pagination
                        v-model="page"
                        class="my-4"
                        :total-visible="6"
                        :length="Math.ceil(iconContainer.length/pageSize)"
                ></v-pagination>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
    import {mdiIconNames} from './MdiIconName'

    export default {
        name: "IconSelector",
        props: {
            pageSize: {
                type: Number,
                default: 40
            }
        },
        data() {
            return {
                mdiIcons: mdiIconNames,
                page: 1,
                searchText: null,
                iconContainer: [],
                showIcons: []
            }
        },
        created() {
            this.updateShowIcons();
        },
        watch: {
            page() {
                this.updateShowIcons();
            }
        },
        methods: {
            queryIcons: function (e) {
                if (e.keyCode === 13) {
                    if (this.page != 1) {
                        this.page = 1;
                    }
                    this.updateShowIcons();
                }
            },
            updateShowIcons() {
                let begin = this.pageSize * (this.page - 1);
                let end = begin + this.pageSize;
                if (this.searchText == null || this.searchText.length == 0) {
                    this.iconContainer = this.mdiIcons;
                } else {
                    this.iconContainer = this.mdiIcons.filter(item => item.indexOf(this.searchText) >= 0);
                }
                let size = this.iconContainer.length;
                this.showIcons = [];
                for (let i = begin; i < end && i < size; ++i) {
                    this.showIcons.push(this.iconContainer[i]);
                }
            },
            selectIcon(icon) {
                this.$emit('selectIcon', 'mdi-' + icon);
            }
        }
    }
</script>
