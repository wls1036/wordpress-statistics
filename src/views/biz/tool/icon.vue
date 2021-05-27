<template>
    <v-container>
        <span id="hiddenbtn" hidden>clipboard btn</span>
        <v-icon-selector :page-size="70" @selectIcon="onSelectIcon">
        </v-icon-selector>
    </v-container>
</template>

<script>
    export default {
        created() {
            let _this = this;
            let clipboard = new this.clipboard('#hiddenbtn', {
                text: function () {
                    return _this.selectedIcon;
                }
            });
            clipboard.on('success', function () {
                _this.$message.success("复制成功" + _this.selectedIcon);
            });
            clipboard.on('error', function () {
                _this.$message.success("复制失败" + _this.selectedIcon);
            });
        },
        data() {
            return {
                selectedIcon: null
            }
        },
        methods: {
            onSelectIcon(icon) {
                this.selectedIcon = icon;
                document.getElementById("hiddenbtn").click();
            }
        }
    }
</script>