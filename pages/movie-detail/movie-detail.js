// pages/movie-detail/movie-detail.js
var app = getApp();
Page({
    data:{
        showAllDesc: false,
        movie:{}
    },
    onLoad:function(options){
        // 页面初始化，options为页面跳转所带来的参数
        var that = this;
        var id = options.id;
        var url = app.globalData.doubanBase + app.globalData.subject + id;
        console.log(url);
        wx.showToast({
            title: '加载中',
            icon:'loading',
            duration: 10000
        });
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {'content-type':'json'}, // 设置请求的 header
            success: function(res){
                // success
                var data = res.data;
                var readyData = {};
                var directorsAndCasts = [];
                console.log(data);
                for(let i in data.directors){
                    directorsAndCasts.push(data.directors[i]);
                }
                for(let j in data.casts){
                    directorsAndCasts.push(data.casts[j]);
                }
                var genres = "";
                var separate = "/";
                for(let k in data.genres){
                    genres += data.genres[k] + separate;
                }
                genres = genres.substring(0,genres.length - separate.length);
                console.log(genres);
                var countries = "国家：";
                for(let g in data.countries){
                    countries += data.countries[g] +separate;
                }
                countries = countries.substring(0,countries.length - separate.length);
                readyData["movie"] = {
                    id: data.id,
                    title: data.title,
                    images: data.images,
                    directorsAndCasts:directorsAndCasts,
                    collectCount:data.collect_count,
                    commentsCount:data.comments_count,
                    wishCount:data.wish_count,
                    reviewsCount:data.reviews_count,
                    countries:countries,
                    doCount:data.do_count,
                    genres:genres,
                    originalTitle:"原名："+ data.original_title,
                    rating:data.rating,
                    ratingsCount:data.ratings_count + "人",
                    subtype:data.subtype,
                    summary:data.summary,
                    shareUrl:data.share_url,
                    year:data.year
                };
                console.log(readyData);
                that.setData(readyData);
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
                wx.hideToast();
            }
        })
    },
    // 查看海报
    bindPoster: function(event){
        var posterUrl = event.currentTarget.dataset.posterUrl;
        wx.navigateTo({
            url: '/pages/movie-detail/movie-poster/movie-poster?posterUrl='+ posterUrl
        })
    },
    // 展开简介
    handleExtensiontap:function(event){
        var readyData = {
            "showAllDesc":true
        };
        this.setData(readyData);
    },
    // 用户点击想看
    handleWishtap:function(event){
        wx.showModal({
            title:'提示',
            content:'一起去看吧',
            success:function(res){
                if(res.confirm){
                    console.log('用户点击确定');
                }
            },
            showCancel: false
        })
    },
    // 用户点击看过
    handleDotap:function(event){
        var id = event.currentTarget.dataset.id;
        wx.navigateTo({
            url: '/pages/movie-detail/rating/rating?id='+id
        });
    },
    // 查看影人信息
    handleCelebrity:function(event){
        var id = event.currentTarget.dataset.id;
        var avatar = event.currentTarget.dataset.avatar;
        wx.redirectTo({
            url:'/pages/movie-detail/celebrity/celebrity?id='+id+'&&avatar='+avatar
        });
    }
})