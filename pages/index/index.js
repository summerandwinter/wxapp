//explore.js
//获取应用实例
var util = require('../../utils/util.js');
const AV = require('../../utils/av-weapp-min.js');
const Card = require('../../model/card');
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
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
  onPullDownRefresh: function (e) {
    console.log('init')
    var that = this;
    wx.stopPullDownRefresh();
    //that.initData();
  },
  initData2:function(){
    var that = this;
    var data = [

      {
        "name": "未来告白",
        "time": "17小时前",
        "shares": 0,
        "content": "真的爱有时候抓不来\n伪装的总赚不到关怀\n要是活下来\n初心不再\n如何在迷雾\n走出个未来\n不希望活得荒凉苍白\n门打开\n保护膜褪下来\n就像把洋葱剥开",
        "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003HdkdY0c4LaM.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "music",
        "likes": 0,
        "author": "汪苏泷",
        "views": 3,
        "downloads": 0,
        "id": "595384e35c497d005cee95e8"
      },{
        "name": "心之焰",
        "time": "21小时前",
        "shares": 0,
        "content": "野风吹乱月光\n生如逐放\n心有焰藏\n谁人笑我卑伧\n被命运折断了翅膀\n坠落深渊万丈\n记忆被封藏\n这风雪多嚣张\n就算再被践踏也不仰望\n我会越挫越强\n这呼吸是热\n这心跳是光\n一点一滴酝酿一生一世的较量\n我眼中滚烫\n点燃这希望\n无论多少伤\n我愿燃尽心焰照四方\n融化人世间冰霜\n只要明月知道我所想\n长路永夜又怎样\n我要漫天心焰再滚烫\n烧出天边一道光\n浴火重生天地尽芬芳\n彼岸再盛放\n烧出天边一道光\n彼岸再盛放",
        "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M000000YGZge12vRwH.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "music",
        "likes": 0,
        "author": "G.E.M. 邓紫棋",
        "views": 2,
        "downloads": 0,
        "id": "59534ed00ce46300578e3191"
      },{
        "name": "告白气球",
        "time": "1小时前",
        "shares": 0,
        "content": "塞纳河畔 左岸的咖啡\n我手一杯 品尝你的美\n留下唇印的嘴\n花店玫瑰 名字写错谁\n告白气球 风吹到对街\n微笑在天上飞\n你说你有点难追 想让我知难而退\n礼物不需挑最贵 只要香榭的落叶\n喔 营造浪漫的约会 不害怕搞砸一切",
        "img_url": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003RMaRI1iFoYd.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "music",
        "likes": 0,
        "author": "周杰伦",
        "views": 1,
        "downloads": 0,
        "id": "59545ece5c497d005cf54c51"
      },{
        "name": "大话西游之大圣娶亲",
        "time": "17小时前",
        "shares": 0,
        "content": "我要这天，再遮不住我眼，要这地，再埋不了我心，要这众生，都明白我意，要那诸佛，都烟消云散！",
        "img_url": "https://img3.doubanio.com/view/photo/photo/public/p2002649154.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "word",
        "likes": 0,
        "author": null,
        "views": 4,
        "downloads": 0,
        "id": "595385045c497d005cee9727"
      },{
        "name": "背影",
        "time": "1小时前",
        "shares": 0,
        "content": "这时我看见他的背影，我的泪很快地流下来了。我赶紧拭干了泪，怕他看见，也怕别人看见。",
        "img_url": "https://img3.doubanio.com/lpic/s1006056.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "book",
        "likes": 0,
        "author": "朱自清",
        "views": 1,
        "downloads": 0,
        "id": "595460458d6d810057302356"
      },{
        "name": "小王子",
        "time": "1小时前",
        "shares": 0,
        "content": "如果你说你在下午四点来，从三点钟开始，我就开始感觉很快乐，时间越临近，我就越来越感到快乐。到了四点钟的时候，我就会坐立不安，我发现了幸福的价值，但是如果你随便什么时候来，我就不知道在什么时候准备好迎接你的心情了",
        "img_url": "https://img1.doubanio.com/view/photo/large/public/p2218744059.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "59545de70ce4630057973219"
      },
      
      {
        "name": "和平饭店",
        "time": "1小时前",
        "shares": 0,
        "content": "一个人杀了一个人，他是杀人犯，是坏人。当他杀了成千上万人后，他是大英雄，是好人。",
        "img_url": "https://img1.doubanio.com/view/photo/large/public/p2278492238.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "59545e1d5c497d005cf5458b"
      },
      
      {
        "name": "这个杀手不太冷",
        "time": "4小时前",
        "shares": 47,
        "content": "Is life always this hard,or is it just when you are a kid?\r人生总是那么痛苦吗？还是只有小时候是这样？\rAlways like this.\r总是如此。",
        "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1469372904",
        "user": {
          "nickName": "天天码图",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://7rfkul.com1.z0.glb.clouddn.com/logo.png",
          "city": "Nanjing",
          "id": "590be679ac502e006cdc63c0"
        },
        "type": "movie",
        "likes": 577,
        "author": null,
        "views": 0,
        "downloads": 0,
        "id": "595435efac502e006ca846f7"
      },
      {
        "name": "哈尔的移动城堡",
        "time": "4小时前",
        "shares": 61,
        "content": "爱，不是寻找一个完美的人，而是学会用完美的眼光，欣赏那个并不完美的人。",
        "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1469203018",
        "user": {
          "nickName": "天天码图",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://7rfkul.com1.z0.glb.clouddn.com/logo.png",
          "city": "Nanjing",
          "id": "590be679ac502e006cdc63c0"
        },
        "type": "movie",
        "likes": 429,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "595435efac502e006ca846f6"
      },
      {
        "name": "盗梦空间",
        "time": "4小时前",
        "shares": 57,
        "content": "So do you want to take a leap of faith or become an old man, filled with regret, waiting to die alone?\r那么，你是想放手一搏，还是要等到年华老去，心中充满遗憾，孤独地迈向黄泉路？",
        "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1469202537",
        "user": {
          "nickName": "天天码图",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://7rfkul.com1.z0.glb.clouddn.com/logo.png",
          "city": "Nanjing",
          "id": "590be679ac502e006cdc63c0"
        },
        "type": "movie",
        "likes": 305,
        "author": null,
        "views": 0,
        "downloads": 0,
        "id": "595435ef8d6d8100572e9182"
      },
      {
        "name": "一级恐惧",
        "time": "4小时前",
        "shares": 19,
        "content": "love hurts\r爱即是伤害。",
        "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1469096719",
        "user": {
          "nickName": "天天码图",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://7rfkul.com1.z0.glb.clouddn.com/logo.png",
          "city": "Nanjing",
          "id": "590be679ac502e006cdc63c0"
        },
        "type": "movie",
        "likes": 205,
        "author": null,
        "views": 0,
        "downloads": 0,
        "id": "595435ef8d6d8100572e9181"
      },
      {
        "name": "泰坦尼克号",
        "time": "4小时前",
        "shares": 154,
        "content": "You jump ,I jump.（生死相随）",
        "img_url": "http://7xqnv7.com2.z0.glb.qiniucdn.com/usersharemovie_1464005508",
        "user": {
          "nickName": "天天码图",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://7rfkul.com1.z0.glb.clouddn.com/logo.png",
          "city": "Nanjing",
          "id": "590be679ac502e006cdc63c0"
        },
        "type": "movie",
        "likes": 603,
        "author": null,
        "views": 0,
        "downloads": 0,
        "id": "595435ef0ce463005795b8f1"
      },
      {
        "name": "小程序注册师：裴玲",
        "time": "14小时前",
        "shares": 0,
        "content": "我分享一个最近热潮的小程序段子：\nAPP 如原配，一年不用几次； \n服务号如情人，一个月固定几次； \n订阅号如酒店小卡片，天天可以卖广告； \n小程序像炮友，用完就走。",
        "img_url": "http://ac-7C7MfP24.clouddn.com/cda43f34a42dece32173",
        "user": {
          "nickName": "电商运营规划师 郭少",
          "gender": 1,
          "province": "",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmaQhicic106hJRPrlmMRdumChBgu6Z1LiaZ2tkmIEecNrMX6fMibknSlfnoUFY1rU6JEhmINo8OwwLQ/0",
          "city": "",
          "id": "594205455c497d006bbf8181"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 1,
        "id": "5953a74c5c497d005cf05366"
      },
      {
        "name": "小程序注册师：郭少",
        "time": "14小时前",
        "shares": 1,
        "content": "我分享一个最近热潮的小程序段子：\nAPP 如原配，一年不用几次； \n服务号如情人，一个月固定几次； \n订阅号如酒店小卡片，天天可以卖广告； \n小程序像炮友，用完就走。",
        "img_url": "http://ac-7C7MfP24.clouddn.com/0a0d6d9b47c70a525002",
        "user": {
          "nickName": "电商运营规划师 郭少",
          "gender": 1,
          "province": "",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmaQhicic106hJRPrlmMRdumChBgu6Z1LiaZ2tkmIEecNrMX6fMibknSlfnoUFY1rU6JEhmINo8OwwLQ/0",
          "city": "",
          "id": "594205455c497d006bbf8181"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 2,
        "downloads": 1,
        "id": "5953a4be0ce4630057924cdb"
      },
      {
        "name": "小程序金牌注册师：郭少",
        "time": "15小时前",
        "shares": 1,
        "content": "郭少分享一个关于小程序的段子：\nAPP 如原配，一年不用几次； \n服务号如情人，一个月固定几次； \n订阅号如酒店小卡片，天天可以卖广告； \n小程序像炮友，用完就走。",
        "img_url": "http://ac-7C7MfP24.clouddn.com/91bd35ce1285930a638a",
        "user": {
          "nickName": "电商运营规划师 郭少",
          "gender": 1,
          "province": "",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmaQhicic106hJRPrlmMRdumChBgu6Z1LiaZ2tkmIEecNrMX6fMibknSlfnoUFY1rU6JEhmINo8OwwLQ/0",
          "city": "",
          "id": "594205455c497d006bbf8181"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "5953a3ee0ce4630057924368"
      },
      
      {
        "name": "一座城池",
        "time": "17小时前",
        "shares": 0,
        "content": "我要这天，再遮不住我眼，要这地，再埋不了我心，要这众生，都明白我意，要那诸佛，都烟消云散！",
        "img_url": "https://img3.doubanio.com/lpic/s1627352.jpg",
        "user": {
          "nickName": "一言",
          "gender": 1,
          "province": "Jiangsu",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6ra6icibeicqZcnZTtxhWRd2SlgeDzYCfJoXvhveRDq2RsTia0wfBxicYQ5ZaS4r2WYAKxDYmVvn7nNA/0",
          "city": "Nanjing",
          "id": "5948f60f8d6d81cc72ffa9d8"
        },
        "type": "book",
        "likes": 0,
        "author": "韩寒",
        "views": 3,
        "downloads": 0,
        "id": "595384b2fe88c2005fb61574"
      },
      {
        "name": "",
        "time": "17小时前",
        "shares": 0,
        "content": "人手一本",
        "img_url": "http://ac-7C7MfP24.clouddn.com/21987d957b27d9306789",
        "user": {
          "nickName": "道行天下",
          "gender": 1,
          "province": "Hebei",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/dDJ4sIjfbvFSXdbIMXOwZsc94wzaqkqCtFj6eSRMlocyX8F11GKzoS4WA8P8tQtAWoL3eT3XRyu6CicX9tnXOMg/0",
          "city": "Xingtai",
          "id": "59437598ac502e006c74d6c8"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "59537d29b123db005d00621f"
      },
      
      {
        "name": "",
        "time": "21小时前",
        "shares": 0,
        "content": "握的不是草，是生命",
        "img_url": "http://ac-7C7MfP24.clouddn.com/9daafb425036d4cd119c",
        "user": {
          "nickName": "徵",
          "gender": 1,
          "province": "Beijing",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJV8b5F5w9TRiaib4db1kI4UtTS4jbngsJJfMUyaqcKVLLRXbdETA9AlicqBR29jyxMbjd26roauVSicQ/0",
          "city": "Chaoyang",
          "id": "5953484e5c497d005cebf4ea"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "595348c78d6d810057269b6e"
      },
      {
        "name": "教育",
        "time": "21小时前",
        "shares": 0,
        "content": "道理，是给明白人讲的。教育，是为有心学习者准备的。",
        "img_url": "http://ac-7C7MfP24.clouddn.com/e111d5320919a633a7f8",
        "user": {
          "nickName": "小昂妈妈",
          "gender": 2,
          "province": "Anhui",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/7ySHcibmIicHxRdltjaSZotuvQY6F38LiabqrHGE0r6WgicZ8I1VHyFiaJd7oHn808k15mLT60nLRMKKddIia79qPYLg/0",
          "city": "Anqing",
          "id": "594346c8ac502e006c70a479"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "595343398d6d81005726600c"
      },
      {
        "name": "冯冯冯",
        "time": "1天前",
        "shares": 0,
        "content": "大家好，欢迎收看《柠檬说王者》。6月26日迎来一波大更新，王者浪一夏，此次更新包括社交、装备、战力、段位等多项局内调整优化，这些对于高手来说都不算什么，很多人最关心的还是英雄的调整。今天小编就来为大家介绍一下。大家好，欢迎收看《柠檬说王者》。6月26日迎来一波大更新，王者浪一夏，",
        "img_url": "http://ac-7C7MfP24.clouddn.com/d56dc37f650b26adc860",
        "user": {
          "nickName": "V",
          "gender": 1,
          "province": "Guangdong",
          "avatarUrl": "http://wx.qlogo.cn/mmopen/vi_32/ceA0wkCibZIjoIZ3RoHibahuf8IRJh5aTthBlO8glf23A7krLaYdiaU8eMJiaKt0FuSoEolh7D6TibvolhxfaThdlfg/0",
          "city": "Shenzhen",
          "id": "595316c0128fe100654c169b"
        },
        "type": "movie",
        "likes": 0,
        "author": null,
        "views": 1,
        "downloads": 0,
        "id": "5953186d5c497d005ce9eb68"
      }
    ];
    that.setData({
      'info.page': 2,
      'info.hasMore': true,
      'loading.hidden': true,
      'info.list': data,
      'info.hidden': false
    })
  },
  initData: function () {
    var that = this;
    var initParam = {
      loading: {
        hidden: false
      },
      info: {
        list: [],
        hasMore: true,
        hasRefesh: true,
        page: 1,
        hidden: true
      },
      isLoading: false
    }
    that.setData(initParam);
    var page = that.data.info.page;
    var data = { 'page': page }
    AV.Cloud.run('index', data).then(function (result) {
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
  onLoad: function (options) {
    console.log('生命周期:explore-load')
    var scene = options.scene
    console.log('options')
    console.log(options)
    if (scene && scene.length >0){
      wx.navigateTo({
        url: '/pages/detail/detail?id=' + scene
      })
    }
    
    var that = this;
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
