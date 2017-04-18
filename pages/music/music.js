//music.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    motto: '欢迎回来，',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('生命周期:index-load')
    util.sayHello('summer');
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady: function() {
    console.log('生命周期:index-ready');
  },
  onShow: function() {
    
    console.log('生命周期:index-show');
  },
  onHide: function() {
    console.log('生命周期:index-hide');
  },
  onUnload: function() {
    console.log('生命周期:index-unload');
  }
})
