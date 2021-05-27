import store from '@/store/'

const message = {
    store: store,
    success(messageText) {
        this.store.dispatch("showMessage", { messageText, messageType: "success" });
    },
    error(messageText) {
        this.store.dispatch("showMessage", { messageText, messageType: "error" });
    },
    info(messageText) {
        this.store.dispatch("showMessage", { messageText, messageType: "info" });
    },
    warn(messageText) {
        this.store.dispatch("showMessage", { messageText, messageType: "warning" });
    }
}

message.install = Vue => {
    Vue.prototype.$message = message
}

export default message;