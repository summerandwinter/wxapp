//detail.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
var app = getApp()
Page({
  data: {
    id: null,
    style:"",
    slogan: app.globalData.slogan,
    shareBtn: wx.canIUse && wx.canIUse('button.open-type.share'),
    loading: {
      hidden: false
    },
    preview: null,
    userInfo: {},
    notfound: {
      hidden: true,
      tips:'内容不存在或已被作者删除'
    },
    content: {
      hidden: true
    },
    like: { class: 'icon-like' },
    isLoading: false
  },
  tap: function (e) {
    var that = this;
    wx.previewImage({
      urls: [that.data.card.preview]
    })
  }
  ,loaded: function(e){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        var img_w = e.detail.width;
        var img_h = e.detail.height;
        var win_w = res.windowWidth;
        var win_h = res.windowHeight;
        var box_w = win_w*0.8;
        var box_h = win_h*0.8;
        var width = win_w;
        var height = win_h;
        var left = 0;
        var top = 0;
        if (box_w / box_h>img_w/img_h){
          console.log("height fixed");
          width = img_w * (box_h/img_h)
          height = box_h;
          left = (win_w-width)/2;
          top = (win_h-height)/2;
        }else{
          console.log("width fixed");
          height = img_h * (box_w/img_w);
          width = box_w;
          left = (win_w - width) / 2;
          top = (win_h - height) / 2;
        }
        var style = "width:"+width+"px;height:"+height+"px;left:"+left+"px;top:"+top+"px;";
        console.log(style);
        that.setData({"style":style});
        
      }
    })
    console.log(e);
  },
  doLike: function(){
    var that = this;
    var likes = that.data.card.likes;
    var paramsJson = {
      cid: that.data.card.id,
      uid: app.globalData.user.objectId
    };
    if (that.data.like.class == 'icon-like') {
      AV.Cloud.run('like', paramsJson).then(function (data) {
        if (data == 'ok') {
          that.setData({ 'like.class': 'icon-liked', 'card.likes': likes + 1 });
        }
      }, function (err) {
        console.log(err)
      });

    } else {
      AV.Cloud.run('cancel', paramsJson).then(function (data) {
        console.log(data)
        if (data == 'ok') {
          that.setData({ 'like.class': 'icon-like', 'card.likes': likes - 1 });
        }
      }, function (err) {
        console.log(err)
      });

    }
  },
  like: function (e) {
    var that = this;
    if (app.globalData.user && app.globalData.user.nickName){
      console.log('直接保存')
      that.doLike()
    }else{
      console.log('需要授权')
      if (wx.getSetting) {
        wx.getSetting({
          success(res) {
            if (!res['authSetting']['scope.userInfo']) {
              wx.openSetting({
                success: (res) => {
                  console.log('authorize')
                  wx.authorize({
                    scope: 'scope.userInfo',
                    success() {
                      app.authorize(function (user) {
                        app.authorize(function (user) {
                          var param = { 'id': that.data.id, 'uid': app.globalData.user.objectId }
                          AV.Cloud.run('isLiked', param).then(function (result) {
                            if (result) {
                              that.setData({ 'like.class': 'icon-liked' });
                            } else {
                              that.setData({ 'like.class': 'icon-like' });
                            }
                            that.doLike();
                          }, function (err) { });

                        }, function (res) {
                          console.log(res);
                        })
                      })
                    },
                    fail() {
                      console.log('authorize failed')
                    }
                  })
                }
              })

            }
          }
        })
      } else {
        app.login(function (user) {
          app.authorize(function (user) {
            var param = { 'id': that.data.id, 'uid': app.globalData.user.objectId }
            AV.Cloud.run('isLiked', param).then(function (result) {
              if (result) {
                that.setData({ 'like.class': 'icon-liked' });
              } else {
                that.setData({ 'like.class': 'icon-like' });
              }
              that.doLike();
            }, function (err) { });

          }, function (res) {
            console.log(res);
          })
        }, function (errMsg) {
          if (errMsg == 'getUserInfo:fail auth deny') {
            wx.showModal({
              title: '提示',
              content: '在设置页面授权获取用户信息，再点刷新页面',
              confirmText: '我知道了',
              showCancel: false
            })
          } else {

          }

        })

      }
      
    }
  },
  saveToAlbum: function (url) {
    var that = this;
    console.log(url)
    wx.downloadFile({
      url: url,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 2000
            })
            var param = {}
            param['id'] = that.data.card.id;
            if (app.globalData.user) {
              param['uid'] = app.globalData.user.objectId;
            }
            AV.Cloud.run('download', param).then(function (reslut) {
              console.log('下载日志保存成功')
            }, function (err) {
              console.log(err);
            })
          },
          fail(res) {
            console.log('图片保存失败');
            console.log(res)
            if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
              console.log('授权失败，重新发起授权');
              wx.getSetting({
                success(res) {
                  if (!res['authSetting']['scope.writePhotosAlbum']) {
                    wx.openSetting({
                      success: (res) => {
                        console.log('用户授权')
                        wx.authorize({
                          scope: 'scope.writePhotosAlbum',
                          success(res) {
                            console.log(res);
                            that.saveToAlbum(url);
                          },
                          fail(res) {
                            wx.showModal({
                              title: '提示',
                              content: '没有授权，图片未成功保存',
                              confirmText: '我知道了',
                              showCancel: false
                            })
                            console.log('授权失败')
                          }
                        })
                      }
                    })

                  } else {
                    that.saveToAlbum(url);
                  }
                }
              })
            } else if (res.errMsg == 'saveImageToPhotosAlbum:fail cancel') {
              console.log('取消了此次操作，图片未保存成功')
            }
          }
        })
      },
      fail: function (res) {
        console.log(res)
        console.log('图片下载失败');
        wx.showModal({
          title: '提示',
          content: '图片下载失败',
          confirmText: '我知道了',
          showCancel: false
        })
      }
    })
  },
  saveImage: function () {
    var that = this;
    var url = that.data.card.download;
    //判断接口是否可用
    if (!wx.saveImageToPhotosAlbum) {
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
    } else {
      that.saveToAlbum(url);
    }

  },
  showOptions: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['保存图片', '复制文字'],
      success: function (res) {
        if (res.tapIndex == 0) {
          //保存图片
          that.saveImage();
        } else if (res.tapIndex == 1) {
          //复制文字
          util.setClipboardData(that.data.card.content);
        }
      }
    })
  },
  initData: function (id) {
    var that = this;
    var param = {};
    param['id'] = id;
    if (app.globalData.user && app.globalData.user.nickName) {
      param['uid'] = app.globalData.user.objectId;
    }
    AV.Cloud.run('view', param).then(function (reslut) {
      console.log('查看日志保存成功')
    }, function (err) {
      console.log(err);
    })
    AV.Cloud.run('detail', param).then(function (result) {
      console.log('获取首页数据');
      // 调用成功，得到成功的应答 data
      console.log(result)
      if (result.code == 200) {
        if (result.data.isLiked) {
          that.setData({ 'like.class': 'icon-liked' });
        } else {
          that.setData({ 'like.class': 'icon-like' });
        }
        that.setData({
          'card': result.data,
          'loading.hidden': true,
          'content.hidden': false,
          'notfound.hidden': true
        })
        
        util.showShareMenu();
      } else if (result.code == 101) {
        //数据不存在
        that.setData({
          'loading.hidden': true,
          'content.hidden': true,
          'notfound.hidden': false
        })
      }

    }, function (err) {
      // 处理调用失败
      that.setData({
        'loading.hidden': true,
        'content.hidden': true,
        'notfound.hidden': false,
        'notfound.tips':'网络出了点问题，重新打开试试'
      })
    });
  },
  onShareAppMessage: function () {
    var that = this;
    return {
      success: function (res) {
        console.log(res);
        if (res.errMsg == 'shareAppMessage:ok'){
           // 转发成功
           console.log(res.shareTickets);
           var param = {}
           param['id'] = that.data.card.id;
           param['tickets'] = res.shareTickets;
           if(app.globalData.user){
             param['uid'] = app.globalData.user.objectId;
           }
           AV.Cloud.run('share',param).then(function(reslut){
             console.log('分享日志保存成功')
             var shares  = that.data.card.shares;
             that.setData({
               'card.shares': shares + 1
             })
           },function(err){
             console.log(err);
           })
        }        
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  onLoad: function (option) {
    console.log('生命周期:detail-load')
    var that = this;
    if (option.id) {
      that.setData({ id: option.id })
      that.initData(option.id);

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
