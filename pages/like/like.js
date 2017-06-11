//like.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
const getCardListUrl = require('../../config').getCardListUrl;
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
      hasMore: true,
      hasRefesh: true,
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
  onPullDownRefresh: function (e) {
    console.log(e);
    var that = this;
    wx.stopPullDownRefresh();
    that.initData();
  },
  onReachBottom: function (e) {
    console.log(e);
    this.loadData();
  },
  scroll: function (e) {
    console.log(e)
  },
  loadData: function () {
    var that = this;
    var uid = that.data.uid;
    if (that.data.info.hasMore) {
      if (!that.data.isLoading) {
        that.setData({ 'isLoading': true });
        var page = that.data.info.page;
        var data = { 'page': page, 'id':uid }
        AV.Cloud.run('likes', data).then(function (result) {
          // 调用成功，得到成功的应答 data
          console.log(result)
          if (result.code == 200) {
            that.setData({
              'isLoading': false,
              'info.page': page + 1,
              'info.hasMore': result.hasMore,
              'info.list': that.data.info.list.concat(result.data),
              'info.hidden': false
            })
          } else {
            that.setData({ 'isLoading': false });
          }
        }, function (err) {
          // 处理调用失败
          that.setData({ 'isLoading': false });
        });
      }

    } else {
      console.log('no more data');
    }
  },
  initData: function () {
    var that = this;
    var uid = that.data.uid;
    var initParam = {
      loading: {
        hidden: false
      },
      userInfo: {},
      info: {
        list: [],
        hasMore: true,
        hasRefesh: true,
        page: 1,
        count: 10,
        total: 0,
        hidden: true
      },
      nodata: false,
      isLoading: false
    }
    that.setData(initParam);
    var page = that.data.info.page;
    var data = { 'page': page ,'id':uid}
    AV.Cloud.run('likes', data).then(function (result) {
      // 调用成功，得到成功的应答 data
      console.log(result)
      if (result.code == 200) {
        if (result.count == 0) {
          that.setData({
            'userInfo': app.globalData.user,
            'loading.hidden': true,
            'nodata': true,
            'info.hasMore': true,
            'info.hidden': false
          })
        } else {
          that.setData({
            'userInfo': app.globalData.user,
            'loading.hidden': true,
            'nodata': false,
            'info.list': that.data.info.list.concat(result.data),
            'info.hidden': false,
            'info.hasMore': result.hasMore,
            'info.page': that.data.info.page + 1
          })
        }
      }
    }, function (err) {
      // 处理调用失败
    });


  },
  onLoad: function (option) {
    console.log('生命周期:like-load')
    console.log(option.uid);
    var uid = option.uid;
    var that = this;
    that.setData({'uid':uid})
    //数据加载
    this.initData();
  },
  onReady: function () {
    console.log('生命周期:like-ready');
  },
  onShow: function () {

    console.log('生命周期:like-show');
  },
  onHide: function () {
    console.log('生命周期:like-hide');
  },
  onUnload: function () {
    console.log('生命周期:like-unload');
  }
})
