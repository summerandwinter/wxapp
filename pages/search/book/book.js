//explore.js
var Book = require('../../../service/book.js')
var app = getApp()
Page({
  data: {
    nodata: false,
    slogan: app.globalData.slogan,
    query: '',
    keyword: '',
    limit: 10,
    loading: {
      hidden: false
    },
    hasMore: true,
    search: {
      focus: false
    },
    info: {
      list: [],
      start: 0,
      count: 21,
      hidden: true
    },
    collections: {
      start: 0,
      count: 21,      
      list: [],
      hidden: true
    },
    isLoading: false
  },
  tapCollections: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = that.data.collections.list[index];
    data.book.id = data.id;
    app.book = data.book;
    
    console.log('点击卡片' + index);
    wx.navigateTo({
      url: '/pages/create/book/book'
    })
  },
  tapSearch: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = that.data.info.list[index];
    app.book = data;
    console.log('点击卡片' + index);
    wx.navigateTo({
      url: '/pages/create/book/book'
    })
  },
  focus: function (e) {
    var that = this;
    that.setData({
      search: {
        focus: true
      }
    });
  },
  blur: function (e) {
    var that = this;
    that.setData({
      search: {
        focus: false
      }, query: ''
    });

  },
  clear: function (e) {
    var that = this;
    console.log(e);
    that.setData({ "query": '' });
  },
  input: function (e) {
    var that = this;
    console.log(e);
    that.setData({ "query": e.detail.value });

  },
  search: function (e) {
    console.log(e);
    var that = this;
    var q = e.detail.value;
    if (q.length == 0)
      return;
    var start = 0,count = that.data.info.count;  
    var data = { q: q, start: start, count: count }
    Book.search(data, function (data) {
      console.log(data);
      if (data.books.length > 0) {
        var start = data.start;
        var total = data.total;
        var count = data.count;
        var hasMore = total > start + count;
        that.setData({
          'info.start': start+count,
          'keyword': q,
          'hasMore': hasMore,
          'isLoading': false,
          'loading.hidden': true,
          'collections.hidden': true,
          'info.list': data.books,
          'info.hidden': false
        })
      } else {
        that.setData({
          'keyword': q,
          'nodata': true,
          'hasMore': true,
          'isLoading': false,
          'info.hidden': true,
          'loading.hidden': true,
          'collections.hidden': true
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
  scroll: function (e) {
    //console.log(e)
  }, 
  loadMore: function () {
    var that = this;
    if (!that.data.hasMore)
      return;
    if (!that.data.collections.hidden){
      var count = that.data.collections.count;
      var start = that.data.collections.start;
      that.setData({ 'isLoading': true });
      var data = { start: start, count: count };
      Book.collections(data, function (data) {
        console.log(data);
        var start = data.start;
        var total = data.total;
        var count = data.count;
        var hasMore = total > start + count;
        that.setData({
          'collections.start': start + count,
          'hasMore': hasMore,
          'isLoading': false,
          'loading.hidden': true,
          'collections.list': that.data.collections.list.concat(data.collections),
          'collections.hidden': false
        })
      }, function (res) { })
    }else{
      var q = that.data.keyword;
      var start = that.data.info.start, count = that.data.info.count;
      var data = { q: q, start: start, count: count }
      that.setData({ 'isLoading': true });
      Book.search(data, function (data) {
        console.log(data);
        if (data.books.length > 0) {
          var start = data.start;
          var total = data.total;
          var count = data.count;
          var hasMore = total > start + count;
          that.setData({
            'info.start': start+count,
            'keyword': q,
            'hasMore': hasMore,
            'isLoading':false,
            'loading.hidden': true,
            'collections.hidden': true,
            'info.list': that.data.info.list.concat(data.books),
            'info.hidden': false
          })
        } else {
          that.setData({
            'keyword': q,
            'nodata': true,
            'hasMore': true,
            'isLoading': false,
            'info.hidden': true,
            'loading.hidden': true,
            'collections.hidden': true
          })
        }

      }, function (err) {
        console.log(err);
      });
    }  
    
    
  },
  initData: function () {
    var that = this;
    var start = 0;
    var count = that.data.collections.count;
    var data = { start: start, count: count };
    Book.collections(data, function (data) {
      console.log(data);
      var start = data.start;
      var total = data.total;
      var count = data.count;
      var hasMore = total > start + count;
      that.setData({
        'collections.start': start+count,
        'hasMore': hasMore,
        'loading.hidden': true,
        'collections.list': data.collections,
        'info.hidden': true,
        'collections.hidden': false
      })
    }, function (res) { })


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
