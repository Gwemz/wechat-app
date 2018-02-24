# wechat-app

> 微信小程序开发文档

https://mp.weixin.qq.com/debug/wxadoc/dev/api/

> 小程序登录

https://mp.weixin.qq.com/

### 微信小程序案例

应用是最好的学习方式，决定学习微信小程序，最好的方式便是找一个案例做练习  选择豆瓣电影，是因为其公开的API

*2018/2/22*

于是乎，找一个示例，项目便开始了... (持续更新中...)

微信小程序版豆瓣电影： https://github.com/bruintong/wechat-webapp-douban-movie

豆瓣电影API文档： https://developers.douban.com/wiki/?title=movie_v2

但是，微信小程序无法调用豆瓣接口，替代接口为：https://douban.uieee.com (不能过于频繁访问,豆瓣电影接口，限定40次请求/分钟。如果运行时出现400错误，是请求过于频繁，稍等一会儿就好了。)

#### 报错：https://douban.uieee.com 不在以下 request 合法域名列表中

解决方法: 详情 -》 (勾选) 不校验安全域名、web-view 域名、TLS 版本以及 HTTPS 证书

*2018/2/23* 豆瓣数据取回来之后无法遍历

#### 尺寸单位
rpx(responsive pixel):可以根据屏幕宽度进行自适应。规定屏幕宽度为750rpx。如在iPhone6上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素， 1rpx = 0.5px = 1物理像素。

*2018/2/24*  

数据遍历问题已解决，起始于template组建中将一个字母拼错了  grid -> gird 找了几个小时发现是这问题。。。  :persevere:  :persevere:  :persevere:

#### template模板
is 
name

#### 参考资源

微信小程序开发资源汇总： https://github.com/justjavac/awesome-wechat-weapp