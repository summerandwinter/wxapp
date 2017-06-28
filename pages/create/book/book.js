//explore.js
var Base64 = require('../../../utils/base64.js');
const AV = require('../../../utils/av-weapp-min.js');
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
    var url = app.book.images.large;

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
  doMake: function (e) {
    var isPublish = false;
    if (e.detail.target.id == 'publish') {
      isPublish = true
    }
    var that = this;
    var data = e.detail.value;
    var formId = e.detail.formId;

    if (that.data.content.length < 1) {
      wx.showModal({ title: '提示', content: '内容不能为空' })
      return;
    }
    wx.showLoading({
      title: '制作中',
    })

    var title = app.book.title;
    var url = app.book.images.large;

    var content = that.data.content;
    var author = app.book.author.join('/');

    var card = {}
    card.public = isPublish;
    card.userid = app.globalData.user.objectId;
    card.formId = formId;
    card.author = author;
    card.name = title;
    card.content = that.data.content;
    card.img_url = url;
    card.db_num = app.book.id;
    card.extraData = JSON.stringify(app.book);
    console.log(JSON.stringify(card));
    AV.Cloud.run('makeBook', card).then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      if (data.code == 200) {
        wx.redirectTo({
          url: '/pages/detail/detail?id=' + data.data
        })
      }

    }, function (err) {
      // 处理调用失败
    });
  },
  formSubmit: function (e) {
    console.log(e);
    var that = this;
    if (app.globalData.user && app.globalData.user.nickName) {
      console.log('直接保存')
      that.doMake(e);
    } else {
      console.log('需要授权')
      app.authorize(function (user) {
        that.doMake(e);
      }, function (res) {
        console.log(res);
      })
    }
  },
  initData: function () {
    var that = this;
    console.log(app.book)
    var author = app.book.author.join('/');
    that.setData({'loading.hidden':true,'creater.hidden':false});
    that.setData({'cover':app.book.images.large,'name':app.book.title,'author':author})

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
