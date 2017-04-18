//index.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    motto: '欢迎回来，',
    userInfo: {},
    cates: ["台词","感悟","人物"],
    movies: [
      {photo: "https://img3.doubanio.com/view/photo/photo/public/p2410945443.jpg",word: "别人稍一注意你，你就敞开心扉，你觉得这是坦率，其实这是孤独"},
      {photo: "https://img1.doubanio.com/view/photo/photo/public/p2423105699.jpg",word: "中年以后的男人，时常会觉得孤独，因为他一睁开眼睛，周围都是要依靠他的人，却没有他可以依靠的人。"},
      {photo: "https://img3.doubanio.com/view/photo/photo/public/p2454410343.jpg",word: "告别时都爱强装洒脱，告别后都在强忍想念，躲得了对酒当歌的夜，躲不了四下无人的街"},
      {photo: "https://img5.doubanio.com/view/photo/photo/public/p2428896196.jpg",word: "没有人喜欢孤独，只是不喜欢失望"}
      ]
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
