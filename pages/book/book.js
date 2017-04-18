//book.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    motto: '欢迎回来，',
    userInfo: {},
    cates: ["台词","感悟","人物"],
    books: [
      {book: "愿你慢慢长大",author:"刘瑜",word: "愿你有好运气，如果没有，愿你在不幸中学会慈悲；愿你被很多人爱，如果没有，愿你在寂寞中学会宽容。"},
      {book: "去见你想见的人吧",author:"臻臻",word: "去见你想见的人吧。趁阳光正好，趁微风不噪，趁繁花还未开至荼蘼，趁现在还年轻，还可以走很长很长的路，还能诉说很深很深的思念，趁世界还不那么拥挤，趁飞机还没有起飞，趁现在自己的双手还能拥抱彼此，趁我们还有呼吸。"},
      {book: "爱",author:"张爱玲",word: "于千万人之中遇见你所要遇见的人，于千万年之中，时间的无涯的荒野里，没有早一步，也没有晚一步，刚巧赶上了，那也没有别的话可说，惟有轻轻地问一声：“噢，你也在这里吗？”"},
      {book: "不宠无惊过一生",author:"丰子恺",word: "不乱于心，不困于情。不畏将来，不念过往。如此，安好。"},
      {book: "送行",author:"梁实秋",word: "你走，我不送你；你来，无论多大的风雨，我要去接你。"},
      {book: "黄金时代",author:"王小波",word: "那一天我二十一岁，在我一生的黄金时代，我有好多奢望。我想爱，想吃，还想在一瞬间变成天上半明半暗的云，后来我才知道，生活就是个缓慢受锤的过程，人一天天老下去，奢望也一天天消逝，最后变得像挨了锤的牛一样。可是我过二十一岁生日时没有预见到这一点。我觉得自己会永远生猛下去，什么也锤不了我。"},
      {book: "蝶恋花",author:"王国维",word: "最是人间留不住， 朱颜辞镜花辞树。"},
      {book: "湘行散记",author:"沈从文",word: "我行过许多地方的桥，看过许多次数的云，喝过许多种类的酒，却只爱过一个正当最好年龄的人。"}
      ]
  },
  onLoad: function () {
    console.log('生命周期:book-load')
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
