//music.js
//获取应用实例
var util = require('../../utils/util.js');
const getMusicListUrl = require('../../config').getMusicListUrl;
var app = getApp()
Page({
  data: {
    motto: '欢迎回来，',
    userInfo: {},
    loading: {
      hidden: false
    },
    cates: ["台词","感悟","人物"],
    musics: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      page: 1,
      count: 20,
      hidden: true
    }
  },
  upper: function (e) {
    console.log(e);
  },
  lower: function (e) {
    console.log(e);
  },
  scroll: function (e) {
    console.log(e)
  },
  onLoad: function () {
    console.log('生命周期:music-load')
   var that = this;
    wx.request({
      url: getMusicListUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        if (result.statusCode == 200) {
          that.setData({
            'loading.hidden': true,
            'musics.list': that.data.musics.list.concat(result.data.data),
            'musics.hidden': false
          })

        }
        console.log('request success', result)
      },

      fail: function ({errMsg}) {
        console.log('request fail', errMsg)
      }
    })
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady: function() {
    console.log('生命周期:music-ready');
  },
  onShow: function() {
    
    console.log('生命周期:music-show');
  },
  onHide: function() {
    console.log('生命周期:music-hide');
  },
  onUnload: function() {
    console.log('生命周期:music-unload');
  }
})
