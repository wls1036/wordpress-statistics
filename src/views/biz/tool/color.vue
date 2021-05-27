<template>
    <v-container>
        <span id="hiddenbtn" hidden>clipboard btn</span>
        <v-color-selector @input="onSelectedColor"></v-color-selector>
    </v-container>
</template>

<script>
    export default {
        name: "color",
        created() {
            let _this = this;
            let clipboard = new this.clipboard('#hiddenbtn', {
                text: function () {
                    return _this.selectedColor;
                }
            });
            clipboard.on('success', function () {
                _this.$message.success("复制成功" + _this.selectedColor);
            });
            clipboard.on('error', function () {
                _this.$message.success("复制失败" + _this.selectedColor);
            });
        },
        data() {
            return {
                selectedColor: null
            }
        },
        methods: {
            onSelectedColor(color) {
                this.selectedColor = color;
                document.getElementById("hiddenbtn").click();
            }
        }
    }
</script>

<style scoped>

</style>