//app.js
const AV = require('./utils/av-weapp-min.js');
const Movie = require('./model/movie');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    AV.init({
      appId: '7C7MfP24LboNSLeOnbh112nT-gzGzoHsz',
      appKey: 'QAwTrD7mT1YVP60T8kdX8xwI',
    });
    
  },
  onShow: function (options) {
    console.log("app show");
    console.log(options);
  },
  onHide: function (options) {
    console.log("app hide");
  },
  onError: function (msg) {
    console.log(msg);
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null,
    slogan: {word: '拾起时光中最美的感动',hidden: false}
  }
})