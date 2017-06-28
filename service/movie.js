function toplist(data, success_func, fail_func) {
  wx.request({
    url: 'https://api.douban.com/v2/movie/top250',
    data: data,
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      //console.log(res.data)
      if (res.statusCode == 200) {
        typeof success_func == "function" && success_func(res.data)
      } else {
        typeof fail_func == "function" && fail_func(res)
      }

    },
    fail: function (res) {
      console.log(res)
      typeof fail_func == "function" && fail_func(res)
    }
  })
}

function search(data, success_func, fail_func) {
  wx.request({
    url: 'https://api.douban.com/v2/movie/search',
    data: data,
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      //console.log(res.data)
      if (res.statusCode == 200) {
        typeof success_func == "function" && success_func(res.data)
      } else {
        typeof fail_func == "function" && fail_func(res)
      }

    },
    fail: function (res) {
      console.log(res)
      typeof fail_func == "function" && fail_func(res)
    }
  })
}
function fetch_photo(data, success_func, fail_func) {
  wx.request({
    url: 'https://m.douban.com/j/fetch_photo',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      //console.log(res)
      var result = {}
      if (res.statusCode == 200) {
        for (var i in res.data.photos) {
          var idreg = /photo\/(.*?)\?type/
          //console.log(idreg.exec(res.data.photos[i]['url']))
          res.data.photos[i].id = idreg.exec(res.data.photos[i]['url'])[1];
          res.data.photos[i].thumb = res.data.photos[i]['imgurl'].replace('lthumb', 'thumb');
          res.data.photos[i].photo = res.data.photos[i]['imgurl'].replace('lthumb', 'photo');
          res.data.photos[i].large = res.data.photos[i]['imgurl'].replace('lthumb', 'large');
          res.data.photos[i].raw = res.data.photos[i]['imgurl'].replace('lthumb', 'raw');
        }
        typeof success_func == "function" && success_func(res.data)
      } else {
        //豆瓣报500
        result['errMsg'] = 'db:fail';
        typeof fail_func == "function" && fail_func(result)
      }


    }, fail: function (err) {
      //连接 请求失败，豆瓣服务器宕机等
      typeof fail_func == "function" && fail_func(err)
    }
  })
}
module.exports = {
  toplist: toplist,
  search: search,
  fetch_photo: fetch_photo
}