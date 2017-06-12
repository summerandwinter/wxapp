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
    tid: 1
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
  doMake: function (e) {
    var that = this;
    var data = e.detail.value;
    var formId = e.detail.formId;

    console.log('form发生了submit事件，携带数据为：', e)
    if (data.img_url.length < 1) {
      wx.showModal({ title: '提示', content: '需要选择一张图片' })
      return;
    }

    if (data.name.length > 15) {
      wx.showModal({ title: '提示', content: '标题不能超过15个字' })
      return;
    }

    if (data.content.length < 1) {
      wx.showModal({ title: '提示', content: '内容不能为空' })
      return;
    }
    wx.showLoading({
      title: '制作中',
    })
    var card = {}
    card.name = data.name;
    card.content = data.content;
    card.userid = app.globalData.user.objectId;
    card.username = app.globalData.user.username;
    card.formId = formId;
    card.template = parseInt(that.data.tid);
    console.log(card)
    new AV.File('file-name', {
      blob: {
        uri: data.img_url,
      },
    }).save().then(function (file) {
      console.log(file);
      card.img_url = file.url();
      card.file = file.id;
      AV.Cloud.run('maker', card).then(function (data) {
        // 调用成功，得到成功的应答 data
        console.log(data)
        if (data.code == 200) {
          wx.redirectTo({
            url: '../detail/detail?id=' + data.data
          })
        }

      }, function (err) {
        // 处理调用失败
      });
    }).catch(console.error);

  },
  formSubmit: function (e) {
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
  onLoad: function (option) {
    console.log('生命周期:maker-load')
    console.log(option.id)
    var that = this;
    if (option.id) {
      that.setData({ tid: option.id })
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
