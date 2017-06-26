function toplist(data, success_func, fail_func) {
  wx.request({
    url: 'https://api.douban.com/v2/movie/top250',
    data: data,
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      console.log(res.data)
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
      console.log(res.data)
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

module.exports = {
  toplist: toplist,
  search: search
}