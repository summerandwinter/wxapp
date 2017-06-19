//explore.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    query:'悟空传',
    type:'book', //movie book
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [],
    info: {
      list: [],
      hasMore: true,
      page: 0,
      count: 0,
      limit: 10,
      hidden: true
    },
    isLoading: false
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('点击卡片' + id);

  },
  touchstart: function (e) {

  },
  touchmove: function (e) {

  },
  touchcancel: function (e) {

  },
  touchend: function (e) {

  },
  onPullDownRefresh: function (e) {
    console.log(e);
    var that = this;
    wx.stopPullDownRefresh();
    that.initData();
  },
  onReachBottom: function (e) {
    var that = this;
    console.log('加载..');
    that.loadMore();
  },
  scroll: function (e) {
    //console.log(e)
  },loadMore:function(){
    var that = this;
    if(!that.data.info.hasMore)
      return;
    var q = that.data.query, t = that.data.type, p = that.data.info.page;
    var data = { q: q, t: t, p: p }
    that.setData({'isLoading':true});
    util.dbSearch(data, function (data) {
      console.log(data);
      var limit = data.limit;
      var count = data.count;
      var hasMore = count > limit * (p + 1)
      that.setData({
        'info.page': p+1,
        'info.hasMore': hasMore,
        'isLoading': false,
        'info.list': that.data.info.list.concat(data.data),
        'info.hidden': false
      })
    }, function (err) {
      console.log(err);
      that.setData({ 'isLoading': false });
    });
  },
  initData: function () {
    var that = this;
    var q = that.data.query, t = that.data.type, p = 0;
    var data = { q: q, t: t, p: p }
    util.dbSearch(data, function (data) {
      console.log(data);
      var limit = data.limit;
      var count = data.count;
      var hasMore = count>limit*(p+1)
      that.setData({
        'info.page': 1,
        'info.hasMore': hasMore,
        'loading.hidden': true,
        'info.list': data.data,
        'info.hidden': false
      })
    }, function (err) {
      console.log(err);
    });
    

  },
  onLoad: function () {
    console.log('生命周期:explore-load')
    var that = this;
    //that.initData();

  },
  onReady: function () {
    console.log('生命周期:explore-ready');
  },
  onShow: function () {

    console.log('生命周期:explore-show');
  },
  onHide: function () {
    console.log('生命周期:explore-hide');
  },
  onUnload: function () {
    console.log('生命周期:explore-unload');
  }
})
