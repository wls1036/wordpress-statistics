<template>
    <v-card>
        <v-card-text>
            <!-- {{text}} -->
<!--            <pre style="font-size:x-small;color:#eee15b;font-weight:bolder;white-space:pre-wrap">{{text}}</pre>-->
<!--            <pre style="font-size:x-small;color:#a296f5;font-weight:bolder;white-space:pre-wrap">{{body}}</pre>-->

<!--            <json-viewer-->
<!--                    :value="body"-->
<!--                    :exapndedOnStart="true"-->
<!--                    copyable-->
<!--                    sort></json-viewer>-->
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        name: "apm-request-text",
        props: ["text", "body"]
    };
</script>