const app = {
    state: {
        queryLoading: false,
        actionLoading: false,
        loading: {},
        notifications: [],
        requestResponse: {},
        routerInfo: {}
    },
    mutations: {
        PAGE_LOADING: (state, { value, api }) => {
            state.queryLoading = value;
            state.loading[api.code] = value;
        },
        ACTION_LOADING: (state, { value, api }) => {
            state.actionLoading = value;
            state.loading[api.code] = value;
        },
        HTTP_RESPONSE: (state, { responseCode, responseErrorMessage }) => {
            //避免消息内容一样无法更新
            state.requestResponse = {};
            state.requestResponse.responseErrorMessage = responseErrorMessage;
            state.requestResponse.responseCode = responseCode;
        },
        //设置通知列表
        SET_NOTIFICATION: (state, notifications) => {
            state.notifications = notifications;
        }
    },
    actions: {
        setQueryLoading(context, { value, api }) {
            context.commit("PAGE_LOADING", { value, api });
        },
        setActionLoading(context, { value, api }) {
            context.commit("ACTION_LOADING", { value, api });
        },
        setHttpResponse(context, { responseCode, responseErrorMessage }) {
            context.commit("HTTP_RESPONSE", { responseCode, responseErrorMessage });
        },
        showMessage(context, { messageText, messageType }) {
            context.commit("HTTP_RESPONSE", { responseCode: messageType, responseErrorMessage: messageText });
        },
        setNotifications(context, notifications) {
            context.commit("SET_NOTIFICATION", notifications);
        }
    }
}
export default app;