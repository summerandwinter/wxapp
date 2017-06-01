//detail.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
var app = getApp()
Page({
  data: {
    id: null,
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    preview: null,
    userInfo: {},
    content: {
      hidden: true
    },
    like: { class: 'icon-like', number: 0 },
    isLoading: false
  },
  tap: function (e) {
    var that = this;
    wx.previewImage({
      urls: [that.data.preview]
    })
  },
  like: function (e) {
    var that = this;
    var likes = that.data.like.number;
    var paramsJson = {
      cid: that.data.card.id,
      uid: app.globalData.user.objectId
    };
    console.log(paramsJson);
    if (that.data.like.class == 'icon-like') {
      AV.Cloud.run('like', paramsJson).then(function (data) {
        if (data == 'ok') {
          that.setData({ 'like.class': 'icon-liked', 'like.number': likes + 1 });
        }
      }, function (err) {
        console.log(err)
      });

    } else {
      AV.Cloud.run('cancel', paramsJson).then(function (data) {
        console.log(data)
        if (data == 'ok') {
          that.setData({ 'like.class': 'icon-like', 'like.number': likes - 1 });
        }
      }, function (err) {
        console.log(err)
      });

    }

  },
  showOptions: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存图片', '复制文字'],
      success: function (res) {
        if (res.tapIndex == 0) {
          //保存图片
          wx.showModal({
            title: '如何保存卡片',
            content: '点击卡片，长按弹出的图片，选择保存图片。',
            confirmText: '我知道了',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })

        } else if (res.tapIndex == 1) {
          //复制文字
          wx.setClipboardData({
            data: that.data.card.content,
            success: function (res) {
              wx.showToast({
                title: '复制成功',
                icon: 'success',
                duration: 2000
              })
            }
          })

        }
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  initData: function (id) {
    var that = this;
    var card = AV.Object.createWithoutData('Card', id);
    var user = AV.Object.createWithoutData('_User', app.globalData.user.objectId);
    var queryCount = new AV.Query('Like');
    queryCount.equalTo('card', card);
    queryCount.equalTo('user', user);
    queryCount.count().then(function (count) {
      console.log(count);
      if (count > 0) {
        that.setData({ 'like.class': 'icon-liked' });
      } else {
        that.setData({ 'like.class': 'icon-like' });
      }

    });
    var query = new AV.Query('Card');
    query.include('photo');
    query.get(id).then(function (card) {
      console.log(card)
      console.log(card.photo.attributes.url);
      //var preview = 'https://timesand.leanapp.cn/card/preview/' + card.id + '.png';
      var preview = card.photo.attributes.url;
      // 成功获得实例
      that.setData({
        card,
        preview: preview,
        'like.number': card.likes,
        'loading.hidden': true,
        'content.hidden': false
      })
      console.log(that.data);

    }, function (error) {
      // 异常处理
    });


  },
  onLoad: function (option) {
    console.log('生命周期:detail-load')
    var that = this;
    if (option.id) {
      that.setData({ id: option.id })
      //数据加载
      this.initData(option.id);
    }

  },
  onReady: function () {
    console.log('生命周期:detail-ready');
  },
  onShow: function () {

    console.log('生命周期:detail-show');
  },
  onHide: function () {
    console.log('生命周期:detail-hide');
  },
  onUnload: function () {
    console.log('生命周期:detail-unload');
  }
})
