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
        var query = new AV.Query(Card);
        query.notEqualTo('publish', false);
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
  initData2: function () {
    var that = this;
    that.setData({ 'info.total': 2 });
    that.setData({ 'info.hasMore': false });
    var results = [{ "name": "只靠卖方便面红足10年，这家店是泡面控的天堂", "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1462775205", "content": "泡面,是世界上最美好，也最罪恶的食物。", "id": "1", "objectId": "1" }, { "name": "日本人蜗居也能住出好品质的6个妙招", "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1462775205", "content": "日本人究竟是如何在苛刻的用地环境下，通过优化户型得到最优的居住体验呢？", "id": "2", "objectId": "2" }];
    that.setData({
      'loading.hidden': true,
      'info.list': that.data.info.list.concat(results),
      'info.hidden': false,
      'info.page': 2
    })
  },
  initData: function () {
    var that = this;
    //获取总数量
    var coutnQuery = new AV.Query(Card);
    coutnQuery.notEqualTo('publish', false);
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
        var query = new AV.Query(Card);
        console.log('loadding skip:' + skip);
        query.notEqualTo('publish', false);
        query.descending('createdAt');
        query.limit(limit);// 最多返回 10 条结果
        query.skip(skip);// 跳过 20 条结果
        query.find().then(function (results) {
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
  onLoad: function () {
    console.log('生命周期:explore-load')
    util.sayHello('summer');
    var that = this;
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
