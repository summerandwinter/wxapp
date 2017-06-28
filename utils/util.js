const AV = require('av-weapp-min.js');
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function showShareMenu() {
  if (wx.showShareMenu) {
    wx.showShareMenu({
      withShareTicket: true
    })
  }
}
function setClipboardData(content) {
  if (wx.setClipboardData) {
    wx.setClipboardData({
      data: content,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '您的微信版本太低，不支持复制功能',
      confirmText: '我知道了',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  }
}
function sayHello(name) {
  console.log('Hello ' + name);
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
          res.data.photos[i].thumb = res.data.photos[i]['imgurl'].replace('lthumb','thumb');
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
function parseLyric(lrc) {
  var lyrics = lrc.split("\n");
  var lrcArr = [];
  var index = 1;
  for (var i = 0; i < lyrics.length; i++) {
    var lyric = decodeURIComponent(lyrics[i]);
    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
    var ignoreReg = /.*[：|-].*/g;
    var ignoreExpArr = lyric.match(ignoreReg);
    //console.log(ignoreExpArr);
    var timeRegExpArr = lyric.match(timeReg);
    if (!timeRegExpArr || ignoreExpArr) continue;
    var clause = lyric.replace(timeReg, '');
    if (clause.length > 0) {
      var data = {}
      data.index = index;
      data.text = clause;
      data.type = 'circle'
      lrcArr.push(data);
      index++;
    }

    //console.log(clause);

  }
  return lrcArr;
}
/**
 * 
 * 获取播放key：http://base.music.qq.com/fcgi-bin/fcg_musicexpress.fcg?json=3&loginUin={0}&format=jsonp&inCharset=GB2312&outCharset=GB2312&notice=0&platform=yqq&needNewCode=0
 * {0}=默认为0,是登录的QQ号ID
 * 返回
 * jsonCallback({"code":0,"sip"["http://ws.stream.qqmusic.qq.com/","http://cc.stream.qqmusic.qq.com/" "http://124.14.15.19/streamoc.music.tc.qq.com/"
"key":"6BFDD0DFE8A88C65E5D7942967AE84A1F7BC2A96A9120C15A5032483EA5D0659"})
 * key=6BFDD0DFE8A88C65E5D7942967AE84A1F7BC2A96A9120C15A5032483EA5D0659
 * 播放歌曲API：http://cc.stream.qqmusic.qq.com/C200{0}.m4a?vkey={1}&fromtag=0
 * {0}=song_mid
 * {1}=上面取到的KEY

例子：http://cc.stream.qqmusic.qq.com/C200001Js78a40BZU6.m4a?vkey=6BFDD0DFE8A88C65E5D7942967AE84A1F7BC2A96A9120C15A5032483EA5D0659&fromtag=0


 */
function get_key() {

}

function search_qq_music(data, success_func, fail_func) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1462662066&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=0&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.al&p=' + data.p + '&n=' + data.l + '&w=' + data.q;
  console.log(url);
  wx.request({
    url: url,
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      //console.log(res)
      var result = {}
      if (res.statusCode == 200) {

        var json = res.data;
        if (json.code == 0) {
          //console.log(json.data.song);
          result['curnum'] = json.data.song.curnum;
          result['curpage'] = json.data.song.curpage;
          result['totalnum'] = json.data.song.totalnum;
          var dataList = [];
          for (var i in json.data.song.list) {
            var high = '500x500';
            var medium = '300x300'; //68,90,300,500
            var thumb = '68x68';
            var albummid = json.data.song.list[i].albummid;
            var cover = {};
            cover['thumb'] = 'https://y.gtimg.cn/music/photo_new/T002R' + thumb + 'M000' + albummid + '.jpg';
            cover['medium'] = 'https://y.gtimg.cn/music/photo_new/T002R' + medium + 'M000' + albummid + '.jpg';
            cover['high'] = 'https://y.gtimg.cn/music/photo_new/T002R' + high + 'M000' + albummid + '.jpg';
            json.data.song.list[i]['cover'] = cover;

            for (var j in json.data.song.list[i].singer) {
              var singermid = json.data.song.list[i].singer[j].mid;
              var avatar = {}
              avatar['thumb'] = 'https://y.gtimg.cn/music/photo_new/T001R' + thumb + 'M000' + singermid + '.jpg';
              avatar['medium'] = 'https://y.gtimg.cn/music/photo_new/T001R' + medium + 'M000' + singermid + '.jpg';
              avatar['high'] = 'https://y.gtimg.cn/music/photo_new/T001R' + high + 'M000' + singermid + '.jpg';
              json.data.song.list[i].singer[j]['avatar'] = avatar;
              console.log(JSON.stringify(json.data.song.list[i]));
            }
          }
          //console.log(json.data.song);
          typeof success_func == "function" && success_func(json.data.song);
          //console.log(songs)

        } else {
          console.log("接口返回错误")
          result['errMsg'] = 'qqmusic api:fail';
          typeof fail_func == "function" && fail_func(result)
        }
      } else {
        console.log("请求失败");
        result['errMsg'] = 'qqmusic request:fail';
        typeof fail_func == "function" && fail_func(result)
      }


    }, fail: function (err) {
      //连接 请求失败，豆瓣服务器宕机等
      typeof fail_func == "function" && fail_func(err)
    }
  })
}


function get_toplist_music(data, success_func, fail_func) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&type=top&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&topid='+data.topid+'&song_begin='+data.begin+'&song_num='+data.num;
  console.log(url);
  wx.request({
    url: url,
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      var result = {}
      if (res.statusCode == 200) {

        var json = res.data;
        if (json.code == 0) {
          var dataList = [];
          for (var i in json.songlist) {
            var high = '500x500';
            var medium = '300x300'; //68,90,300,500
            var thumb = '68x68';
            var albummid = json.songlist[i].data.albummid;
            var cover = {};
            cover['thumb'] = 'https://y.gtimg.cn/music/photo_new/T002R' + thumb + 'M000' + albummid + '.jpg';
            cover['medium'] = 'https://y.gtimg.cn/music/photo_new/T002R' + medium + 'M000' + albummid + '.jpg';
            cover['high'] = 'https://y.gtimg.cn/music/photo_new/T002R' + high + 'M000' + albummid + '.jpg';
            json.songlist[i]['data']['cover'] = cover;

            for (var j in json.songlist[i].data.singer) {
              var singermid = json.songlist[i].data.singer[j].mid;
              var avatar = {}
              avatar['thumb'] = 'https://y.gtimg.cn/music/photo_new/T001R' + thumb + 'M000' + singermid + '.jpg';
              avatar['medium'] = 'https://y.gtimg.cn/music/photo_new/T001R' + medium + 'M000' + singermid + '.jpg';
              avatar['high'] = 'https://y.gtimg.cn/music/photo_new/T001R' + high + 'M000' + singermid + '.jpg';
              json.songlist[i].data.singer[j]['avatar'] = avatar;
              //console.log(JSON.stringify(json.songlist[i]));
            }
          }
          //console.log(json.data.song);
          typeof success_func == "function" && success_func(json.songlist);
          //console.log(songs)

        } else {
          console.log("接口返回错误")
          result['errMsg'] = 'qqmusic api:fail';
          typeof fail_func == "function" && fail_func(result)
        }
      } else {
        console.log("请求失败");
        result['errMsg'] = 'qqmusic request:fail';
        typeof fail_func == "function" && fail_func(result)
      }


    }, fail: function (err) {
      //连接 请求失败，豆瓣服务器宕机等
      typeof fail_func == "function" && fail_func(err)
    }
  })
}


/**
* 歌曲图片API：http://imgcache.qq.com/music/photo/mid_album_90/{1}/{2}/{0}.jpg
* {0}=album_mid
* {1]=album_mid的倒数第二个字符
* {2}=album_mid的最后一个字符
* 例子：http://imgcache.qq.com/music/photo/mid_album_90/I/D/001uqejs3d6EID.jpg
* 
*/
function search_qq_music2(data, success_func, fail_func) {
  var url = 'http://s.music.qq.com/fcgi-bin/music_search_new_platform?loginUin=0&format=json&inCharset=utf-8&outCharset=utf-8&platform=jqminiframe.json&needNewCode=0&catZhida=0&remoteplace=sizer.newclient.next_song&p=' + data.p + '&n=' + data.l + '&w=' + data.q;
  console.log(url);
  wx.request({
    url: url,
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      //console.log(res)
      var result = {}
      if (res.statusCode == 200) {

        var json = res.data;
        if (json.code == 0) {
          var songs = json.data.song.list;
          console.log(json.data.song);
          result['curnum'] = json.data.song.curnum;
          result['curpage'] = json.data.song.curpage;
          result['totalnum'] = json.data.song.totalnum;
          var dataList = [];
          for (var i in songs) {
            var data = {};
            var fs = songs[i]['f'].split("|");
            var big = '300x300'; //68,90,300,500
            var thumb = '68x68';
            data['song_id'] = fs[0];
            data['song_name'] = fs[1];
            data['singer_id'] = fs[2];
            data['singer_name'] = fs[3];
            data['album_id'] = fs[4];
            data['album_name'] = fs[5];
            data['song_mid'] = fs[20];
            data['singer_mid'] = fs[21];
            data['album_mid'] = fs[22];
            data['album_cover'] = 'https://y.gtimg.cn/music/photo_new/T002R' + big + 'M000' + data['album_mid'] + '.jpg';
            data['singer_cover'] = 'https://y.gtimg.cn/music/photo_new/T001R' + big + 'M000' + data['singer_mid'] + '.jpg';
            //console.log(data);
            dataList.push(data)
          }
          result['data'] = dataList;
          typeof success_func == "function" && success_func(result);
          //console.log(songs)

        } else {
          console.log("接口返回错误")
          result['errMsg'] = 'qqmusic api:fail';
          typeof fail_func == "function" && fail_func(result)
        }
      } else {
        console.log("请求失败");
        result['errMsg'] = 'qqmusic request:fail';
        typeof fail_func == "function" && fail_func(result)
      }


    }, fail: function (err) {
      //连接 请求失败，豆瓣服务器宕机等
      typeof fail_func == "function" && fail_func(err)
    }
  })
}
/**
 * 歌词API：http://music.qq.com/miniportal/static/lyric/{1}/{0}.xml

{0}=上面取到的Lrc

{1}=上面取到的Lrc%100

例子：http://music.qq.com/miniportal/static/lyric/14/101369814.xml

这个LRC有时会失效的
 */
function getLyric(songid, songmid, success_func, fail_func) {
  wx.request({
    url: 'https://music.qq.com/miniportal/static/lyric/' + (parseInt(songid) % 100) + '/' + songid + '.xml',
    data: {},
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      //console.log(res)
      var result = {}
      if (res.statusCode == 200) {

        var html = res.data;
        html = html.replace(/>\s+([^\s<]*)\s+</g, '>$1<').trim();
        //console.log(html)
        var reg = /\[CDATA\[([\W\w]*?)\]\]/g;
        var lyrics = reg.exec(html);
        if (lyrics && lyrics.length == 2) {
          var content = lyrics[1]
          var result = parseLyric(content)
          //console.log(result);
          typeof success_func == "function" && success_func(result)
        }

      } else {
        console.log(res)
        var params = { 'mid': songmid };
        AV.Cloud.run('getlyric', params).then(function (result) {
          console.log(result)
          if (result.code == 200) {
            var lyrics = result.data;
            var lrcArr = [];
            var index = 1;
            for (var i = 0; i < lyrics.length; i++) {
              var lyric = lyrics[i];
              var data = {}
              data.index = index;
              data.text = lyric;
              data.type = 'circle'
              lrcArr.push(data);
              index++;
            }
            typeof success_func == "function" && success_func(lrcArr)
          } else {
            console.log(result);
            typeof fail_func == "function" && fail_func(result.message)
          }
        }, function (err) {
          console.log(err)
        });

      }


    }, fail: function (err) {
      //连接 请求失败，豆瓣服务器宕机等
      typeof fail_func == "function" && fail_func(err)
    }
  })
}
function dbSearch(data, success_func, fail_func) {
  wx.request({
    url: 'https://m.douban.com/j/search',
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res)
      var result = {}
      if (res.statusCode == 200) {
        var count = res.data.count;
        var limit = res.data.limit;
        var html = res.data.html;
        html = html.replace(/<!--[\s\S]*?-->/g, '');  //去除html注释
        html = html.replace(/>\s+([^\s<]*)\s+</g, '>$1<').trim();  //去除html标签间的多余空白
        console.log(html);
        var reg = /<li>(.*?)<\/li>/g;
        var items;
        var list = []
        while ((items = reg.exec(html))) {
          console.log(items);
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
  formatTime: formatTime,
  sayHello: sayHello,
  showShareMenu: showShareMenu,
  setClipboardData: setClipboardData,
  dbSearch: dbSearch,
  fetch_photo: fetch_photo,
  getLyric: getLyric,
  search_qq_music: search_qq_music,
  get_toplist_music: get_toplist_music
}
