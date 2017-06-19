//app.js
const AV = require('./utils/av-weapp-min.js');
const Movie = require('./model/movie');
App({
  onLaunch: function (data) {
    console.log(data)
    AV.init({
      appId: '7C7MfP24LboNSLeOnbh112nT-gzGzoHsz',
      appKey: 'QAwTrD7mT1YVP60T8kdX8xwI',
    });
    var that = this;
    //that.login();
    if (data && data.scene && data.scene.toLocaleString.length == 24) {
      wx.navigateTo({
        url: 'pages/detail/detail?id=' + data.scene.toLocaleString
      })
    }
    if (data && data.query && data.query.scene && data.query.scene.length == 24) {
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
  authorize: function (sccuess_func, fail_func) {
    //需要用户详细信息时调用
    var that = this
    AV.User.loginWithWeapp().then(user => {
      that.globalData.user = user.toJSON();
      console.log('登录')
      console.log(that.globalData.user);
      // 获得当前登录用户
      var user = AV.User.current();
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({userInfo}) => {
          //没有授权过 更新当前用户的信息
          if (!user.attributes.avatarUrl) {
            user.set(userInfo).save().then(user => {
              // 成功，此时可在控制台中看到更新后的用户信息
              that.globalData.user = user.toJSON();
              typeof sccuess_func == "function" && sccuess_func(that.globalData.user)
              console.log('授权获取用户信息')
              console.log(that.globalData.user)
            }).catch(console.error);
          }

        },
        fail: ({errMsg}) => {
          console.log("授权失败");
          console.log(errMsg);
          if (errMsg == 'getUserInfo:fail auth deny') {
            console.log('获取用户信息权限未授权，重新发起授权');
            wx.getSetting({
              success(res) {
                if (!res['authSetting']['scope.userInfo']) {
                  wx.openSetting({
                    success: (res) => {
                      console.log('用户授权')
                      wx.authorize({
                        scope: 'scope.userInfo',
                        success(res) {
                          console.log(res);
                          that.authorize(sccuess_func, fail_func);
                        },
                        fail(res) {
                          typeof fail_func == "function" && fail_func(res);
                          console.log('重新发起授权失败')
                        }
                      })
                    }
                  })

                } else {
                  that.authorize(sccuess_func, fail_func);
                }
              }
            })
          } else {
            typeof fail_func == "function" && fail_func(errMsg);
          }
        }
      });
    }).catch(console.error);
  },
  login: function (sccuess_func, fail_func) {
    //需要用户登录时调用
    var that = this
    AV.User.loginWithWeapp().then(user => {
      that.globalData.user = user.toJSON();
      console.log('登录')
      console.log(that.globalData.user);
      // 获得当前登录用户
      var user = AV.User.current();
      console.log('数据库中的user');
      console.log(user);
      // 调用小程序 API，得到用户信息
      wx.getUserInfo({
        success: ({userInfo}) => {
          //没有授权过 更新当前用户的信息
          if (!user.attributes.avatarUrl) {
            user.set(userInfo).save().then(user => {
              // 成功，此时可在控制台中看到更新后的用户信息
              that.globalData.user = user.toJSON();            
              console.log('授权获取用户信息')
              console.log(that.globalData.user)
            }).catch(console.error);
          }
          typeof sccuess_func == "function" && sccuess_func(that.globalData.user)
        },
        fail: ({errMsg}) => {
          typeof fail_func == "function" && fail_func(errMsg)
        }
      });
    }).catch(console.error);

  },
  globalData: {
    userInfo: null,
    slogan: { word: '拾起时光中最美的感动', hidden: false }
  }
})