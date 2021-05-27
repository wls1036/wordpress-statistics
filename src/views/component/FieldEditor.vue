<template>
  <v-btn
    fab
    dense
    icon
    @click="show=true"
    color="gray"
    class="pa-0"
    x-small
    style="margin-left: 10px;margin-top: -4px;width:18px;height:18px;"
  >
    <v-icon style="width:16px;">border_color</v-icon>
    <v-dialog v-model="show" max-width="290">
      <v-card>
        <v-card-title>{{title}}:</v-card-title>
        <v-card-text>
          <v-text-field autofocus  dense clearable></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn tile color="primary" @click="ok()">确定</v-btn>
          <v-btn tile outlined @click="cancel()">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>
<script>
export default {
  name: "v-field-editor",
  props: ["type", "value", "title", "tip"],
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    ok() {
      this.$emit("ok");
      this.show = false;
    },
    cancel() {
      this.$emit("cancel");
      this.show = false;
    }
  }
};
</script>