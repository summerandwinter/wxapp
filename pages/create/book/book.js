//explore.js
var util = require('../../../utils/util.js')
var Base64 = require('../../../utils/base64.js')
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    id: 1003000,
    pid: 0,
    cover: 'https://img3.doubanio.com/lpic/s9026255.jpg',
    name:'悟空传',
    author:'今何在',
    content:'我要这天，再遮不住我眼，要这地，再埋不了我心，要这众生，都明白我意，要那诸佛，都烟消云散！',
    loading: {
      hidden: false
    },
    creater:{
      hidden:false,
    },
    userInfo: {},
    cates: [],
    isLoading: false,
    uploader:{hidden:false},
    preview:{hidden:true}
  },
  preview: function (e) {
    var that = this;
    var data = {};
    var title = app.book.title;
    var url = app.book.image;

    var content = that.data.content;
    var author = app.book.author.join('/');

    data['url'] = url;
    data['author'] = author;
    data['content'] = content;
    data['title'] = title;
    var stringfy = JSON.stringify(data);
    console.log(stringfy)
    var base64 = Base64.encode(stringfy);
    console.log(base64);
    var link = "https://timesand.leanapp.cn/book/preview/" + base64
    wx.previewImage({
      urls: [link]
    })
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
  },
  onReachBottom: function (e) {
    var that = this;
  },
  scroll: function (e) {
    //console.log(e)
  },
  initData: function () {
    var that = this;
    console.log(app.book)
    var author = app.book.author.join('/');
    that.setData({'loading.hidden':true,'creater.hidden':false});
    that.setData({'cover':app.book.image,'name':app.book.title,'author':author})

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
