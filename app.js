//app.js
const AV = require('./utils/av-weapp-min.js');
const Movie = require('./model/movie');
App({
  onLaunch: function (data) {
    console.log(data)
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    AV.init({
      appId: '7C7MfP24LboNSLeOnbh112nT-gzGzoHsz',
      appKey: 'QAwTrD7mT1YVP60T8kdX8xwI',
    });
    var that = this;
    AV.User.loginWithWeapp().then(user => {
      that.globalData.user = user.toJSON();
      console.log(that.globalData.user);
      // 获得当前登录用户
      var user = AV.User.current();
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({userInfo}) => {
          // 更新当前用户的信息
          user.set(userInfo).save().then(user => {
            // 成功，此时可在控制台中看到更新后的用户信息
            that.globalData.user = user.toJSON();
            console.log(that.globalData.user)
          }).catch(console.error);
        }
      });
    }).catch(console.error);

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
    slogan: { word: '拾起时光中最美的感动', hidden: false }
  }
})