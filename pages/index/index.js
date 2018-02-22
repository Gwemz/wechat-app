//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    showRating: false,
    showWish: false,
    acquiredSelected: false,   // 精选榜单只请求一次
    inTheaters: {},   //影院热映
    comingSoon: {},   //精选榜单
    top250: {},   //豆瓣Top250
    weekly: {},   //口碑榜
    newMovie: {},   //新片榜
    usBox: {}    //票房榜
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    // 页面初始化，options为页面跳转所带过来的参数
    var inTheatersURL = app.globalData.doubanBase + app.globalData.inTheaters + "?start=0&&count=10";
    var comingSoonURL = app.globalData.doubanBase + app.globalData.comingSoon + "?start=0&&count=10";

    console.log(inTheatersURL, comingSoonURL);

    this.getMovieListData(inTheatersURL, "inTheaters", "影院热映");
    this.getMovieListData(comingSoonURL, "commingSoon", "精选榜单");
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    });
    var that = this;
    // 请求电影数据
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "content-type": "json"
      }, // 设置请求的 header
      success: function (res) {
        // success
        var data = res.data;
        // 组装电影数据
        that.processMovieListData(data, settedKey, categoryTitle)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  // 处理电影数据
  processMovieListData: function (data, settedKey, categoryTitle) {
    var movies = [];
    for(let idx in data.subjects){
      var subject = data.subjects[idx];
      var showRating = false;
      var showWish = false;
      if('inTheaters' == settedKey){
        showRating = true;
        showWish = false;
      }else{
        showRating = true;
        showWish = false;
      }
      var temp = {
        id: subject.id,
        title: subject.title,
        rating:subject.rating,
        collect_count:subject.collect_count,
        images:subject.images,
        subtype:subject.subtype,
        directors:subject.directors,
        casts:subject.casts,
        year:subject.year,
        showRating:showRating,
        showWish:showWish
      };
      movies.push(temp);
    };
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle : categoryTitle,
      movies:movies
    };
    console.log(readyData);
    this.setData(readyData);
  },
  // 滑动屏幕
  handleTouchMove:function(event){
    var offsetTop = event.target.offsetTop;
    console.log('handleTouchMove offsetTop:' + offsetTop);
    if(offsetTop > 10 && !this.data.acquiredSelected){
      this.getSelectedListData();
    }
  }
})
