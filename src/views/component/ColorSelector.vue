<template>
    <v-container>
        <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-palette</v-icon>
                标准色
            </v-tab>
            <v-tab>
                <v-icon left>mdi-select-color</v-icon>
                取色器
            </v-tab>
            <v-tab-item>
                <v-sheet :elevation="8" class="mb-2 v-picker--full-width justify-center align-center" tile height="40"
                         :color="extraColor">
                    <span style="color: white;" class="font-weight-bold">{{extraColor}}</span>
                </v-sheet>
                <v-sheet :elevation="8" class="pa-1 pt-3 pb-3">
                    <v-layout class="d-flex flex-row wrap justify-start">
                        <v-sheet :key="color" v-for="color in standColors" tile width="130" height="40" :elevation="2"
                                 :color="currentStandColor==color?color+' lighten-2':color"
                                 class="ma-1"
                                 style="cursor: pointer"
                                 @click="selectStandColor(color)">
                            <v-icon v-if="currentStandColor==color" :color="color" style=" filter: invert(100%);">
                                mdi-check-bold
                            </v-icon>
                        </v-sheet>
                    </v-layout>
                </v-sheet>
                <v-sheet :elevation="8" class="pa-3 pt-3 pb-3 mt-2">
                    <v-layout class="d-flex flex-row wrap justify-start">
                        <v-sheet :key="color" v-for="color in extraColors" tile width="130" height="40" :elevation="2"
                                 :color="color"
                                 class="ma-1 d-flex justify-center align-center"
                                 @click="selectExtraColor(color)"
                                 style="cursor: pointer">
                            <v-icon v-if="extraColor==color" color="white">
                                mdi-check-bold
                            </v-icon>
                            <span style="color: white;" class="font-weight-bold">{{color}}</span>
                        </v-sheet>
                    </v-layout>
                </v-sheet>
            </v-tab-item>
            <v-tab-item>
                <v-color-picker @input="selectExtraColor" class="ma-2" show-swatches></v-color-picker>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
    export default {
        name: "ColorPicker",
        props: ["value"],
        data() {
            return {
                currentStandColor: "red",
                extraColor: 'red',
                standColors: ["red", "pink", "purple", "deep-purple", "indigo", "blue", "light-blue",
                    "cyan", "teal", "green", "light-green", "lime", "yellow", "amber", "orange", "deep-orange", "brown",
                    "blue-grey", "grey"]
            }
        },
        computed: {
            extraColors() {
                let colors = [];
                colors.push(this.currentStandColor);
                for (let i = 1; i <= 5; ++i) {
                    colors.push(this.currentStandColor + ' lighten-' + i);
                }
                for (let i = 1; i <= 4; ++i) {
                    colors.push(this.currentStandColor + ' darken-' + i);
                }
                for (let i = 1; i <= 4; ++i) {
                    colors.push(this.currentStandColor + ' accent-' + i);
                }
                return colors;
            }
        },
        methods: {
            selectStandColor(color) {
                this.currentStandColor = color;
                this.extraColor = color;
                this.$emit('input',color);
            },
            selectExtraColor(color) {
                this.extraColor = color.hexa;
                this.$emit('input',color.hexa);
            }
        }
    }
</script>

<style scoped>

</style>