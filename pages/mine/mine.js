//mine.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
const user = AV.User.current();
var app = getApp()
Page({
  data: {
    userInfo: null,
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    count: {
      works: 0,
      likes: 0,
      follower: 0
    },
    info: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      isLogin: true,
      page: 1,
      count: 10,
      total: 0,
      hidden: true
    },
    nodata: false,
    isLoading: false
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })

  },
  toLike: function (e) {
    var uid = e.currentTarget.dataset.id;
    console.log('uid');
    var that = this;
    if (that.data.count.likes == 0) {
      //return false;
    }
    wx.navigateTo({
      url: '../like/like?uid=' + uid
    });
  },
  onPullDownRefresh: function (e) {
    var that = this;
    wx.stopPullDownRefresh();
    console.log(e);
    that.initData();
  },
  onReachBottom: function (e) {
    var that = this;
    if (!that.data.nodata) {
      that.loadData();
    }

  },
  login: function () {
    var that = this;
    console.log('登录')
    if (wx.getSetting) {
      console.log('getSetting')
      wx.getSetting({
        success(res) {
          console.log(res)
          if (!res['authSetting']['scope.userInfo']) {
            wx.openSetting({
              success: (res) => {
                console.log('authorize')
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    app.authorize(function (user) {
                      console.log(user);
                      that.initData();
                    })
                  },
                  fail() {
                    console.log('authorize failed')
                  }
                })
              }
            })

          }else{
            app.login(function (user) {
              console.log(user);
              that.initData();
            }, function (errMsg) {
              if (errMsg == 'getUserInfo:fail auth deny') {
                wx.showModal({
                  title: '提示',
                  content: '在设置页面授权获取用户信息，再点刷新页面',
                  confirmText: '我知道了',
                  showCancel: false
                })
              } else {
                console.log(errMsg)
              }

            })
          }
        }
      })
    } else {
      console.log('login')
      app.login(function (user) {
        console.log(user);
        that.initData();
      }, function (errMsg) {
        if (errMsg == 'getUserInfo:fail auth deny') {
          wx.showModal({
            title: '提示',
            content: '在设置页面授权获取用户信息，再点刷新页面',
            confirmText: '我知道了',
            showCancel: false
          })
        } else {
          console.log(errMsg)
        }

      })

    }


  },
  loadData: function () {
    var that = this;
    if (that.data.info.hasMore) {
      if (!that.data.isLoading) {
        that.setData({ 'isLoading': true });
        var param = { 'id': app.globalData.user.objectId, page: that.data.info.page };
        AV.Cloud.run('works', param).then(function (result) {
          console.log('加载第' + that.data.info.page + '页数据');
          // 调用成功，得到成功的应答 data
          console.log(result)
          if (result.code == 200) {
            that.setData({
              'isLoading': false,
              'loading.hidden': true,
              'info.hasMore': result.hasMore,
              'info.list': that.data.info.list.concat(result.data),
              'info.hidden': false,
              'info.page': that.data.info.page + 1
            })

          } else {
            that.setData({ 'isLoading': false })
          }

        }, function (err) {
          // 处理调用失败
          that.setData({ 'isLoading': false })
        });

      }

    } else {
      console.log('no more data');
    }
  },
  initData: function () {
    var that = this;
    var initParam = {
      loading: {
        hidden: false
      },
      count: {
        works: 0,
        likes: 0,
        follower: 0
      },
      info: {
        list: [],
        hasMore: true,
        hasRefesh: true,
        isLogin: true,
        page: 1,
        hidden: true
      },
      nodata: false,
      isLoading: false
    }
    that.setData(initParam);
    if (!app.globalData.user || !app.globalData.user.nickName) {
      console.log('还没有授权');
      that.setData({
        'info.isLogin': false,
        'loading.hidden': true,
        'info.hidden': false
      })
      return false;
    }
    wx.setNavigationBarTitle({
      title: app.globalData.user.nickName
    });
    var param = { 'id': app.globalData.user.objectId };
    AV.Cloud.run('profile', param).then(function (result) {
      console.log('获取首页数据');
      // 调用成功，得到成功的应答 data
      console.log(result)
      if (result.code == 200) {
        that.setData({
          'info.isLogin': true
        })
        if (result.count.works == 0) {
          that.setData({
            'userInfo': app.globalData.user,
            'loading.hidden': true,
            'nodata': true,
            'count': result.count,
            'info.hasMore': true,
            'info.hidden': false
          })
        } else {
          that.setData({
            'userInfo': app.globalData.user,
            'count': result.count,
            'loading.hidden': true,
            'nodata': false,
            'count': result.count,
            'info.list': that.data.info.list.concat(result.works.data),
            'info.hidden': false,
            'info.hasMore': result.works.hasMore,
            'info.page': that.data.info.page + 1
          })
        }

      }

    }, function (err) {
      // 处理调用失败
    });


  },
  onLoad: function () {
    console.log('生命周期:mine-load')
    var that = this;
    //数据加载
    this.initData();
  },
  onReady: function () {
    console.log('生命周期:mine-ready');
  },
  onShow: function () {

    console.log('生命周期:mine-show');
  },
  onHide: function () {
    console.log('生命周期:mine-hide');
  },
  onUnload: function () {
    console.log('生命周期:mine-unload');
  }
})
