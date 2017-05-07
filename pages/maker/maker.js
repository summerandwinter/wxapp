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
  formSubmit: function (e) {
    var that = this;
    var data = e.detail.value;
    if (data.img_url.length < 1) {
      wx.showModal({
        title: '提示',
        content: '需要选择一张图片',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    if (data.content.length < 1) {
      wx.showModal({
        title: '提示',
        content: '内容不能为空',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    wx.showLoading({
      title: '制作中',
    })
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
      card.set('username', app.globalData.user.username);
      card.set('template', parseInt(that.data.tid));
      card.save().then(function (card) {
        // 成功保存之后，执行其他逻辑.
        console.log(card)
        console.log(card.id);
        wx.redirectTo({
          url: '../detail/detail?id=' + card.id
        })
        /*
        wx.hideLoading();
        var url = 'http://timesand.leanapp.cn/card/preview/' + card.id + '.png';
        console.log(url)
        wx.previewImage({
          urls: [url] // 需要预览的图片http链接列表
        })
        */
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
