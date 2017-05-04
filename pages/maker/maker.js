//maker.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');

var app = getApp()
Page({
  data: {
    imageUrl: '',
    preview: { hidden: true },
    uploader: { hidden: false },
    slogan: app.globalData.slogan,
    id: 1
  },
  chooseImage: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album'],
      sizeType: ['compressed'],
      count: 1,
      success: function (res) {
        console.log(res)
        that.setData({
          imageUrl: res.tempFilePaths,
          'preview.hidden': false,
          'uploader.hidden': true
        })
      }
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  formSubmit: function (e) {
    var data = e.detail.value;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    new AV.File('file-name', {
      blob: {
        uri: data.img_url,
      },
    }).save().then(function (file) {
      var card = new Card();
      card.set('name', data.name);
      card.set('content', data.content);
      card.set('img_url', file.url());
      card.save().then(function (card) {
        // 成功保存之后，执行其他逻辑.
        console.log(card)
        console.log(card.id)
      }, function (error) {
        // 异常处理
        console.log(error)
      });
    }).catch(console.error);
  },
  onLoad: function (option) {
    console.log('生命周期:maker-load')
    var that = this;
    if (option.id) {
      that.setData({ id: option.id })
    }
  },
  onReady: function () {
    console.log('生命周期:maker-ready');
  },
  onShow: function () {

    console.log('生命周期:maker-show');
  },
  onHide: function () {
    console.log('生命周期:maker-hide');
  },
  onUnload: function () {
    console.log('生命周期:maker-unload');
  }
})
