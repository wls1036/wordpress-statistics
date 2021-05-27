---
marp: true
paginate: true
header: '**上海得帆信息技术有限公司**'
---

# 系统问题排查方法及工具

- 经验篇
- 工具篇
- 实战篇

---

<!-- header: 经验篇--->

# 对技术敏感性
- 遇到陌生技术名词要敏感
- 及时扫除知识盲区

---

# 学会利用互联网充电

- github
- oschina
- 掘金
- 微信公众号
- 微博([GitHubDaily](https://weibo.com/GitHubDaily?topnav=1&wvr=6&topsug=1))

---
# 保持技术热情

- 最好用的工具永远是自己写的
- 学习一个框架最好的方式就是看源码
- 把查看源码变成一个习惯

---

# 好记性不如烂笔头

- 笔记！！记下来才是属于你的
- 博客(纸蜂)，更详细的笔记
- 个人站点


---


# 抗压能力


---

<!-- header: 工具篇--->

# [Termius](termius) - 高颜值终端

![w:700](https://zhengjianfeng.cn/images/xncSpSDhe5b6K1QbHhfRAVxlDnpecriB.jpg)

---

# [insomnia](https://insomnia.rest/) - 比postman好用的接口测试工具

![w:700](https://insomnia.rest/static/main-ac0a1732afac19acce5ad6825595c3bb-f3479.webp)

---

# tcpdump - 抓包神器

```bash
tcpdump -i eth0 host 172.16.xx.xx -w sap.prap -Z root
```

---

# wireshark - 分析包神器

![w:600](https://cdn.ttgtmedia.com/digitalguide/images/Misc/WiresharkSS3_lg.png)

---

# [arthas](https://alibaba.github.io/arthas/) - 诊断神器

```bash
getstatic com.sap.conn.jco.rt.JCoRuntimeFactory runtime 'destinationManager'

monitor -c 5 com.sap.conn.jco.rt.JCoRuntimeFactory.runtime.PRD getFunctionTemplate

watch com.sap.conn.jco.rt.AbapRepository getFunctionTemplate "{this,returnObj}"  -x 2

watch oracle.tip.adapter.sap.outbound.SAPConnectionImpl getFunction "{params,returnObj==null}"  -x 2

trace oracle.tip.adapter.sap.outbound.SAPConnectionImpl getFunction

```

---

# 自己写的工具永远是最好用的

- 图床工具
- markdown转html工具
- markdown转sql工具

---

<!-- header: 实战篇--->

# [运维攻坚之幽灵JCO](http://pluto.definesys.com/home/paperBee/articleDetail?articleId=bf8bf6c5a12eea60)

---

# 谢谢！！