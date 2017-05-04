//card.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Template = require('../../model/template');
var app = getApp()
Page({
  data: {
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    userInfo: {},
    templates: [{ "id": "1", "url": "http://7rfkul.com1.z0.glb.clouddn.com/template.png" }, { "id": "2", "url": "http://7rfkul.com1.z0.glb.clouddn.com/template2.png" }, { "id": "3", "url": "http://7rfkul.com1.z0.glb.clouddn.com/template3.png" }, { "id": "4", "url": "http://7rfkul.com1.z0.glb.clouddn.com/template4.png" }],
    info: {
      list: [],
      hidden: true
    },
    isLoading: false
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    
    wx.navigateTo({
      url: '../maker/maker?id='+id
    })
    
  },
  initData: function () {
    var that = this;
    that.setData({
      'loading.hidden': true,
      'info.list': that.data.info.list.concat(that.data.templates),
      'info.hidden': false
    });
    /*
    var query = new AV.Query(Template);
    query.descending('createdAt');
    query.find().then(function (results) {
      that.setData({
        'loading.hidden': true,
        'info.list': that.data.info.list.concat(results),
        'info.hidden': false,
        'info.page': that.data.info.page + 1
      })
    }, function (error) {
      console.log('get template list failed!' + error);
    });
    */
  },
  onLoad: function () {
    console.log('生命周期:card-load')
    util.sayHello('summer');
    var that = this;
    //数据加载
    this.initData();
  },
  onReady: function () {
    console.log('生命周期:card-ready');
  },
  onShow: function () {

    console.log('生命周期:card-show');
  },
  onHide: function () {
    console.log('生命周期:card-hide');
  },
  onUnload: function () {
    console.log('生命周期:card-unload');
  }
})
