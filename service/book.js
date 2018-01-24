function collections(data,success_func,fail_func){
  wx.request({
    url: 'https://douban.uieee.com/v2/book/user/biaohub/collections',
    data: data,
    header: {
      'Content-Type': 'json'
    },
    success: function (res) {
      //console.log(res.data)
      if(res.statusCode == 200){
        typeof success_func == "function" && success_func(res.data)
      }else{
        typeof fail_func == "function" && fail_func(res)
      }
      
    },
    fail: function(res){
      console.log(res)
      typeof fail_func == "function" && fail_func(res)
    }
  })
}

function search(data, success_func, fail_func) {
  wx.request({
    url: 'https://douban.uieee.com/v2/book/search',
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
function searchV1(data, success_func, fail_func) {
  wx.request({
    url: 'https://douban.uieee.com/j/search',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      //console.log(res)
      var result = {}
      if (res.statusCode == 200) {
        var count = res.data.count;
        var limit = res.data.limit;
        var html = res.data.html;
        html = html.replace(/<!--[\s\S]*?-->/g, '');  //去除html注释
        html = html.replace(/>\s+([^\s<]*)\s+</g, '>$1<').trim();  //去除html标签间的多余空白
        //console.log(html);
        var reg = /<li>(.*?)<\/li>/g;
        var items;
        var list = []
        while ((items = reg.exec(html))) {
         // console.log(items);
          var li = items[1];
          var idreg = /href=".*\/subject\/(.*?)\/"/
          var imgreg = /<img src="(.*?)"/
          var namereg = /<span class="subject-title">(.*?)<\/span>/
          var ratereg = /data-rating="(.*?)"/

          var id = idreg.exec(li)[1];
          var img = imgreg.exec(li)[1];
          var name = namereg.exec(li)[1];
          var rate = ratereg.exec(li) ? (parseFloat(ratereg.exec(li)[1]) / 10) : '无';
          var data = { 'id': id, 'img': img, 'name': name, 'rate': rate }
          list.push(data);
        }
        result['statusCode'] = 200;
        result['data'] = list;
        result['count'] = count;
        result['limit'] = limit;
        typeof success_func == "function" && success_func(result)
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
  collections: collections,
  search: search
}