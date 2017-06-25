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
  initData: function () {
    var that = this;

  },
  onLoad: function () {
    console.log('生命周期:card-load')
    var that = this;
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
