//card.js
//获取应用实例
var util = require('../../../utils/util.js');
const AV = require('../../../utils/av-weapp-min.js');
const Template = require('../../../model/template');
var app = getApp()
Page({
  data: {
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    userInfo: {},
    info: {
      list: [],
      hidden: true
    },
    isLoading: false
  },
  toMovie: function (e) {
    wx.navigateTo({
      url: '/pages/search/movie/movie' 
    })
  },
  toBook: function (e) {
    wx.navigateTo({
      url: '/pages/search/book/book'
    })
  },
  toMusic: function (e) {
    wx.navigateTo({
      url: '/pages/search/music/music'
    })
  },
  toWord: function (e) {
    console.log("word")
    console.log(e)
    wx.navigateTo({
      url: '/pages/card/card'
    })
  },
  initData2: function () {
    var that = this;
    var cates = [{ 'title': '「 电影 」', 'description': '光影之间 品味感动', 'event': 'toMovie' },
      { 'title': '「 音乐 」', 'description': '旋律背后的文字最能打动人心', 'event': 'toMusic' },
      { 'title': '「 读书 」', 'description': '于墨香之中宁静心神', 'event': 'toBook' },
      { 'title': '「 独白 」', 'description': '总有那么一句话让你念念不忘', 'event': 'toWord' }]
    that.setData({
      'loading.hidden': true,
      'info.list': cates,
      'info.hidden': false
    })
  },
  initData:function(){
    var that = this;
    AV.Cloud.run('cates_v2').then(function (result) {
      console.log(result)
      if (result.code == 200) {
        that.setData({
          'loading.hidden': true,
          'info.list': result.data,
          'info.hidden': false
        })
      }
    }, function (err) {
      console.log(err.code)
    });
  },
  onLoad: function () {
    console.log('生命周期:card-load')
    var that = this;
    that.initData();
    util.showShareMenu();
  },
  onReady: function () {
    console.log('生命周期:card-ready');
  },
  onShow: function () {

    console.log('生命周期:card-show');
  },
  onHide: function () {
    console.log('生命周期:card-hide');
  },
  onUnload: function () {
    console.log('生命周期:card-unload');
  }
})
