<template>
  <v-dialog v-model="value" max-width="400">
    <v-card>
      <v-card-title class="headline">提示</v-card-title>
      <v-card-text v-html="showMessage"></v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :loading="actionLoading" @click="okAction">确定</v-btn>
        <v-btn color="primary" outlined @click="cancelAction">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ApmMinxins from "@/minxins/ApmMinxins";
export default {
  name: "apm-confirm-dialog",
  props: ["value", "message", "keyText"],
  data() {
    return {
      show: this.value
    };
  },
  mixins: [ApmMinxins],
  computed: {
    showMessage() {
      let msg = this.message;
      if (this.keyText == undefined) {
        return msg;
      }
      msg = this.message.replace(
        this.keyText,
        '<span style="font-weight:bold;color:blue;margin:5px">' +
          this.keyText +
          "</span>"
      );
      return msg;
    }
  },
  methods: {
    okAction() {
      this.$emit("ok");
      this.$emit("input", false);
    },
    cancelAction() {
      this.$emit("cancel");
      this.$emit("input", false);
    }
  }
};
</script>