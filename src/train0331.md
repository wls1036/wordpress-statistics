---
marp: true
paginate: true
---

# 性能优化技术分享

- AWR报告导出和简单分析
- 执行计划查看和分析
- SQL性能问题排查
- 业务代码优化
- 操作系统性能查看和分析
- JVM性能查看和分析

---

# AWR导出

``` bash
# su - oracle
$ sqlplus / as sysdba

SQL> @?/rdbms/admin/awrrpt.sql

SQL> 选择天数

SQL> 选择开始快照

SQL> 选择结束快照

```

> @：执行sql命令 
> 
> ?：$ORACLE_HOME

---

# AWR分析 - DB Time

```text
DB Time =
------------------------------->
                |              |
DB Wiat Time+   |              |
--------------->|              |
                |              |
                | DB CPU Time  |
                |-------------->
```
> DB Wiat Time：非空闲等待
> 
> DB CPU Time：数据库运算

---
# AWR分析 - DB Time

![w:500](https://zhengjianfeng.cn/images/CY1ZOnk09eQhlaFnKhtNizC5hCWhLtFP.jpg) ![w:600](https://zhengjianfeng.cn/images/gVkOv72MnShhKhTYx8bHLrB1THoWnFtr.jpg)

---
# AWR分析 - SQL 统计

![w:800](https://zhengjianfeng.cn/images/MnFjnzh7XF4zqwmJx9uY3Uq0knjuUhim.jpg)

---
<!-- header: 执行计划查看和分析--->


---

# SQL优化 - 场景介绍

![w:700](https://zhengjianfeng.cn/images/12Jaki6hjqE9RylkVLiKFfbxfJw5RAK1.jpg)