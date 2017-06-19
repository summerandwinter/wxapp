//explore.js
var util = require('../../../utils/util.js')
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    id: 3364223,
    pid: 0,
    photo: '',
    name:'神奇动物在哪里',
    loading: {
      hidden: false
    },
    creater:{
      hidden:true,
    },
    userInfo: {},
    cates: [],
    photos: {
      list: [],
      hasMore: true,
      total: 0,
      start: 0,
      limit: 21,
      hidden: true
    },
    isLoading: false,
    uploader:{hidden:false},
    preview:{hidden:true}
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
  },
  listPhotos: function(e){
    var that = this;
    that.setData({ 'creater.hidden': true, 'photos.hidden':false });
  },
  choosePhoto: function(e){
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    var that = this;
    that.setData({ 'creater.hidden': false, 'photos.hidden': true ,'pid':id,'photo':url});

  },
  loadMore:function(){
    var that = this;
    if(!that.data.creater.hidden){
       return;
    }
    if(!that.data.photos.hasMore)
       return;
    
    var start = that.data.photos.start, type = 'S', mid = that.data.id;
    var data = { start: start, type: type, mid: mid }
    util.fetch_photo(data, function (data) {
      console.log(data);
      var total = data.total;
      var limit = that.data.photos.limit;
      var hasMore = total > limit + start
      that.setData({
        'isLoading': false,
        'photos.start': start+limit,
        'photos.hasMore': hasMore,
        'photos.total': total,
        'photos.list': that.data.photos.list.concat(data.photos),
        'photos.hidden': false
      })
    }, function (err) {
      console.log(err);
      that.setData({ 'isLoading': false });
    });
  },
  initData: function () {
    var that = this;
    var start = that.data.photos.start, type = 'S', mid = that.data.id;
    var data = { start: start, type: type, mid: mid }
   
    util.fetch_photo(data, function (data) {
      console.log(data);
      var total = data.total;
      var limit = that.data.photos.limit;
      var hasMore = total > limit + start
      if (data.photos.length >0 ){
        that.setData({ 'preview.hidden': false, 'uploader.hidden': true, 'creater.hidden': false, 'photo':data.photos[0].imgurl});
      }else{
        that.setData({ 'preview.hidden': true, 'uploader.hidden': false, 'creater.hidden': false });
      }
      that.setData({      
        'photos.start': limit,
        'photos.hasMore': hasMore,
        'loading.hidden': true,
        'photos.total':total,
        'photos.list': data.photos,
        'photos.hidden': true
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
