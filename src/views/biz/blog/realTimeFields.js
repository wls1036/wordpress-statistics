const realTimeFields = [
    {
        name: 'ip',
        code: 'ip',
        column: true,
        width: 150
    },
    {
        name: '访问时间',
        code: 'visit_time',
        column: true,
        width: 180
    },
    {
        name: '地区',
        code: 'location',
        column: true,
        defaultFilter: true,
        listFilter: true,
        width: 200
    },
    {
        name: '文章',
        code: 'title',
        listFilter: true,
        defaultFilter: true,
        column: true
    },
    {
        name: '引用',
        code: 'referrer',
        column: true,
        width: 150
    },
]
export default realTimeFields;