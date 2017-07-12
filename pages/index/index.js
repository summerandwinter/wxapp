//index.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [],
    info: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      page: 1,
      count: 10,
      total: 0,
      hidden: true
    },
    isLoading: false
  },
  more: function(e){
    wx.navigateTo({
      url: '/pages/selection/selection'
    })
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('点击卡片' + id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  onPullDownRefresh: function (e) {
    console.log('init')
    var that = this;
    wx.stopPullDownRefresh();
    //that.initData();
  },
  change: function (e) {
    var that = this;
    console.log(e);
    if (e.detail.current == 0) {
      that.setData({ 'isLoading': true, 'info.list': [] });
      AV.Cloud.run('index', {}).then(function (result) {
        if (result.code == 200) {
          that.setData({ 'info.list': result.data })
          setTimeout(() => {
            that.setData({ 'info.current': 1,'info.hidden': false, 'loading.hidden': true, 'isLoading': false });
          }, 3000);

        }
      }, function (err) {
        that.setData({ 'info.current': 1, 'info.hidden': false, 'loading.hidden': true, 'isLoading': false });
        // 处理调用失败
      });
    }
  },
  initData: function () {
    var that = this;
    var initParam = { loading: { hidden: false }, info: { list: [], hidden: true }, sLoading: false }
    that.setData(initParam);
    var page = that.data.info.page;
    var data = { 'page': page }
    AV.Cloud.run('index', data).then(function (result) {
      // 调用成功，得到成功的应答 data
      console.log(result)
      if (result.code == 200) {
        that.setData({ 'info.list': result.data})
        that.setData({ 'info.current': 1, });
        setTimeout(() => {
          that.setData({ 'info.hidden': false, 'loading.hidden': true });
        }, 600);

      }
    }, function (err) {
      // 处理调用失败
    });
  },
  onLoad: function (options) {
    console.log('生命周期:index-load')
    var scene = options.scene
    if (scene && scene.length > 0) {
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + scene
      })
    }

    var that = this;
    this.initData();
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
