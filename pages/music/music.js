//music.js
//获取应用实例
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    motto: '欢迎回来，',
    userInfo: {},
    cates: ["台词","感悟","人物"],
    musics: [
      {photo:"http://i.dimg.cc/fc/9a/1c/bf/ce/a3/c2/4d/91/b6/e3/8a/e0/02/7e/9c.jpg",song: "明年今日",author:"林夕",word: "有生之年能遇见你，竟花光我所有运气。"},
      {photo:"http://p4.music.126.net/JaYWNg5HQiSYyHF3bfrATQ==/5751545324970007.jpg",song: "红玫瑰",author:"陈奕迅",word: "得不到的永远在骚动，被偏爱的都有恃无恐，玫瑰的红容易受伤的梦，握在手中却流失于指缝，又落空。"},
      {photo:"http://img.zcool.cn/community/01fe4d575a31f50000018c1b7cf982.jpg@900w_1l_2o_100sh.jpg",song: "好久不见",author:"陈奕迅",word: "我多么想和你见一面 看看你最近改变 不再去说从前 只是寒暄 对你说一句 只是说一句 好久不见"},
      {photo:"http://www.yoka.com/dna/pics/Star/ba151b1a/d35e53abed111ad9ea.jpg",song: "陪安东尼度过漫长岁月",author:"陈奕迅",word: "让我再陪你一段，陪你把沿路感想活出了答案，陪你把独自孤单变成了勇敢。"},
      {photo:"http://imgcache.cjmx.com/music/201610/20161004154856569.jpg",song: "Shall We Talk",author:"陈奕迅",word: "成人只寄望收获 情人只听见承诺 为何都不大懂得努力珍惜对方"},
      {photo:"http://mingxing.facang.com/uploads/allimg/151222/111H53354-0.jpg",song: "斗战神",author:"陈奕迅",word: "不做随风飘的沙，不做秋叶上蚂蚱，不坐待冬雪融化，敢问谁敢栽我生死造化。"},
      {photo:"http://aliimg.changba.com/cache/photo/147758921_640_640.jpg",song: "不要说话",author:"陈奕迅",word: "愿意用一支黑色的铅笔，画一出沉默舞台剧。灯光再亮，也抱住你。愿意，在角落唱沙哑的歌。再大声也都是给你。"},
      {photo:"http://gb.cri.cn/mmsource/images/2012/04/26/68/18021298023368227896.jpg",song: "风继续吹",author:"张国荣",word: "风继续吹不忍远离 心里亦有泪不愿流泪望着你 过去多少快乐记忆何妨与你一起去追 要将忧郁苦痛洗去 柔情蜜意我愿记取."}
      ]
  },
  onLoad: function () {
    console.log('生命周期:music-load')
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
    console.log('生命周期:music-ready');
  },
  onShow: function() {
    
    console.log('生命周期:music-show');
  },
  onHide: function() {
    console.log('生命周期:music-hide');
  },
  onUnload: function() {
    console.log('生命周期:music-unload');
  }
})
