//index.js
//获取应用实例
var util = require('../../utils/util.js');
const getMovieListUrl = require('../../config').getMovieListUrl;
var app = getApp()
Page({
  data: {
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [{ "id": "1", "name": "台词" }, { "id": "2", "name": "感悟" }, { "id": "3", "name": "人物" }],
    movies: {
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
    console.log('生命周期:index-load')
    util.sayHello('summer');
    var that = this;
    wx.request({
      url: getMovieListUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        if (result.statusCode == 200) {
          that.setData({
            'loading.hidden': true,
            'movies.list': that.data.movies.list.concat(result.data.data),
            'movies.hidden': false
          })

        }
        console.log('request success', result)
      },

      fail: function ({errMsg}) {
        console.log('request fail', errMsg)
      }
    })
    //模拟数据加载

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);

    })
  },
  onReady: function () {
    console.log('生命周期:index-ready');
  },
  onShow: function () {

    console.log('生命周期:index-show');
  },
  onHide: function () {
    console.log('生命周期:index-hide');
  },
  onUnload: function () {
    console.log('生命周期:index-unload');
  }
})
