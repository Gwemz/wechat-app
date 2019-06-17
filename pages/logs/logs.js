//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/wxopen/template/library/list?access_token=ACCESS_TOKEN',
    //   data: {
    //     "access_token":'ACCESS_TOKEN',
    //     "offset": 0,
    //     "count": 5
    //   },
    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function (res) {
    //     // success
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })

    // wx.getSetting({
    //   success(res) {
    //     // if(!res.authSetting['scope.userInfo']){
    //     //   wx.authorize({
    //     //     scope:'scope.userInfo',
    //     //     success(res){
    //     //       console.log(res);
    //     //     }
    //     //   })
    //     // }
    //     // if (!res.authSetting['scope.record']) {
    //     //   wx.authorize({
    //     //     scope: 'scope.record',
    //     //     success() {
    //     //       // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //     //       wx.startRecord()
    //     //     }
    //     //   })
    //     // }

    //   }
    // })

    wx.login({
      success: function (res) {
        // success
        console.log(res);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getPhoneNumber: function (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }
})
