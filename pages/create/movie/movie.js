//explore.js
var Movie = require('../../../service/movie.js')
var Base64 = require('../../../utils/base64.js')
const AV = require('../../../utils/av-weapp-min.js');
var app = getApp()
Page({
  data: {
    slogan: 'solgan',
    id: 3364223,
    pid: 0,
    photo: '',
    content:'我要这天，再遮不住我眼，要这地，再埋不了我心，要这众生，都明白我意，要那诸佛，都烟消云散！',
    name:'神奇动物在哪里',
    loading: {
      hidden: false
    },
    creater:{
      hidden:true,
    },
    userInfo: {},
    cates: [],
    photos: {
      list: [],
      hasMore: true,
      total: 0,
      start: 0,
      limit: 21,
      hidden: true
    },
    isLoading: false,
    uploader:{hidden:false},
    preview:{hidden:true}
  },
  input: function(e){
    var that = this;
    that.setData({"content":e.detail.value});
  },
  preview: function (e) {
    var that = this;
    var data = {};
    var url = that.data.photo;
    var title = that.data.name;
    var content = that.data.content;

    data['url'] = url;
    data['content'] = content;
    data['title'] = title;
    var stringfy = JSON.stringify(data);
    console.log(stringfy)
    var base64 = Base64.encode(stringfy);
    console.log(base64);
    var link = "https://timesand.leanapp.cn/movie/preview/" + base64
    wx.previewImage({
      urls: [link]
    })
  }, 
  doMake: function (e) {
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

    console.log(app.movie);
    var card = {}
    card.public = isPublish;
    card.userid = app.globalData.user.objectId;
    card.formId = formId;
    card.name = app.movie.title;
    card.content = that.data.content;
    card.img_url = that.data.photo;
    card.db_num = parseInt(app.movie.id);
    card.extraData = JSON.stringify(app.movie);
    console.log(JSON.stringify(card));
    AV.Cloud.run('makeMovie', card).then(function (data) {
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
  formSubmit: function (e) {
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
  onReachBottom: function (e) {
    var that = this;
    console.log('加载..');
    that.loadMore();
  },
  scroll: function (e) {
    //console.log(e)
  },
  listPhotos: function(e){
    var that = this;
    that.setData({ 'creater.hidden': true, 'photos.hidden':false });
  },
  choosePhoto: function(e){
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    var that = this;
    that.setData({ 'creater.hidden': false, 'photos.hidden': true ,'pid':id,'photo':url});

  },
  loadMore:function(){
    var that = this;
    if(!that.data.creater.hidden){
       return;
    }
    if(!that.data.photos.hasMore)
       return;
    
    var start = that.data.photos.start, type = 'S', mid = that.data.id;
    var data = { start: start, type: type, mid: mid }
    Movie.fetch_photo(data, function (data) {
      console.log(data);
      var total = data.total;
      var limit = that.data.photos.limit;
      var hasMore = total > limit + start
      that.setData({
        'isLoading': false,
        'photos.start': start+limit,
        'photos.hasMore': hasMore,
        'photos.total': total,
        'photos.list': that.data.photos.list.concat(data.photos),
        'photos.hidden': false
      })
    }, function (err) {
      console.log(err);
      that.setData({ 'isLoading': false });
    });
  },
  initData: function () {
    var that = this;
    that.setData({ 'id': app.movie.id, 'name': app.movie.title});
    var start = that.data.photos.start, type = 'S', mid = that.data.id;
    var data = { start: start, type: type, mid: mid }
   
    Movie.fetch_photo(data, function (data) {
      console.log(data);
      var total = data.total;
      var limit = that.data.photos.limit;
      var hasMore = total > limit + start
      if (data.photos.length >0 ){
        that.setData({ 'preview.hidden': false, 'uploader.hidden': true, 'creater.hidden': false, 'photo':data.photos[0].large});
      }else{
        that.setData({ 'preview.hidden': true, 'uploader.hidden': false, 'creater.hidden': false });
      }
      that.setData({      
        'photos.start': limit,
        'photos.hasMore': hasMore,
        'loading.hidden': true,
        'photos.total':total,
        'photos.list': data.photos,
        'photos.hidden': true
      })
    }, function (err) {
      console.log(err);
    });
    

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
