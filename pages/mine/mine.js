//mine.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
const user = AV.User.current();
var app = getApp()
Page({
  data: {
    userInfo: null,
    slogan: app.globalData.slogan,
    closed:{
      hidden:true
    },
    loading: {
      hidden: false
    },
    count: {
      works: 0,
      likes: 0,
      follower: 0
    },
    info: {
      list: [],
      hasMore: true,
      hasRefesh: true,
      isLogin: true,
      page: 1,
      count: 10,
      total: 0,
      hidden: true
    },
    nodata: false,
    isLoading: false
  },
  delete: function(e){
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var that = this;
    var list = that.data.info.list;
    var param = { 'cid': id, 'uid': app.globalData.user.objectId }
    AV.Cloud.run('delete', param).then(function(data){
      if(data.code == 200){
        var animation = wx.createAnimation({
          duration: 1000,
          timingFunction: 'ease',
        })

        list[index].deleteAnimation = "delete-animation";
        that.setData({ "info.list": list })
        setTimeout(function () {
          list.splice(index, 1);
          that.setData({ "info.list": list })
        }.bind(this), 1100)
      }else{
        wx.showModal({
          title: '提示',
          content: data.message,
        })
      }
    },function(err){
      wx.showModal({
        title: '提示',
        content: '网络错误，请稍后重试',
      })
    });
    
    
    console.log(id);
    console.log(index);
  },
  tap: function (e) {
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })

  },
  toLike: function (e) {
    var uid = e.currentTarget.dataset.id;
    console.log('uid');
    var that = this;
    if (that.data.count.likes == 0) {
      //return false;
    }
    wx.navigateTo({
      url: '../like/like?uid=' + uid
    });
  },
  onPullDownRefresh: function (e) {
    var that = this;
    wx.stopPullDownRefresh();
    console.log(e);
    that.initData();
  },
  onReachBottom: function (e) {
    var that = this;
    if (!that.data.nodata) {
      that.loadData();
    }

  },
  login: function () {
    var that = this;
    console.log('登录')
    if (wx.getSetting) {
      console.log('getSetting')
      wx.getSetting({
        success(res) {
          console.log(res)
          if (!res['authSetting']['scope.userInfo']) {
            wx.openSetting({
              success: (res) => {
                console.log('authorize')
                wx.authorize({
                  scope: 'scope.userInfo',
                  success() {
                    app.authorize(function (user) {
                      console.log(user);
                      that.initData();
                    })
                  },
                  fail() {
                    console.log('authorize failed')
                  }
                })
              }
            })

          }else{
            app.login(function (user) {
              console.log(user);
              that.initData();
            }, function (errMsg) {
              if (errMsg == 'getUserInfo:fail auth deny') {
                wx.showModal({
                  title: '提示',
                  content: '在设置页面授权获取用户信息，再点刷新页面',
                  confirmText: '我知道了',
                  showCancel: false
                })
              } else {
                console.log(errMsg)
              }

            })
          }
        }
      })
    } else {
      console.log('login')
      app.login(function (user) {
        console.log(user);
        that.initData();
      }, function (errMsg) {
        if (errMsg == 'getUserInfo:fail auth deny') {
          wx.showModal({
            title: '提示',
            content: '在设置页面授权获取用户信息，再点刷新页面',
            confirmText: '我知道了',
            showCancel: false
          })
        } else {
          console.log(errMsg)
        }

      })

    }


  },
  loadData: function () {
    var that = this;
    if (that.data.info.hasMore) {
      if (!that.data.isLoading) {
        that.setData({ 'isLoading': true });
        var param = { 'id': app.globalData.user.objectId, page: that.data.info.page };
        AV.Cloud.run('works', param).then(function (result) {
          console.log('加载第' + that.data.info.page + '页数据');
          // 调用成功，得到成功的应答 data
          console.log(result)
          if (result.code == 200) {
            that.setData({
              'isLoading': false,
              'loading.hidden': true,
              'info.hasMore': result.hasMore,
              'info.list': that.data.info.list.concat(result.data),
              'info.hidden': false,
              'info.page': that.data.info.page + 1
            })

          } else {
            that.setData({ 'isLoading': false })
          }

        }, function (err) {
          // 处理调用失败
          that.setData({ 'isLoading': false })
        });

      }

    } else {
      console.log('no more data');
    }
  },
  initData2: function () {
    var that = this;
    var initParam = {
      loading: {
        hidden: false
      },
      count: {
        works: 0,
        likes: 0,
        follower: 0
      },
      info: {
        list: [],
        hasMore: true,
        hasRefesh: true,
        isLogin: true,
        page: 1,
        hidden: true
      },
      nodata: false,
      isLoading: false
    }
    that.setData(initParam);
    var result = { "works": { "page": 1, "hasMore": true, "code": 200, "count": 27, "data": [{ "type": "music", "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000jE4g74VS43p.jpg", "name": "成都", "author":"赵雷", "time": "1天前", "likes": 0, "id": "5954d5c0570c357d06dd1f3f", "shares": 0, "content": "让我掉下眼泪的 不止昨夜的酒 让我依依不舍的 不止你的温柔 余路还要走多久 你攥着我的手 让我感到为难的 是挣扎的自由" }, { "type": "book", "img_url": "https://img3.doubanio.com/lpic/s1006056.jpg", "name": "背影", "author":"朱自清","time": "1天前", "likes": 0, "id": "595460458d6d810057302356", "shares": 0, "content": "这时我看见他的背影，我的泪很快地流下来了。我赶紧拭干了泪，怕他看见，也怕别人看见。" }, { "type": "music", "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg", "name": "告白气球", "time": "1天前", "likes": 0, "id": "59545ece5c497d005cf54c51", "shares": 0, "content": "塞纳河畔 左岸的咖啡\n我手一杯 品尝你的美\n留下唇印的嘴\n花店玫瑰 名字写错谁\n告白气球 风吹到对街\n微笑在天上飞\n你说你有点难追 想让我知难而退\n礼物不需挑最贵 只要香榭的落叶\n喔 营造浪漫的约会 不害怕搞砸一切" }, { "type": "movie", "img_url": "https://img1.doubanio.com/view/photo/large/public/p2278492238.jpg", "name": "和平饭店", "time": "1天前", "likes": 0, "id": "59545e1d5c497d005cf5458b", "shares": 0, "content": "一个人杀了一个人，他是杀人犯，是坏人。当他杀了成千上万人后，他是大英雄，是好人。" }, { "type": "word", "img_url": "https://img1.doubanio.com/view/photo/large/public/p2218744059.jpg", "name": "小王子", "time": "1天前", "likes": 0, "id": "59545de70ce4630057973219", "shares": 0, "content": "如果你说你在下午四点来，从三点钟开始，我就开始感觉很快乐，时间越临近，我就越来越感到快乐。到了四点钟的时候，我就会坐立不安，我发现了幸福的价值，但是如果你随便什么时候来，我就不知道在什么时候准备好迎接你的心情了" }, { "type": "movie", "img_url": "https://img3.doubanio.com/view/photo/photo/public/p2002649154.jpg", "name": "大话西游之大圣娶亲", "time": "2天前", "likes": 0, "id": "595385045c497d005cee9727", "shares": 0, "content": "我要这天，再遮不住我眼，要这地，再埋不了我心，要这众生，都明白我意，要那诸佛，都烟消云散！" }, { "type": "word", "img_url": "", "name": "未来告白", "time": "2天前", "likes": 0, "id": "595384e35c497d005cee95e8", "shares": 0, "content": "真的爱有时候抓不来 伪装的总赚不到关怀 要是活下来 初心不再 如何在迷雾 走出个未来 不希望活得荒凉苍白 门打开 保护膜褪下来 就像把洋葱剥开" }, { "type": "book", "img_url": "https://img3.doubanio.com/lpic/s1627352.jpg", "name": "一座城池", "time": "2天前", "likes": 0, "id": "595384b2fe88c2005fb61574", "shares": 0, "content": "我要这天，再遮不住我眼，要这地，再埋不了我心，要这众生，都明白我意，要那诸佛，都烟消云散！" }, { "type": "music", "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000YGZge12vRwH.jpg", "name": "心之焰", "time": "2天前", "likes": 0, "id": "59534ed00ce46300578e3191", "shares": 0, "content": "野风吹乱月光\n生如逐放\n心有焰藏\n谁人笑我卑伧\n被命运折断了翅膀\n坠落深渊万丈\n记忆被封藏\n这风雪多嚣张\n就算再被践踏也不仰望\n我会越挫越强\n这呼吸是热\n这心跳是光\n一点一滴酝酿一生一世的较量\n我眼中滚烫\n点燃这希望\n无论多少伤\n我愿燃尽心焰照四方\n融化人世间冰霜\n只要明月知道我所想\n长路永夜又怎样\n我要漫天心焰再滚烫\n烧出天边一道光\n浴火重生天地尽芬芳\n彼岸再盛放\n烧出天边一道光\n彼岸再盛放" }, { "type": "music",  "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M0000011IIJE3XYf9L.jpg", "name": "凉凉", "time": "3天前", "likes": 0, "id": "59527188b123db005df76402", "shares": 0, "content": "入夜渐微凉\n繁花落地成霜\n你在远方眺望\n耗尽所有暮光\n不思量自难相忘\n夭夭桃花凉\n前世你怎舍下\n这一海心茫茫\n还故作不痛不痒不牵强" }] }, "code": 200, "count": { "likes": 4, "works": 27 } };
    
      if (result.code == 200) {
        that.setData({
          'info.isLogin': true
        })
        if (result.count.works == 0) {
          that.setData({
            'userInfo': app.globalData.user,
            'loading.hidden': true,
            'nodata': true,
            'count': result.count,
            'info.hasMore': true,
            'info.hidden': false
          })
        } else {
          that.setData({
            'userInfo': app.globalData.user,
            'count': result.count,
            'loading.hidden': true,
            'nodata': false,
            'count': result.count,
            'info.list': that.data.info.list.concat(result.works.data),
            'info.hidden': false,
            'info.hasMore': result.works.hasMore,
            'info.page': that.data.info.page + 1
          })
        }

      }

 


  },
  initData: function () {
    var that = this;
    var initParam = {
      loading: {
        hidden: false
      },
      count: {
        works: 0,
        likes: 0,
        follower: 0
      },
      info: {
        list: [],
        hasMore: true,
        hasRefesh: true,
        isLogin: true,
        page: 1,
        hidden: true
      },
      nodata: false,
      isLoading: false
    }
    that.setData(initParam);
    if (!app.globalData.user || !app.globalData.user.nickName) {
      console.log('还没有授权');
      that.setData({
        'info.isLogin': false,
        'loading.hidden': true,
        'info.hidden': false
      })
      return false;
    }
    wx.setNavigationBarTitle({
      title: app.globalData.user.nickName
    });
    var param = { 'id': app.globalData.user.objectId };
    AV.Cloud.run('profile', param).then(function (result) {
      console.log('获取首页数据');
      // 调用成功，得到成功的应答 data
      console.log(JSON.stringify(result))
      if (result.code == 200) {
        that.setData({
          'info.isLogin': true
        })
        if (result.count.works == 0) {
          that.setData({
            'userInfo': app.globalData.user,
            'loading.hidden': true,
            'nodata': true,
            'count': result.count,
            'info.hasMore': true,
            'info.hidden': false
          })
        } else {
          that.setData({
            'userInfo': app.globalData.user,
            'count': result.count,
            'loading.hidden': true,
            'nodata': false,
            'count': result.count,
            'info.list': that.data.info.list.concat(result.works.data),
            'info.hidden': false,
            'info.hasMore': result.works.hasMore,
            'info.page': that.data.info.page + 1
          })
        }

      }

    }, function (err) {
       // 处理调用失败
      console.log(err.code);
      if(err.code == -1){
        console.log('closed');
        that.setData({'closed.hidden':false})
      }
     
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
