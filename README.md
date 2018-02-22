# wechat-app

### 微信小程序案例

应用是最好的学习方式，决定学习微信小程序，最好的方式便是找一个案例做练习  选择豆瓣电影，是因为其公开的API

*2018/2/22*
于是乎，找一个示例，项目便开始了... (项目大体成型之后，代码后续开源)

微信小程序版豆瓣电影： https://github.com/bruintong/wechat-webapp-douban-movie

豆瓣电影API文档： https://developers.douban.com/wiki/?title=movie_v2

但是，微信小程序无法调用豆瓣接口，替代接口为：https://douban.uieee.com (不能过于频繁访问)

#### 报错：https://douban.uieee.com 不在以下 request 合法域名列表中

解决方法: 详情 -》 (勾选) 不校验安全域名、web-view 域名、TLS 版本以及 HTTPS 证书