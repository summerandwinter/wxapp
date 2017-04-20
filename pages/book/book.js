//book.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Book = require('../../model/book');
const getBookListUrl = require('../../config').getBookListUrl;
var app = getApp()
Page({
  data: {
    loading: {
      hidden: false
    },
    userInfo: {},
    cates: ["台词","感悟","人物"],
    books: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      page: 1,
      count: 20,
      hidden: true
    }
  },
  loadDataFromGithub: function() {
    var that = this;
    wx.request({
      url: getBookListUrl,
      data: {
        noncestr: Date.now()
      },
      success: function (result) {
        if (result.statusCode == 200) {
          that.setData({
            'loading.hidden': true,
            'books.list': that.data.books.list.concat(result.data.data),
            'books.hidden': false
          })

        }
        console.log('request success', result)
      },

      fail: function ({errMsg}) {
        console.log('request fail', errMsg)
      }
    })
  },
  loadDataFromLearncloud: function() {
    var that = this;
    var query = new AV.Query(Book);
    query.find().then(function (results) {
      that.setData({
        'loading.hidden': true,
        'books.list': that.data.books.list.concat(results),
        'books.hidden': false
      })
    }, function (error) {
    });
  },
  onLoad: function () {
    console.log('生命周期:book-load')
    util.sayHello('summer');
    var that = this;
    this.loadDataFromLearncloud();
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
    console.log('生命周期:book-ready');
  },
  onShow: function() {
    
    console.log('生命周期:book-show');
  },
  onHide: function() {
    console.log('生命周期:book-hide');
  },
  onUnload: function() {
    console.log('生命周期:book-unload');
  }
})
