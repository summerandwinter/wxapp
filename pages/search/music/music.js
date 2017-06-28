//explore.js
var Music = require('../../../service/music.js')
var app = getApp()
Page({
  data: {
    search:{
      focus: false,
    },
    nodata:false,
    slogan: app.globalData.slogan,
    query:'',
    keyword:'',
    limit:10, 
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [],
    info: {
      list: [],
      hasMore: true,
      page: 1,
      count: 0,
      limit: 10,
      hidden: true
    },
    toplist: {
      list: [],
      hidden: true
    },
    isLoading: false
  },
  tapToplist: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = that.data.toplist.list[index].data;
    app.music = data;
    console.log('点击卡片' + index);
    wx.navigateTo({
      url: '/pages/create/music/music'
    })
  },
  tapSearch: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = that.data.info.list[index];
    app.music = data;
    console.log('点击卡片' + index);
    wx.navigateTo({
      url: '/pages/create/music/music'
    })
  },
  focus: function(e){
    var that = this;
    that.setData({
      search: {
        focus: true
      }
    });
  },
  blur: function(e){
    var that = this;
    that.setData({
      search: {
        focus: false
      },query:''});

  },
  clear: function(e){
    var that = this;
    console.log(e);
    that.setData({ "query": '' });
  },
  input: function(e){
    var that = this;
    console.log(e);
    that.setData({"query":e.detail.value});

  },
  search: function(e){
    console.log(e);
    var that = this;
    var q = e.detail.value, limit = that.data.limit, p = 1;
    if(q.length == 0)
      return;
    var data = { q: q, l: limit, p: p }
    Music.search_qq_music(data, function (data) {
      console.log(data);
      if(data.list.length>0){
        var count = data.totalnum;
        var hasMore = count > limit * (p + 1)
        that.setData({
          'info.page': 2,
          'keyword': q,
          'info.hasMore': hasMore,
          'loading.hidden': true,
          'toplist.hidden': true,
          'info.list': data.list,
          'info.hidden': false
        })
      }else{
        that.setData({
          'keyword': q,
          'nodata':true,
          'info.hasMore': true,
          'toplist.hidden': true,
          'loading.hidden': true,
          'info.hidden': true
        })
      }
      
    }, function (err) {
      console.log(err);
    });
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
  loadMore:function(){
    var that = this;
    if(!that.data.info.hasMore)
      return;
    var q = that.data.keyword, limit = that.data.limit, p = that.data.info.page;
    if(q.length == 0)
      return;
    var data = { q: q, l: limit, p: p }
    that.setData({'isLoading':true});
    Music.search_qq_music(data, function (data) {
      console.log(data);
      var count = data.totalnum;
      var hasMore = count > limit * (p + 1);
      that.setData({
        'info.page': p+1,
        'info.hasMore': hasMore,
        'isLoading': false,
        'toplist.hidden': true,
        'info.list': that.data.info.list.concat(data.list),
        'info.hidden': false
      })
      
    }, function (err) {
      console.log(err);
      that.setData({ 'isLoading': false });
    });
  },
  initData: function () {
    var that = this;
    var data = {'topid':26,'begin':0,'num':100}
    Music.get_toplist_music(data, function (data) {
      console.log(data);
      that.setData({
        'toplist.list': data,
        'loading.hidden': true,
        'toplist.hidden': false
      })
    }, function (err) {
      console.log(err);
    });

  },
  onLoad: function () {
    console.log('生命周期:explore-load')
    var that = this;
    that.initData();

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
