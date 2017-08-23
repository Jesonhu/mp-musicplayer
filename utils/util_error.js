const  CONFIG_HOST = require('./config_host');


// 过滤器-显示格式设置（...万）
function formatWan(n) {
    n = n.toString(); // 返回字符串表示
    return (n / 10000).toFixed(1) + '万'; // toFixed(1)四舍五入保留指定小数位小数
}

/**
 * 推荐数据api
 */

// 获取推荐数据
// util.getRecomment((data) => {
//     wx.hideLoading(); // 隐藏加载中提示
//     this.setData({ // 更新data里的数据
//         loading: true,
//         slider: data.data.slider,
//         radioList: data.data.radioList,
//         songList: data.data.songList
//     });
//     // console.log('首页数据', data);
// });
function getRecomment(cb) {
  wx.request({
    //   url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    //   data: { // 请求的参数
    //       g_tk: 5381,
    //       uin: 0,
    //       format: 'json',
    //       inCharset: 'utf-8',
    //       outCharset: 'utf-8',
    //       notice: 0,
    //       platform: 'h5',
    //       needNewCode: 1,
    //       _: Date.now()
    //   },
      url: CONFIG_HOST.index.slider.url,
      data: CONFIG_HOST.index.slider.params,
      method: 'GET', // 默认为GET 如果为get可以不写
      header: {'content-Type': 'application/json'},
      success(res) {
          if (res.statusCode == 200) { // 请求status为200时
              let data = res.data,
                  songlist = data.data.songList;
                  console.log(songlist);
              for (let i=0; i<songlist.length;i++) {
                  songlist[i].accessnum = formatWan(songlist[i].accessnum); //播放次数格式更改
              }
              cb(data);
          } else {
              console.log('request getRecomment faild');
          }
      }
  })
}

/**
 *  获取排行榜相关api
 */

// 获取排行榜数据
function getTopList(cb) {
  wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
      data: {
          format: 'json',
          g_tk: 5381,
          uin: 0,
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          _: Date.now()
      },
    //   url: CONFIG_HOST.index.topList.url,
    //   data: CONFIG_HOST.index.topList.params,
      header: {'content-Type': 'application/json'},
      success(res) {
        if (res.statusCode === 200) {
            // console.log(res);
            let data = res.data.data,
                topList = data.topList;
            for (let i = 0; i < topList.length; i++) {
                topList[i].listenCount = formatWan(topList[i].listenCount);
            };
            cb(topList);
        } else {
            console.log('request getTopList faild');
        }
      }
  });
}

// 获取排行榜详情信息(list.js使用) 123
function getToplistInfo(id, cb) {
  wx.request({
      url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
      data: {
          g_tk: 5381,
          uin: 0,
          format: 'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          tpl: 3,
          page: 'detail',
          type: 'top',
          topid: id,
          _: Date.now()
      },
    //   url: CONFIG_HOST.detail.topListInfo.url,
    //   data: CONFIG_HOST.detail.topListInfo.params,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success(res) {
          if (res.statusCode === 200) {
            cb(res.data);
          } else {
            console.log('request getToplistInfo faild');
          }
      }
  });
}

// 获取热门歌单数据(点击进来的介绍)
function getListInfo(id, cb) {
  wx.request({
      url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
      data: {
          g_tk: 5381,
          uin: 0,
          format: 'json',
          inCharset: 'utf-8',
          outCharset: 'utf-8',
          notice: 0,
          platform: 'h5',
          needNewCode: 1,
          new_format: 1,
          pic: 500,
          disstid: id,
          type: 1,
          json: 1,
          utf8: 1,
          onlysong: 0,
          nosign: 1,
          _: new Date().getTime()
      },
    //   url: CONFIG_HOST.list.listInfo.url,
    //   data: CONFIG_HOST.list.listInfo.params,
      header: {'content-Type': 'application/json' },
      success(res) {
          if (res.statusCode === 200) {
              let data = res.data;
              let list = data.cdlist;
              for (let i = 0; i< list.length; i++) {
                  list[i].visitnum = formatWan(list[i].visitnum);
              }
              cb(list[0]);
          } else {
              console.log('request getListInfo faild');
          }
      }
  });
}

/**
 * 设置背景颜色
 */
function getLogoPic(pic_url, cb) { // 获取图片
    wx.request({
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_gedanpic_magiccolor.fcg',
        data: {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            pic_url: pic_url,
            _: new Date().getTime()
        },
        // url: CONFIG_HOST.list.listLogoPic.url,
        // data: CONFIG_HOST.list.listInfo.params,
        header: {'content-Type': 'application/json'},
        success(res) {
            if (res.statusCode === 200) {
              let data = res.data;
              cb(res.data)
            } else {
                console.log('request getLogoPic faild');
            }
        }
    });
}

/**
 * 获取歌词方法
 */
function getLyric(id ,cb) {
  wx.request({
     url: 'https://route.showapi.com/213-2',
     data: {
         musicid: id,
         showapi_appid: '23654',
         showapi_timestamp: new Date().getTime(),
         showapi_sign: 'd23793312daf46ad88a06294772b7aac'
     },
    //  url: CONFIG_HOST.detail.lyric.url,
    //  data: CONFIG_HOST.detail.lyric.params,
     header: {'content-Type': 'application/json'},
     success(res) {
         if (res.statusCode === 200) {
            cb(res.data)
         } else {
            console.log('request getLyric faild');
        }
     }
  });
};

/**
 * 获取单曲歌单信息
 */
function getSongInfo(id, mid, cb) {
  wx.request({
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_list_songinfo_cp.fcg',
      data: {
          url: 1,
          idlist: id,
          midlist: mid,
          typelist: 0
      },
    //   url: CONFIG_HOST.detail.songInfo.url,
    //   data: CONFIG_HOST.detail.songInfo.params,
      header: {'content-Type': 'application/json'},
      success(res) {
          if (res.statusCode === 200) {
              let data = res.data.data;
              cb(data);
          } else {
            console.log('request getSongInfo faild');
          }
      }
  });
}

/**
 * 搜索相关
 */

// 获取热门搜索
function getHotSearch(cb) {
    wx.request({
        url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
        data: {
            g_tk: 5381,
            uin: 0,
            format: 'jsonp',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now()
        },
        // url: CONFIG_HOST.list.hotSearch.url,
        // data: CONFIG_HOST.list.hotSearch.params,
        header: {'content-Type': 'application/json'},
        success(res) {
            if (res.statusCode === 200) {
                let data = res.data;
                data.data.hotkey = data.data.hotkey.slice(0,8);
                cb(data);
            } else {
                console.log('request getHotSearch faild');
            }
        }
    })
}

// 获取搜索结果
function getSearchMusic(keyword, page, cb) {
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
      data: {
        g_tk: 5381,
        uin: 0,
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1,
        w: keyword,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf-8',
        sem: 1,
        aggr: 0,
        perpage: 20,
        n: 20,
        p: page,
        remoteplace: 'txt.mqq.all',
        _: Date.now()
      },
    //   url: CONFIG_HOST.list.searchMusic.url,
    //   data: CONFIG_HOST.list.searchMusic.params,
      header: {'content-Type': 'application/json'},
      success(res) {
          if (res.statusCode === 200) {
            cb(res.data);
          } else {
            console.log('request getSearchMusic faild'); 
          }
      }
    });
}

module.exports = {
    getRecomment: getRecomment,
    getTopList: getTopList,
    getToplistInfo: getToplistInfo,
    getListInfo: getListInfo,
    getLogoPic: getLogoPic,
    getLyric: getLyric,
    getSongInfo: getSongInfo,
    getHotSearch: getHotSearch,
    getSearchMusic: getSearchMusic
}