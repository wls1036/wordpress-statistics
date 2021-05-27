import Mock from 'mockjs'

const APM_PROJECT_QUERY = {
    code: "ok",
    total: 8,
    'table|8': [{
        projectName: '@ctitle(1,10)',
        'moduleCnt|1-100': 1,
        'apis|1-100': 1,
        projectDesc: '@ctitle(1,10)',
        createdDate:'@date'
    }]
}

const mockApi = {
    APM_PROJECT_QUERY
}

export default mockApi;