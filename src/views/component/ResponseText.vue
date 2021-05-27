<template>
  <v-card >
    <v-card-text>
<!--      <pre style="font-size:x-small;color:#91cc4b;font-weight:bolder;white-space:pre-wrap">{{text}}</pre>-->
<!--      <pre style="font-size:x-small;color:#a296f5;font-weight:bolder;white-space:pre-wrap">{{body}}</pre>-->
<!--      <json-viewer-->
<!--              :value="body"-->
<!--              :exapndedOnStart="true"-->
<!--              copyable-->
<!--              sort></json-viewer>-->
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "apm-response-text",
  props: ["text", "body"]
};
</script>