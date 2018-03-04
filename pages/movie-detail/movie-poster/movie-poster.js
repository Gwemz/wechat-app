// pages/movie-detail/movie-poster/movie-poster.js
var app = getApp();
Page({
    data:{

    },
    onLoad:function(options){
        // 页面初始化，options为页面跳转所带来的参数
        var that = this;
        var posterUrl = options.posterUrl;
        var readyData = {"posters":[posterUrl]};
        console.log(posterUrl,readyData);
        this.setData(readyData);
        that.setData({
            "windowWidth":app.globalData.windowWidth,
            "windowHeight":app.globalData.windowHeight
        })
    }
})