//explore.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
var app = getApp()
Page({
  data: {
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [],
    info: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      page: 1,
      count: 10,
      total: 0,
      hidden: true
    },
    isLoading: false
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log('点击卡片' + id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  touchstart: function (e) {

  },
  touchmove: function (e) {
    
  },
  touchcancel: function (e) {

  },
  touchend: function (e) {

  },
  onPullDownRefresh: function (e) {
    console.log(e);
    var that = this;
    wx.stopPullDownRefresh();
    that.initData();
  },
  onReachBottom: function (e) {
    var that = this;
    console.log('加载第' + that.data.info.page + '页')
    this.loadData();
  },
  scroll: function (e) {
    //console.log(e)
  },
  loadData: function () {
    var that = this;
    if (that.data.info.hasMore) {
      if (!that.data.isLoading) {
        that.setData({ 'isLoading': true });
        var page = that.data.info.page;
        var data = { 'page': page }
        AV.Cloud.run('explore', data).then(function (result) {
          // 调用成功，得到成功的应答 data
          console.log(result)
          if (result.code == 200) {
            that.setData({
              'isLoading': false,
              'info.page': page + 1,
              'info.hasMore': result.hasMore,
              'info.list': that.data.info.list.concat(result.data),
              'info.hidden': false
            })
          } else {
            that.setData({ 'isLoading': false });
          }
        }, function (err) {
          // 处理调用失败
          that.setData({ 'isLoading': false });
        });
      }

    } else {
      console.log('no more data');
    }
  },
  initData: function () {
    var that = this;
    var initParam = {
      loading: {
        hidden: false
      },
      userInfo: {},
      cates: [],
      info: {
        list: [],
        hasMore: true,
        hasRefesh: true,
        page: 1,
        count: 10,
        total: 0,
        hidden: true
      },
      isLoading: false
    }
    that.setData(initParam);
    var page = that.data.info.page;
    var data = { 'page': page }
    AV.Cloud.run('explore', data).then(function (result) {
      // 调用成功，得到成功的应答 data
      console.log(result)
      if (result.code == 200) {
        that.setData({
          'info.page': page + 1,
          'info.hasMore': result.hasMore,
          'loading.hidden': true,
          'info.list': that.data.info.list.concat(result.data),
          'info.hidden': false
        })
      }
    }, function (err) {
      // 处理调用失败
    });
  },
  initData2: function () {
    var that = this;
    var result = {
      "data": [
        {
          "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1464188073",
          "shares": 270,
          "user": {
            "city": "Nanjing",
            "id": "590be679ac502e006cdc63c0",
            "nickName": "一言",
            "gender": 1,
            "province": "Jiangsu",
            "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0"
          },
          "likes": 1038,
          "content": "因为你，我想要变成一个更好的人，不想成为你的负担，因此发奋，只是想证明我足以与你相配。",
          "name": "侧耳倾听",
          "time": "2016年6月1日",
          "id": "593947698d6d810058503830"
        },
        {
          "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1464082504",
          "shares": 280,
          "user": {
            "city": "Nanjing",
            "id": "590be679ac502e006cdc63c0",
            "nickName": "一言",
            "gender": 1,
            "province": "Jiangsu",
            "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0"
          },
          "likes": 897,
          "content": "爱，不是寻找一个完美的人，而是学会用完美的眼光，欣赏那个并不完美的人。\n\n因为爱你，只要你一个肯定，我就足够勇敢。",
          "name": "哈尔的移动城堡",
          "time": "3天前",
          "id": "593351b361ff4b389e37087e"
        }
      ],
      "hasMore": true,
      "code": 200,
      "count": 900,
      "page": 1
    }
    if (result.code == 200) {
      that.setData({
        'info.page': 1,
        'info.hasMore': result.hasMore,
        'loading.hidden': true,
        'info.list': that.data.info.list.concat(result.data),
        'info.hidden': false
      })
    }
  },
  onLoad: function () {
    console.log('生命周期:explore-load')
    var that = this;
    util.showShareMenu();
    //数据加载
    this.initData();
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
