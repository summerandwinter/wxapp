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
    that.getUserInfo();
    if(data.scene.toLocaleString.length == 24){
      wx.navigateTo({
        url: 'pages/detail/detail?id=' + data.scene.toLocaleString
      })
    }
    //console.log(data.query.scene.length);
    if (data.query.scene && data.query.scene.length == 24) {
      wx.navigateTo({
        url: 'pages/detail/detail?id=' + data.query.scene
      })
    }

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
    if (that.globalData.user) {
      typeof cb == "function" && cb(that.globalData.user)
    } else {
      AV.User.loginWithWeapp().then(user => {
        that.globalData.user = user.toJSON();
        console.log('login in')
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
              typeof cb == "function" && cb(that.globalData.user)
              console.log('get user info')
              console.log(that.globalData.user)
            }).catch(console.error);
          },
          fail:({data})=>{
            typeof cb == "function" && cb(that.globalData.user)
          }
        });
      }).catch(console.error);
    }
  },
  globalData: {
    userInfo: null,
    slogan: { word: '拾起时光中最美的感动', hidden: false }
  }
})