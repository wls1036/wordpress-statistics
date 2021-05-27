const apis = [
    {
        code: "APP_LOGIN",
        uri: 'log/login.php',
        method: 'get',
        mock: false,
        errorMessage: "登录失败",
        type: "query",
        title: "登录"
    },
    {
        code: "REALTIME_QUERY",
        uri: "log/realtime.php",
        method: "get",
        mock: false,
        errorMessage: "查询失败",
        type: "query",
        title: "查询实时数据"
    },
    {
        code: "SUMMARY_QUERY",
        uri: "log/summary.php",
        method: "get",
        mock: false,
        errorMessage: "查询失败",
        type: "query",
        title: "查询实时数据"
    },
    {
        code: "DAY_QUERY",
        uri: "log/day.php",
        method: "get",
        mock: false,
        errorMessage: "查询失败",
        type: "query",
        title: "查询实时数据"
    }
]

export default apis;

export const API = {
    APP_LOGIN: "APP_LOGIN",
    REALTIME_QUERY: "REALTIME_QUERY",
    SUMMARY_QUERY: "SUMMARY_QUERY"
};
