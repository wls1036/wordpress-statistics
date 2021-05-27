<template>
    <v-page-data-table
            title="实时访问数据"
            key-name="id"
            :fields="fields"
            :height="535"
            hide-row-action
            query-api="REALTIME_QUERY">
        <template v-slot:referrer="{item}">
            <a target="_blank" :href="item.referrer" class="pointer-text" style="text-decoration: none">{{item.referrer}}</a>
        </template>
    </v-page-data-table>
</template>

<script>
    import realTimeFields from "./realTimeFields";

    export default {
        name: "RealtimeQuery",
        data() {
            return {
                fields: realTimeFields
            }
        }
    }
</script>

<style scoped>

</style>