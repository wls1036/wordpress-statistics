<template>
    <v-page-data-table
            title="每日访问统计"
            key-name="id"
            :fields="fields"
            :height="535"
            hide-row-action
            disable-page
            hide-footer
            @all="query()"
            :query-params="queryParams"
            :toolbar-actions="userActions"
            query-api="DAY_QUERY">
    </v-page-data-table>
</template>

<script>
    export default {
        name: "days",
        data() {
            return {
                days: 30,
                fields: [
                    {
                        name: '日期',
                        code: 'day',
                        column: true,
                        width: 100
                    },
                    {
                        name: '访问量',
                        code: 'pv',
                        column: true,
                        width: 100
                    }
                ],
                userActions: [
                    {
                        text: '显示所有',
                        color: 'primary',
                        action: "all"
                    }
                ]
            }
        },
        computed: {
            queryParams() {
                return {
                    days: this.days
                }
            }
        },
        methods: {
            query() {
                this.days = -1;
            }
        }
    }
</script>

<style scoped>

</style>