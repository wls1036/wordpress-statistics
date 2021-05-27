<template>
    <v-container>
        <v-snackbar v-model="showMessage" top :timeout="messageType=='error'?20000:2000" :color="messageType"
                    multi-line>
            <v-btn icon @click="showMessage = false">
                <v-icon>close</v-icon>
            </v-btn>
<!--            <v-icon dark class="mr-2" v-if="messageType=='success'">check_circle</v-icon>-->
<!--            <v-icon dark class="mr-2" v-if="messageType=='error'">mdi-alert</v-icon>-->
<!--            <v-icon dark class="mr-2" v-if="messageType=='info'">mdi-information</v-icon>-->
<!--            <v-icon dark class="mr-2" v-if="messageType=='warning'">mdi-exclamation</v-icon>-->
            <v-container v-html="messageText" style="display: inline;" class="font-weight-bold"></v-container>
        </v-snackbar>
    </v-container>
</template>
<script>
    export default {
        name: "apm-app-message",
        data() {
            return {
                showMessage: false
            };
        },
        computed: {
            messageText: function () {
                return this.$store.getters.requestResponse.responseErrorMessage;
            },
            messageType: function () {
                if (this.$store.getters.requestResponse.responseCode) {
                    this.showMessage = true;
                }
                return this.$store.getters.requestResponse.responseCode;
            }
        }
    };
</script>