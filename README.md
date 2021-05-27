## 介绍

`wordpress-statistics`用于统计wordpress访问量，目前完成以下功能
- 登录
- 实时访问数据展示
- 文章访问排行
- 日访问统计

更多详细信息可以查看博文[我是如何在一天之内搭建wordpress博客分析平台](https://segmentfault.com/a/1190000040071670)

## 截图

- 实时访问数据

![实时访问数据](http://zhengjianfeng.cn/images/4ML9XNtJjk5vJedVfU66Hf1hkR8kFJJj.jpg)

- 文章访问排行

![文章访问排行](http://zhengjianfeng.cn/images/AHo4KUfWR9v2ApkaDgXaZ6l03yW5vmUH.jpg)

- 每日访问统计

![每日访问统计](http://zhengjianfeng.cn/images/tYkhsQtY5FfeN0kkEaCivcXokKNJzBSy.jpg)

## 安装

- 修改`src/config`下配置文件，修改`baseURL`为wordpress博客地址
- 拷贝php下所有文件到wordpress服务器php目录下

默认在php目录下创建文件夹`log`将代码上传到该目录下，如果代码不位于log下，需要修改`src/http/api.js`中接口地址

- 在wordpress数据库中执行`php/wp_statistic.sql`创建相关表
- 前端构建

```bash
# 本地运行
npm run serve
#构建
npm run build
```

## 系统访问

线上系统可访问，地址为[http://zhengjianfeng.cn/st/](http://zhengjianfeng.cn/st/)账号密码  `guest/guest`
