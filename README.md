# 道格学社

[知识管理训练营](https://mp.weixin.qq.com/s/2VzC1RMzwLij4NMaJm3EoQ)感谢每一位同学们的贡献！因为你们，Zotero会在中文世界会爆发出难以估量的潜力。我们每位学员知识与情报管理方式、智识生产的效率会发生天翻地覆的变化。

> 知识的岛屿越大，无知的海岸线越长

我们的愿景是：群策群力，教学相长，**共建、共用中文世界最顶级的信息源。**

祝Zotero官方早日合并诸位的代码。

- 致谢：01期学员[Felix](https://github.com/xuwd/translators)、02期学员[018](https://github.com/018/translators)、3期学员五弦琴。感谢他们贡献的脚本、插件和工具。

## A 课程核心资源与工具列表


1. **Translators**

| 序号 |<span style="white-space:nowrap;">Translator&nbsp;&nbsp;&nbsp;&nbsp;</span> | <span style="white-space:nowrap;">贡献者&nbsp;&nbsp;</span> | 备注 |
| ---- | ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | douban.js           | [Felix](https://github.com/xuwd)/[018](https://github.com/018) | 支持「[豆瓣](https://www.douban.com/)」标签下的图书批量抓取，图书评分/评价人数抓取，抓取框显示评分/评价人数（√ ），豆瓣电影单抓和批量，支持短标题，支持抓取CLC分类（需要配合油猴）等 |
| 2    | BiliBili.js         | [Felix](https://github.com/xuwd)                 | 支持「[B站](https://www.bilibili.com/)」视频单抓和批量，元数据包含：摘要、集数、节目名称、时长。<br />支持「[B站](https://www.bilibili.com/)」Bangumi内纪录片单抓和批量，元数据包含：摘要、集数、节目名称、时长 |
| 3   | Ncpssd.js           | [018](https://github.com/018) | 支持「[国家哲学社会科学文献中心](http://www.ncpssd.org/)」论文题录与PDF的单抓和批量 |
| 4   | Superlib.js         | [018](https://github.com/018/translators) | 支持「[全国图书馆参考咨询联盟](http://www.ucdrs.superlib.net/)」图书、会议论文、学位论文、期刊、专利。支持单抓和批量。批量抓取可能会失败，可以单抓或隔几个小时试试 |
| 5   | cnki.js             | [018](https://github.com/018) | 适配[中国知网](https://www.cnki.net/)改版页面，合并中文姓、名为创建者。获取知网引用数，显示在其他栏。 |
| 6 | Nlc.cn.js | [018](https://github.com/018) | 注册[国家图书馆](http://read.nlc.cn/outRes/outResList?type=%E6%A0%87%E5%87%86%E4%B8%93%E5%88%A9)之后，可以下载「中国标准在线服务网」内的国家标准 |
| 7. | Spc.org.cn.js | [018](https://github.com/018) | 抓取[中国标准在线服务网](https://www.spc.org.cn/index)元数据 |
| 8. | jd.js | [018](https://github.com/018) | [京东](https://book.jd.com/)图书条目抓取 |
| 9. | dangdang.js | [018](https://github.com/018) | [当当](http://book.dangdang.com/)图书条目抓取 |
| 10. | uRead.js | [018](https://github.com/018) | [今日优读](http://uread.today/)数据抓取 |

2. **Tampermonkey脚本**

| 序号 | 脚本下载地址 | 贡献者 | 备注 |
| ---- | ------------------------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------ |
| 1    | [豆瓣中图分类法](https://greasyfork.org/zh-CN/scripts/408682) | [018](https://github.com/018/translators) | 如果存在中图分类，则会在豆瓣信息栏中多显示如“中图分类: B842.1 (B84 心理学 ▸ B842 心理过程、心理状态 ▸ B842.1 认知)”，方便对图书进行分类。 |
| 2    | [全图联盟](https://greasyfork.org/zh-CN/scripts/408790-) | [018](https://github.com/018/translators) | 下载DPF少操作一步，「文章下载」替换成「PDF下载」，点击直接下载。也可辅助Zotero translator的Superlib.js，直接抓取PDF。增加图书的中图法分类功能。 |
| 3. | [知了](https://greasyfork.org/zh-CN/scripts/419901-%E7%9F%A5%E4%BA%86) | [018](https://github.com/018/translators) | 在知网页面跳转、直接阅读和下载「社科论文」。使用需要注册并登陆「[国家哲学社会科学学术期刊数据库（NSSD）](http://www.ncpssd.org/) 」 |

3. **Zotero插件**

| 序号 | 插件下载地址 |<span style="white-space:nowrap;">贡献者&nbsp;&nbsp;&nbsp;&nbsp;</span> | 备注                                                         |
| ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | [zotupdate](https://github.com/018/zotupdate)                | [018](https://github.com/018)                    | 1.更新：更新书籍的中图法及豆瓣评分(如果来源于douban)；<br />2.整理：整理并规则作者命名方式<br />3.拉目录：(如果来源于douban)拉目录作为笔记。<br />4.下载试读：尝试下载目录、序、试读的正文等。<br />5.下载电子书：尝试下载电子书。 |
| 2 | [zotcard](https://github.com/018/zotcard) | [018](https://github.com/018) | zotcard是一个快速写卡片，提供格式卡模板<br />1.提供六种预设格式卡：概念卡、人物卡、通用卡等，只需一步即可直接写卡。可自行调整<br />2.提个6个卡槽定制卡片内容，可自行调整。<br />3.可批量替换卡片内容<br />4.卡批量打开浮动编辑窗口，方便拼卡成文。 |
| 3. | [zoturead](https://github.com/018/zoturead) | [018](https://github.com/018) | [今日优读](http://uread.today)，帮助你更快学习。 <br />1、今日优读网站相关：刷新、收录、查看中图分类、学科、作者等信息、添加目录对比等等。 <br />2、搜索相关：通过今日优读搜索、Zotero本身搜索、豆瓣、全图书馆参考咨询联盟、京东、当当、百度、谷歌搜索。 <br />3、辅助工具：展开、收起，整理，修复中图分类号、修复学科号，根据学科号归档，定位书籍所在分类目录。 <br />4、自动新增学科目录。 <br />5、一键更新Translator。 |

4. 网页工具

| 序号 | 网页                            | <span style="white-space:nowrap;">贡献者&nbsp;&nbsp;&nbsp;&nbsp;</span> | 备注                                                         |
| ---- | ------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1    | [今日优读](http://uread.today/) | [018](https://github.com/018)                                | 1.快速目录对比<br />2.整合图书信息<br />3.提供电子书下载<br /> |

## B. 友情链接

| 序号 | 资源仓库                                                     | <span style="white-space:nowrap;">贡献者&emsp;&emsp;</span> | 备注                                                         |
| ---- | ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| 1    | [职业生涯拓荒营](https://github.com/gezhongran/KM-Career)    | 全体拓荒营学员                                              | 整理与职业资源，记录拓荒过程，日志、报告，构建小型的职业情报信息中心。 |
| 2    | [投资理财拓荒营](https://github.com/gezhongran/KM-Personal-Finance) | 全体拓荒营学员                                              | 整理与个人财务管理相关信息，记录拓荒过程，日志、报告，构建小型的职业情报信息中心。 |

## C.彩蛋资源

1. **豆列书单清单**

| 序号 | 以下豆列均由道格老师使用zotero进行图情分析和整理             |
| ---- | ------------------------------------------------------------ |
| 1    | [知识管理训练营专属礼物01（认知心理学）](https://www.douban.com/doulist/130393452/) |
| 2    | [知识管理训练营专属礼物02（图书馆情报学）](https://www.douban.com/doulist/130592882/) |
| 3    | [物理8.5](https://www.douban.com/doulist/129875523/    )     |
| 4    | [数学9.0](https://www.douban.com/doulist/129808399/    )     |
| 5    | [建筑/建筑史8.5]( https://www.douban.com/doulist/129807622/   ) |
| 6    | [人类学8.5](https://www.douban.com/doulist/130013462/ )      |
| 7    | [儿童文学9.0]( https://www.douban.com/doulist/130087268/  )  |
| 8    | [个人财务管理（金融、投资、理财）](https://www.douban.com/doulist/134957534/) |
| 9    | [个人理财、投资、金融（教材for目录对比）](https://www.douban.com/doulist/135952740/) |
| 10   | [职业生涯管理](https://www.douban.com/doulist/131340410/)    |

6. **优质信源清单**

| 类别     | 网址                                                         |
| -------- | ------------------------------------------------------------ |
| 搜索引擎 | [Magi](https://magi.com/)                                    |
| 集合搜索 | [一个开始](https://aur.one/)                                 |
| 导航网站 | [龙轩导航-做个有用的导航](http://ilxdh.com/)                 |
| RSS      | [公众号-瓦斯阅读（RSS订阅）](https://qnmlgb.tech/)           |
| RSS      | [公众号-WeRSS](https://werss.app/)                           |
| 关键词   | [XLore](https://xlore.org/)                                  |
| 关键词   | [术语在线](http://termonline.cn/index.htm)                   |
| 关键词   | [国家工程技术数字图书馆](https://netl.istic.ac.cn/site/home)-汉语主题词表 |
| 关键词   | [微词云](https://www.weiciyun.com/)                          |
| 论文下载 | [国家哲学社会科学文献中心](http://www.ncpssd.org/)           |
| 论文下载 | [谷歌学术镜像_Google学术搜索导航](https://ac.scmor.com/)     |
| 论文下载 | [Sci-Hub](https://sci-hub.se/)                               |
| 论文下载 | [You are Crossref（DOI）](https://www.crossref.org/)         |
| 论文下载 | [中国国家图书馆](http://read.nlc.cn/outRes/outResList?type=%E5%B7%A5%E5%85%B7%E4%B9%A6&urlType=extranet) |
| 论文下载 | [浙江省图书馆](https://www.zjlib.cn/)                        |
| 论文下载 | [广西壮族自治区图书馆](http://www.gxlib.org.cn/)             |
| 免费影视 | [电影狗](http://www.dianyinggou.com/)                        |
| 免费影视 | [茶杯狐 ](https://www.cupfox.com/)                           |
| 图书     | [全国图书馆参考咨询联盟](http://www.ucdrs.superlib.net/)     |
| 图书     | [WorldCat.org:世界上最大的图书馆目录](https://www.worldcat.org/) |
| 网盘搜索 | [凌风云 ](https://www.lingfengyun.com/)                      |
| 垂直搜索 | [豆列专搜-需要番茄上网](https://cse.google.com/cse?cx=009753591775599838256:0u2qhakyyb3) |
| 垂直搜索 | [B站专搜-需要番茄上网](https://cse.google.com/cse?cx=009753591775599838256:cajuod9wgd6) |
---
**欢迎关注公众号：**

![欢迎关注公众号](https://tva1.sinaimg.cn/large/007S8ZIlgy1ghqq4mtus1j3076076wey.jpg)

---

### changelog:

- 2021.08.18 更新Cnki.js，增加知网通配性，适配“cnki-net”的图书馆代理下载、添加今日优读

- 2021.08.08 添加ZotRead插件与uRead.js、更新优质信息源清单

- 2021.08.01 Douban.js更新，品牌与出版社拆分，如“万千心理|中国轻工业出版社”，“万千心理”被放入“版权”元数据

- 2021.07.15 更新使用说明、zotcard插件功能更新

- 2021.04.19 修复ncpssd.js获取PDF Bug与修复Jingdong.js批量抓取时显示图书条目Bug

- 2021.04.08 删除在线卡片制作工具

- 2021.03.25  知了 v0.2.0 更新：改为只搜索国家哲学社会科学学术期刊数据库。zotupdate v1.0.7更新：完善拉目录机制，默认找不到目录会从京东查找，京东没有时从当当上查找。（当当只能拉去一半的目录，得自己补全。）

- 2021.03.25 更新Jd.js和dangdang.js支持搜索时批量抓取，但当当批量时无法抓取摘要。

- 2021.03.24 添加Jd.js和dangdang.js当前支持图书条目单抓，添加资源清单

- 2021.02.20 添加理财拓荒营地址、更新其他资源

- 2021.02.13 添加新豆列

- 2021.01.19 修复Cnki.js的Bug

- 2021.01.09 添加「知了」脚本

- 2021.01.08 更新Cnki.js，可以获取知网的引用数

- 2021.01.07 合并bilibili.js与bilibili bangumi.js，原先两个translators的功能可以由一个bilibili.js完成

- 2020.12.28 添加Spc.org.cn.js，可以中国标准在线服务网元数据

- 2020.12.28 添加 nlc.cn.js，可以抓取国图内标准在线网的标准一级下载

- 2020.12.19 修复Douban.js的bug：当没有「展开全部时」，摘要部分抓取作者简介

- 2020.11.13 更新zotero插件zotcard资源

- 2020.10.27 更新zotero插件zotupdate资源

- 2020.09.09 添加CNKI.js：1.适配知网改版后的页面 2.合并显示中文作者的「姓与名」。更新douban.js:更新superlib.js:「存档位置」可以抓取中图法分类

- 2020.08.31 添加在线卡片制作工具

- 2020.08.24 添加优质信息源-国研网、中经网、国家图书馆、职级对标，新增豆列清单

- 2020.08.15 添加油猴superlib脚本，添加学员git仓库连接，彩蛋优质信息源整理，添加微词云

- 2020.08.14 创建仓库，添加初始资源

  



