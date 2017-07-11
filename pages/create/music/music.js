//explore.js
var Music = require('../../../service/music.js');
var Base64 = require('../../../utils/base64.js');
const AV = require('../../../utils/av-weapp-min.js');
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    id: 1003000,
    pid: 0,
    cover: '',
    covers:[],
    currentCover: 0,
    name: '',
    loading: {
      hidden: false
    },
    creater: {
      hidden: false,
    },
    controller:{
      'class':'icon-play',
      'hidden':true,
      'wave':''
    },
    editor:{hidden:false},
    lyric:{hidden:true},
    music: {  },
    items: [],
    content:'',
    userInfo: {},
    cates: [],
    isLoading: false,
    uploader: { hidden: false },
    preview: { hidden: true }
  },
  input: function (e) {
    var that = this;
    that.setData({ "content": e.detail.value });
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
      var checked = [];
      for (var i = 0; i < items.length; i++) {
        if (items[i].type == 'success_circle') {
          checked.push(items[i].text);
        }
      }
      if (checked.length > 13) {
        wx.showModal({ title: '提示', content: '最多选择13行歌词' })
        return;
      }
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
  play:function(e){
    console.log(e);
    var that = this;
    var style = e.currentTarget.dataset.style;
    if(style == 'icon-play'){
      wx.playBackgroundAudio(that.data.playData);
      that.setData({ 'controller.class': 'icon-stop', 'controller.wave': 'move'});
    }else{
      wx.pauseBackgroundAudio();
      that.setData({ 'controller.class': 'icon-play','controller.wave':'' });
    }
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
  doMake: function(e){
    var isPublish = false;
    if (e.detail.target.id == 'publish') {
      isPublish = true
    }
    var that = this;
    var data = e.detail.value;
    var formId = e.detail.formId;

    if (that.data.content.length < 1) {
      wx.showModal({ title: '提示', content: '内容不能为空' })
      return;
    }
    wx.showLoading({
      title: '制作中',
    })

    var singers = [];
    for (var i in that.data.music.singer) {
      singers.push(that.data.music.singer[i].name);
    }
    var songname = that.data.music.songname;
    var atuhor = singers.join('/');
    var card = {}
    card.public = isPublish;
    card.userid = app.globalData.user.objectId;
    card.formId = formId;
    card.author = atuhor;
    card.name = songname;
    card.content = that.data.content;
    card.img_url = that.data.cover;
    card.db_num = that.data.music.songid;
    card.extraData = JSON.stringify(that.data.music);
    console.log(JSON.stringify(card));
    AV.Cloud.run('makeMusic', card).then(function (data) {
      // 调用成功，得到成功的应答 data
      console.log(data)
      if (data.code == 200) {
        wx.redirectTo({
          url: '/pages/detail/detail?id=' + data.data
        })
      }

    }, function (err) {
      // 处理调用失败
    });
  },
  formSubmit:function(e){
    console.log(e);
    var that = this;
    if (app.globalData.user && app.globalData.user.nickName) {
      console.log('直接保存')
      that.doMake(e);
    } else {
      console.log('需要授权')
      app.authorize(function (user) {
        that.doMake(e);
      }, function (res) {
        console.log(res);
      })
    }
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
   
    Music.getLyric(that.data.music.songid, that.data.music.songmid,function(data){
      console.log(JSON.stringify(data));
      that.setData({'items':data,'lyric.hidden':false,'editor.hidden':true})
    },function(err){
      console.log(err)
      that.setData({ 'lyric.hidden': true, 'editor.hidden': false })
    });
    
    Music.getMusic(that.data.music.songmid,function(data){
      console.log(data)
      var playData = {
        dataUrl: data,
        title: that.data.music.songname,
        coverImgUrl: that.data.music.cover.thumb
      }
      that.setData({ playData: playData, 'controller.hidden': false });
      /*
      wx.playBackgroundAudio({
        dataUrl: data,
        title: that.data.music.songname,
        coverImgUrl: that.data.music.cover.thumb,
        success:function(e){
          console.log('成功');
          console.log(e);
        }, fail: function (e) {
          console.log('失败');
          console.log(e);
        }, complete: function (e) {
          console.log('完成');
          //wx.pauseBackgroundAudio();
          console.log(e);
          wx.getBackgroundAudioPlayerState({
            success: function (res) {
              console.log(res)
              var status = res.status
              if(status != 2){
                that.setData({  'controller.hidden': false });
              }
 
            }
          })
        }
        
      });
      */
    },function(err){
      console.log(err)
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
