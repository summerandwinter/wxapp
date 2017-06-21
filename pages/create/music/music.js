//explore.js
var util = require('../../../utils/util.js')
var Base64 = require('../../../utils/base64.js')
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    id: 1003000,
    pid: 0,
    cover: 'https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg',
    covers:[],
    currentCover: 0,
    name: '绅士',
    loading: {
      hidden: false
    },
    creater: {
      hidden: false,
    },
    editor:{hidden:false},
    lyric:{hidden:true},
    music: { "albumid": 989994, "albummid": "003y8dsH2wBHlo", "albumname": "绅士", "albumname_hilight": "<span class=\"c_tx_highlight\">绅士</span>", "alertid": 11, "chinesesinger": 0, "docid": "10424675487990050362", "grp": [], "interval": 290, "isonly": 0, "lyric": "《是！尚先生》电视剧插曲", "lyric_hilight": "《是！尚先生》电视剧插曲", "msgid": 0, "nt": 597157036, "pay": { "payalbum": 0, "payalbumprice": 0, "paydownload": 0, "payinfo": 0, "payplay": 0, "paytrackmouth": 0, "paytrackprice": 0 }, "preview": { "trybegin": 61502, "tryend": 127959, "trysize": 1064541 }, "pubtime": 1433433600, "pure": 0, "singer": [{ "id": 5062, "mid": "002J4UUk29y8BY", "name": "薛之谦", "name_hilight": "薛之谦", "avatar": { "thumb": "https://y.gtimg.cn/music/photo_new/T001R68x68M000002J4UUk29y8BY.jpg", "medium": "https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg", "high": "https://y.gtimg.cn/music/photo_new/T001R500x500M000002J4UUk29y8BY.jpg" } }], "size128": 4657091, "size320": 11642443, "sizeape": 30841687, "sizeflac": 31815508, "sizeogg": 6447358, "songid": 102425546, "songmid": "001CG3wA3QkuJS", "songname": "绅士", "songname_hilight": "<span class=\"c_tx_highlight\">绅士</span>", "stream": 4, "switch": 603959, "t": 1, "tag": 10, "type": 0, "ver": 0, "vid": "", "cover": { "thumb": "https://y.gtimg.cn/music/photo_new/T002R68x68M000003y8dsH2wBHlo.jpg", "medium": "https://y.gtimg.cn/music/photo_new/T002R300x300M000003y8dsH2wBHlo.jpg", "high": "https://y.gtimg.cn/music/photo_new/T002R500x500M000003y8dsH2wBHlo.jpg" } },
    items: [{ "index": 1, "text": "绅士 - 薛之谦", "type": "circle" }, { "index": 2, "text": "词：薛之谦", "type": "circle" }, { "index": 3, "text": "曲：薛之谦", "type": "circle" }, { "index": 4, "text": "好久没见了什么角色呢", "type": "circle" }, { "index": 5, "text": "细心装扮着", "type": "circle" }, { "index": 6, "text": "白色衬衫的袖扣是你送的", "type": "circle" }, { "index": 7, "text": "尽量表现着像不在意的", "type": "circle" }, { "index": 8, "text": "频繁暴露了自欺欺人者", "type": "circle" }, { "index": 9, "text": "越掩饰越深刻", "type": "circle" }, { "index": 10, "text": "你说我说听说", "type": "circle" }, { "index": 11, "text": "忍着言不由衷的段落", "type": "circle" }, { "index": 12, "text": "我反正决定自己难过", "type": "circle" }, { "index": 13, "text": "我想摸你的头发", "type": "circle" }, { "index": 14, "text": "只是简单的试探啊", "type": "circle" }, { "index": 15, "text": "我想给你个拥抱", "type": "circle" }, { "index": 16, "text": "像以前一样可以吗", "type": "circle" }, { "index": 17, "text": "你退半步的动作认真的吗", "type": "circle" }, { "index": 18, "text": "小小的动作伤害还那么大", "type": "circle" }, { "index": 19, "text": "我只能扮演个绅士", "type": "circle" }, { "index": 20, "text": "才能和你说说话", "type": "circle" }, { "index": 21, "text": "我能送你回家吗", "type": "circle" }, { "index": 22, "text": "可能外面要下雨啦", "type": "circle" }, { "index": 23, "text": "我能给你个拥抱", "type": "circle" }, { "index": 24, "text": "像朋友一样可以吗", "type": "circle" }, { "index": 25, "text": "我忍不住从背后抱了一下", "type": "circle" }, { "index": 26, "text": "尺度掌握在不能说想你啊", "type": "circle" }, { "index": 27, "text": "你就当刚认识的绅士", "type": "circle" }, { "index": 28, "text": "闹了个笑话吧", "type": "circle" }, { "index": 29, "text": "尽量表现着善解人意的", "type": "circle" }, { "index": 30, "text": "频繁暴露了不欲人知的", "type": "circle" }, { "index": 31, "text": "越掩饰越深刻", "type": "circle" }, { "index": 32, "text": "想说听说别说", "type": "circle" }, { "index": 33, "text": "忍着言不由衷的段落", "type": "circle" }, { "index": 34, "text": "我反正注定留在角落", "type": "circle" }, { "index": 35, "text": "我想摸你的头发", "type": "circle" }, { "index": 36, "text": "只是简单的试探啊", "type": "circle" }, { "index": 37, "text": "我想给你个拥抱", "type": "circle" }, { "index": 38, "text": "像以前一样可以吗", "type": "circle" }, { "index": 39, "text": "你退半步的动作认真的吗", "type": "circle" }, { "index": 40, "text": "小小的动作伤害还那么大", "type": "circle" }, { "index": 41, "text": "我只能扮演个绅士", "type": "circle" }, { "index": 42, "text": "才能和你说说话", "type": "circle" }, { "index": 43, "text": "我能送你回家吗", "type": "circle" }, { "index": 44, "text": "可能外面要下雨啦", "type": "circle" }, { "index": 45, "text": "我能给你个拥抱", "type": "circle" }, { "index": 46, "text": "像朋友一样可以吗", "type": "circle" }, { "index": 47, "text": "我忍不住从背后抱了一下", "type": "circle" }, { "index": 48, "text": "尺度掌握在不能说想你啊", "type": "circle" }, { "index": 49, "text": "你就当刚认识的绅士", "type": "circle" }, { "index": 50, "text": "闹了个笑话吧", "type": "circle" }, { "index": 51, "text": "你能给我只左手", "type": "circle" }, { "index": 52, "text": "牵你到马路那头吗", "type": "circle" }, { "index": 53, "text": "我会像以前一样", "type": "circle" }, { "index": 54, "text": "看着来往的车子啊", "type": "circle" }, { "index": 55, "text": "我们的距离在眉间皱了下", "type": "circle" }, { "index": 56, "text": "迅速还原成路人的样子啊", "type": "circle" }, { "index": 57, "text": "越有礼貌我越害怕", "type": "circle" }, { "index": 58, "text": "绅士要放得下", "type": "circle" }],
    content:'',
    userInfo: {},
    cates: [],
    isLoading: false,
    uploader: { hidden: false },
    preview: { hidden: true }
  },
  bindCheckbox: function (e) {
    /*绑定点击事件，将checkbox样式改变为选中与非选中*/

    //拿到下标值，以在items作遍历指示用
    var index = parseInt(e.currentTarget.dataset.index);
    //原始的icon状态
    var type = this.data.items[index].type;
    var items = this.data.items;
    if (type == 'circle') {
      //未选中时
      items[index].type = 'success_circle';
    } else {
      items[index].type = 'circle';
    }

    // 写回经点击修改后的数组
    this.setData({
      items: items
    });
    // 遍历拿到已经勾选的值
    var checkedValues = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].type == 'success_circle') {
        checkedValues.push(items[i].text);
      }
    }
    console.log(checkedValues);
    // 写回data，供提交到网络
    this.setData({
      checkedValues: checkedValues,
      content: checkedValues.join('\n')
    });
  },
  changeCover: function (e) {
    var that  = this;
    console.log('点击banner');
    var covers = that.data.covers;
    var len = covers.length;
    var currentCover = that.data.currentCover;
    if (len < 1) {
      return;
    }
    if (currentCover+1 == len){
      that.setData({ 'currentCover': 0});
    }else{
      that.setData({ 'currentCover': currentCover+1 });
    }
    
    that.setData({ 'cover': covers[that.data.currentCover]});

  },
  preview: function(e){
     var that = this;
     var data = {};
     var songname = that.data.music.songname;
     var songmid = that.data.music.songmid;
     var songid = that.data.music.songid;
     var url = that.data.cover;

     var content = that.data.content;
     var singers = [];
     for (var i in that.data.music.singer) {
       singers.push(that.data.music.singer[i].name);
     }
     data['url'] = url;
     data['author'] = singers.join('/');
     data['content'] = content;
     data['title'] = songname;
     var stringfy = JSON.stringify(data);
     console.log(stringfy)
     var base64 = Base64.encode(stringfy);
     console.log(base64);
     var link = "https://timesand.leanapp.cn/music/preview/" + base64
     wx.previewImage({
       urls: [link]
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
  },
  onReachBottom: function (e) {
    var that = this;
  },
  scroll: function (e) {
    //console.log(e)
  },
  initData: function () {
    var that = this;
    console.log(app.music);
    
    that.setData({ 'loading.hidden': true, 'creater.hidden': false});
    that.setData({ music: app.music, 'cover': app.music.cover.medium });
    var covers = []
    covers.push(that.data.music.cover.medium);
    for(var i  in that.data.music.singer){
      covers.push(that.data.music.singer[i].avatar.medium);
    }
    that.setData({'covers':covers});
    console.log(covers);
    
    util.getLyric(that.data.music.songid, that.data.music.songmid,function(data){
      console.log(JSON.stringify(data));
      that.setData({'items':data,'lyric.hidden':false,'editor.hidden':true})
    },function(err){
      console.log(err)
      that.setData({ 'lyric.hidden': true, 'editor.hidden': false })
    });

  },
  change: function(e){
    console.log(e.detail.value);
    var that = this;
    that.setData({'content':e.detail.value.join('\n')});
  },
  onLoad: function () {
    console.log('生命周期:explore-load')
    var that = this;
    that.initData();

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
