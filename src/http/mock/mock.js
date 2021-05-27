/**
 * mock条件
 * 1. 非生产(prod)环境
 * 2. 在envConfig里配置里 mock=true
 * 3. 在mockdata里有以该接口code的mock数据
 * 
 * 关闭mock方式
 * 1. 生产环境自动关闭
 * 2. 在envConfig里配置里 mock=false
 * 3. 删除mockdata里的mock数据
 * 4. 手动设置api.mock=false
 */

import { mock } from 'mockjs';
import apis from '@/http/apis.js';
import envConfig from '@/config/'
import mockApi from './mockdata'

var openMock = envConfig.mock || false;
//生产环境禁止开启mock
if (process.env.NODE_ENV == 'prod' || !apis) {
    openMock = false;
}
if (openMock) {
    apis.forEach(item => {
        var bok = item.mock == undefined ? openMock : item.mock;
        bok = openMock && bok && mockApi[item.code] != undefined;
        if (bok) {
            let uri = item.uri;
            if (uri.substring(0, 1) != '/') {
                uri = "/" + uri;
            }
            mock(uri, mockApi[item.code]);
        }
    });
}