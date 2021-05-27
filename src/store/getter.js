const states = {
    queryLoading: state => state.app.queryLoading,
    actionLoading: state => state.app.actionLoading,
    loading: state => state.app.loading,
    requestResponse: state => state.app.requestResponse,
    responseErrorMessage: state => state.app.responseErrorMessage,
    responseCode: state => state.app.responseCode,
    showMessage: state => state.app.showMessage,
    notifications: state => state.app.notifications,
    uid: state => state.user.uid,
    language: state => state.user.language,
    timeZone: state => state.user.timeZone
}
export default states