import store from '@/store/'
const minxin = {
    apmStore: store,
    computed: {
        queryLoading() {
            return this.$store.getters.queryLoading;
        },
        actionLoading() {
            return this.$store.getters.actionLoading;
        },
        loading() {
            return this.$store.getters.loading;
        }
    }
}


export default minxin