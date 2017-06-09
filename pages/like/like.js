//like.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
const getCardListUrl = require('../../config').getCardListUrl;
var app = getApp()
Page({
  data: {
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: [], //{ "id": "1", "name": "台词" }, { "id": "2", "name": "感悟" }, { "id": "3", "name": "人物" }
    info: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      page: 0,
      count: 10,
      total: 0,
      hidden: true
    },
    isLoading: false
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  upper: function (e) {
    console.log(e);
  },
  lower: function (e) {
    console.log(e);
    this.loadData();
  },
  scroll: function (e) {
    console.log(e)
  },
  loadData: function () {
    var that = this;
    if (that.data.info.hasMore) {
      if (!that.data.isLoading) {
        that.setData({ 'isLoading': true });
        var cpage = that.data.info.page;
        var limit = that.data.info.count;
        var skip = cpage * limit;
        console.log('loadding skip:' + skip);
        var uid = that.data.uid;
        var userMap = new AV.Object.createWithoutData('_User', uid);
        var query = new AV.Query('Like');
        query.equalTo('user', userMap);
        query.include('card');
        query.include('user');
        query.descending('createdAt');
        query.limit(limit);
        query.skip(skip);
        query.find().then(function (results) {
          that.setData({
            'isLoading': false,
            'info.list': that.data.info.list.concat(results),
            'info.page': that.data.info.page + 1
          })
          if (that.data.info.total < that.data.info.page * limit) {
            that.setData({ 'info.hasMore': false });
          }
        }, function (error) {
          that.setData({ 'isLoading': false })
          console.log('get card list failed!' + error);
        });
      }

    } else {
      console.log('no more data');
    }
  },
  initData: function (uid) {
    var that = this;
    //获取总数量
    var coutnQuery = new AV.Query('Like');
    var userMap = new AV.Object.createWithoutData('_User', uid);
    coutnQuery.equalTo('user', userMap);
    coutnQuery.include('card');
    coutnQuery.count().then(function (count) {
      that.setData({ 'info.total': count });
      //总数量小于每页数量
      if (that.data.info.count > count) {
        that.setData({ 'info.hasMore': false });
      }
      //加载第一页数据
      if (count > 0) {
        var cpage = that.data.info.page;
        var limit = that.data.info.count;
        var skip = cpage * limit;
        var query = new AV.Query('Like');
        console.log('loadding skip:' + skip);

        query.equalTo('user', userMap);
        query.include('card');
        query.include('user');
        query.descending('createdAt');
        query.limit(limit);// 最多返回 10 条结果
        query.skip(skip);// 跳过 20 条结果
        query.find().then(function (results) {
          console.log(results);
          that.setData({
            'loading.hidden': true,
            'info.list': that.data.info.list.concat(results),
            'info.hidden': false,
            'info.page': that.data.info.page + 1
          })
        }, function (error) {
          console.log('get card list failed!' + error);
        });

      } else {
        //做没有数据时的处理
      }

    }, function (error) {
      console.log('get total count failed!' + error);
    });


  },
  onLoad: function (option) {
    console.log('生命周期:like-load')
    console.log(option.uid);
    var uid = option.uid;
    var that = this;
    that.setData({'uid':uid})
    //数据加载
    this.initData(uid);
  },
  onReady: function () {
    console.log('生命周期:like-ready');
  },
  onShow: function () {

    console.log('生命周期:like-show');
  },
  onHide: function () {
    console.log('生命周期:like-hide');
  },
  onUnload: function () {
    console.log('生命周期:like-unload');
  }
})
