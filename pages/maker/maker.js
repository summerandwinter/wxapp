//maker.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
var Base64 = require('../../utils/base64.js')
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
        new AV.File(res.tempFilePaths[0].split('//')[1].toLowerCase(), {
          blob: {
            uri: res.tempFilePaths[0],
          },
        }).save().then(function (file) {
          console.log(file);
          that.setData({ 'img_url': file.url(), 'file': file.id });
        }).catch(function () {
          console.log(err)
          wx.showModal({ title: '提示', content: '上传图片出错,请稍后重试' })
        });
      }
    })
  },
  preview: function (res) {
    var that = this;
    var data = {};
    var url = res.img_url;
    var title = res.name;
    var content = res.content;
    var author = res.author;
    var template = res.template;

    data['url'] = url;
    data['content'] = content;
    data['title'] = title;
    data['template'] = template;
    data['author'] = author;
    var stringfy = JSON.stringify(data);
    console.log(stringfy)
    var base64 = Base64.encode(stringfy);
    console.log(base64);
    var link = "https://timesand.leanapp.cn/word/preview/" + base64
    wx.previewImage({
      urls: [link]
    })
  },
  doMake: function (e) {
    var that = this;
    var data = e.detail.value;
    var formId = e.detail.formId;
    var isPublish = false;
    if (e.detail.target.id == 'publish') {
      isPublish = true
    }
    var card = {}
    card.public = isPublish;
    card.name = data.name;
    card.img_url = data.img_url;
    card.file = that.data.file;
    card.content = data.content;
    card.author = data.author ? data.author : app.globalData.user.nickName
    card.userid = app.globalData.user.objectId;
    card.formId = formId;
    card.template = parseInt(that.data.tid);
    console.log(JSON.stringify(card));
    console.log('form发生了submit事件，携带数据为：', e)

    if (data.name.length > 15) {
      wx.showModal({ title: '提示', content: '标题不能超过15个字' })
      return;
    }

    if (data.content.length < 1) {
      wx.showModal({ title: '提示', content: '内容不能为空' })
      return;
    }
    if (e.detail.target.id == 'preview') {
      that.preview(card);
      return;
    }


    wx.showLoading({
      title: '制作中',
    })


    AV.Cloud.run('makeWord', card).then(function (data) {
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
