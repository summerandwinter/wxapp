const AV = require('../utils/av-weapp-min.js');
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
        //console.log(res)
        var params = { 'mid': songmid };
        AV.Cloud.run('getlyric', params).then(function (result) {
          //console.log(result)
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
            //console.log(result);
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
function get_toplist_music(data, success_func, fail_func) {
  var url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&type=top&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&topid=' + data.topid + '&song_begin=' + data.begin + '&song_num=' + data.num;
  //console.log(url);
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

function search_qq_music(data, success_func, fail_func) {
  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=1462662066&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=0&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&remoteplace=txt.mqq.al&p=' + data.p + '&n=' + data.l + '&w=' + data.q;
  //console.log(url);
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
function getMusic(mid, success_func, fail_func){
  var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg?json=3&guid=1278601928&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf8&notice=0&platform=yqq&needNewCode=0';
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
          var key = json.key;
          console.log(key);
          var url = 'http://dl.stream.qqmusic.qq.com/C100' + mid +'.m4a?key='+key;
          typeof success_func == "function" && success_func(url);

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
module.exports = {
  getLyric: getLyric,
  search_qq_music: search_qq_music,
  get_toplist_music: get_toplist_music,
  getMusic: getMusic
}