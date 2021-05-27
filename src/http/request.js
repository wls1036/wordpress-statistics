import store from '@/store/'
import axios from 'axios'
import apis from './apis'
import envConfig from '@/config/'
// import _ from 'lodash'
// import {formatTime} from '../util/tz'

axios.timeout = 1500;

// request拦截器
axios.interceptors.request.use(config => {
    // const request = _.cloneDeep(config);
    // formatTime(request.data, 'request')
    // formatTime(request.params, 'request')
    return config
}, error => {
    Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(
    response => {
        // const res = response.data
        // formatTime(res.data, 'response');
        return response;
    },
    error => {
        return Promise.reject(error)
    }
)

const http = {
    apis: mapApi(apis),
    store: store,
    axios: axios,
    request(api, data, http) {
        var {params, body, headers, method, returnFullResponse, responseType} = http == undefined ? {} : http;
        //1.获取接口对象
        //2.初始化参数，设置页面加载参数和动作加载参数
        //3.根据设置的方法发起对应的方法请求
        let requestInfo = getRequestInfo(api, this.apis, method);
        setLoadingState(requestInfo.type, true, requestInfo);
        var requestParam = params == undefined ? {} : params;
        var requestData = body == undefined ? {} : body;
        returnFullResponse = returnFullResponse == undefined ? false : returnFullResponse;
        data = data == undefined ? {} : data;
        if (requestInfo.method == "get") {
            requestParam = Object.assign(requestParam, data);
        }
        if (requestInfo.method == "post") {
            requestData = data;
        }
        if (requestInfo.mock) {
            requestInfo.method = 'get';
        }
        headers = getRequestHeader(headers);
        return new Promise((resolver, reject) => {
            this.axios({
                method: requestInfo.method,
                baseURL: requestInfo.baseURL,
                url: requestInfo.uri,
                responseType: responseType,
                params: requestParam,
                data: requestData,
                headers: headers
            }).then((response) => {
                setLoadingState(requestInfo.type, false, requestInfo);
                if (resolver) {
                    if (!returnFullResponse) {
                        resolver(response.data, response.data.data | response.data.table, response);
                    } else {
                        resolver(response);
                    }
                }
            }).catch((error) => {
                setLoadingState(requestInfo.type, false, requestInfo);
                errorHandle(error, requestInfo);
                if (reject) {
                    reject(error);
                }
            })
        })
    }
}

http.install = Vue => {
    Vue.prototype.$request = http
}

export default http

function mapApi(apis) {
    if (!apis || apis.length == 0) {
        return {};
    }
    let mapApis = {};
    apis.forEach(item => {
        mapApis[item.code] = item;
    });
    return mapApis;
}

function getRequestInfo(api, apiList, method) {
    let result = {
        baseURL: "/"
    };
    if (/^[\w|-|_]+$/g.test(api)) {
        result = apiList[api];
    } else {
        result.uri = api;
    }
    if (method) {
        result.method = method;
    }
    if (envConfig.baseURL) {
        result.baseURL = envConfig.baseURL;
    }
    if (result.uri.length > 7 && result.uri.substring(0, 7) == "http://" ||
        result.uri.length > 8 && result.uri.substring(0, 8) == "https://") {
        result.baseURL = "/";
    }
    if (envConfig.mock == true && result.mock == true) {
        result.baseURL = "/mock/";
        if (result.uri.indexOf(".json") == -1) {
            if (result.uri.indexOf("?") != -1) {
                result.uri = result.uri.replace("\\?", ".json?");
            } else {
                result.uri = result.uri + ".json";
            }
        }
    }
    if (result.method == undefined) {
        result.method = "get";
    }

    return result;
}

function getRequestHeader(header) {
    header = header || {};
    header = Object.assign(header, JSON.parse(localStorage.getItem("httpHeader") || "{}"));
    return header;
}

function setLoadingState(type, value, requestInfo) {
    var api = requestInfo;
    if (type == "query") {
        store.dispatch("setQueryLoading", {value, api});
    }
    if (type == "action") {
        store.dispatch("setActionLoading", {value, api});
    }
}

function errorHandle(error, api) {
    let msg = "服务请求错误,请联系管理员或稍后再试";
    if (error.message == "Network Error") {
        msg = "网络错误，请检查网络配置"
    } else {
        //生产不提示具体错误信息
        if (api) {
            msg = "<br/>接口"
            if (api.code) {
                if (api.title) {
                    msg = msg + "[<span style='color:yellow;font-weight:bolder'>" + api.code + "-" + api.title + "</span>]==>";
                } else {
                    msg = msg + "[<span style='color:yellow;font-weight:bolder'>" + api.code + "</span>]==>";
                }
            }
            msg += "(" + api.uri + ")出错<br/>";
            if (error.response) {
                msg = msg + "响应编码[<span style='color:yellow;font-weight:bolder'>" + error.response.status + "</span>]==>" + (error.response.statusText || "") + "<br/>"
                msg = msg + "[错误原因]==>" + (error.response.data == undefined ? error.message : JSON.stringify(error.response.data));
            }
        }
        if (process.env.NODE_ENV == 'prod' && api.errorMessage) {
            //如果是生产环境，提示自定义信息
            msg = api.errorMessage;
        }
    }
    store.dispatch("showMessage", {messageText: msg, messageType: "error"})
}
