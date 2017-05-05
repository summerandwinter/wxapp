//mine.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Template = require('../../model/template');
const Card = require('../../model/card');
const user = AV.User.current();
var app = getApp()
Page({
  data: {
    userInfo: null,
    slogan: app.globalData.slogan,
    loading: {
      hidden: false
    },
    count: {
      work: 0,
      like: 0,
      follower: 0
    },
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

    wx.navigateTo({
      url: '../maker/maker?id=' + id
    })

  },
  lower: function (e) {
    console.log(e);
    this.loadData();
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
          console.log('get Card list failed!' + error);
        });
      }

    } else {
      console.log('no more data');
    }
  },
  initData: function () {
    var that = this;
    that.setData({ userInfo: app.globalData.user })
    wx.setNavigationBarTitle({
      title: app.globalData.user.nickName
    })
    //获取总数量
    var coutnQuery = new AV.Query(Card);
    coutnQuery.count().then(function (count) {
      that.setData({ 'count.work': count });
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
          console.log('get Card list failed!' + error);
        });

      } else {
        //做没有数据时的处理
      }

    }, function (error) {
      console.log('get total count failed!' + error);
    });

  },
  onLoad: function () {
    console.log('生命周期:mine-load')
    var that = this;
    //数据加载
    this.initData();
  },
  onReady: function () {
    console.log('生命周期:mine-ready');
  },
  onShow: function () {

    console.log('生命周期:mine-show');
  },
  onHide: function () {
    console.log('生命周期:mine-hide');
  },
  onUnload: function () {
    console.log('生命周期:mine-unload');
  }
})
