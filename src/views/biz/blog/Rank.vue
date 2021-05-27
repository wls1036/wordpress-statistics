<template>
    <v-page-data-table
            title="文章访问排行"
            key-name="id"
            :fields="fields"
            :height="535"
            hide-row-action
            disable-page
            hide-footer
            @today="query('today')"
            @yesterday="query('yesterday')"
            @week="query('week')"
            @month="query('month')"
            @all="query('all')"
            :query-params="queryParams"
            :toolbar-actions="userActions"
            query-api="SUMMARY_QUERY">
    </v-page-data-table>
</template>

<script>
    import analysisFields from "./rankFields";

    export default {
        name: "AnalysisQuery",
        data() {
            return {
                fields: analysisFields,
                cycle: "today",
                userActions: [
                    {
                        text: '当天',
                        color: 'primary',
                        style: 'text',
                        action: "today",
                    },
                    {
                        text: '昨天',
                        color: 'primary',
                        style: 'text',
                        action: "yesterday",
                    },
                    {
                        text: '本周',
                        color: 'primary',
                        style: 'text',
                        action: "week",
                    },
                    {
                        text: '本月',
                        color: 'primary',
                        style: 'text',
                        action: "month",
                    },
                    {
                        text: '所有',
                        color: 'primary',
                        style: 'text',
                        action: "all",
                    }
                ]
            }
        },
        computed: {
            queryParams() {
                return {
                    cycle: this.cycle
                }
            }
        },
        methods: {
            query(cycle) {
                this.cycle = cycle;
            }
        }
    }
</script>

<style scoped>

</style>