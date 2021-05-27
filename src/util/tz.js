import moment from 'moment-timezone'

/**
 * 时区转换
 * @param date
 * @param tzString
 * @param locale
 * @returns {string | never}
 */
function convertTZ(time, tzString,) {
    let temp = moment.tz(time, tzString).format('YYYY-MM-DD HH:mm:ss')
    return temp
}

/**
 *
 * @param data
 * @param tzString
 * @returns {string}
 */
function convertUTC(time, tzString) {
    if (typeof time === 'string') {
        time = moment.tz(time, tzString).format()
    } else if (Object.prototype.toString.call(time) === '[object Array]') {
        for (let i = 0; i < time.length; ++i) {
            time[i] = moment.tz(time[i], tzString).format()
        }
    }
    return time
}

/***
 * 对象類型的时间字段处理
 * @param data
 * @param interceptorType
 * @constructor
 */
function formatTimeForObject(data, interceptorType) {
    let u = JSON.parse(localStorage.getItem("profile"));
    let tzString = 'zh-CN';
    if (u) {
        tzString = u.timezone;
    }
    for (let item in data) {
        if (data[item] !== null && (item.toLocaleLowerCase().endsWith('date') || item.toLocaleLowerCase().endsWith('time'))) {
            if (interceptorType === 'response') {
                data[item] = convertTZ(data[item], tzString)
            } else {
                data[item] = convertUTC(data[item], tzString)
            }
        }
    }
    return data
}

/***
 * 数组类型的时间字段处理
 * @param data
 * @param interceptorType
 * @constructor
 */
function formatTimeForArray(data, interceptorType) {
    data.forEach(item => {
        let type = Object.prototype.toString.call(item)
        switch (type) {
            case '[object Object]':
                item = new formatTimeForObject(item, interceptorType)
                break
            case '[object Array]':
                item = new formatTimeForArray(item, interceptorType)
                break
        }
    })
    return data
}

/***
 * 格式化时间
 * @param data
 * @param interceptorType
 */
export function formatTime(data, interceptorType) {
    if (!data) {
        return;
    }
    let type = Object.prototype.toString.call(data)
    switch (type) {
        case '[object Object]':
            data = new formatTimeForObject(data, interceptorType)
            break
        case '[object Array]':
            data = new formatTimeForArray(data, interceptorType)
            break
        default:
            break
    }
    return data
}
