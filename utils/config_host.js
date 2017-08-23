/**
 * api接口地址
 */
const host = {

    // 首页
    index: {
        // 轮播 电台 热门歌单 来源于同一个数据
        slider: {
           url: `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg`,
           params: {
                g_tk: 5381,
                uin: 0,
                format: 'json',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                _: Date.now()
           }
        },
        // 排行榜数据
        topList: {
            url: `https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg`,
            params: {
                format: 'json',
                g_tk: 5381,
                uin: 0,
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                _: Date.now()
            }
        }
    },
    list: {
        // 首页热门歌单点进来的列表
        listInfo: {
            url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
            params: {
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
            }
        },
        // 获取列表上部的图片
        listLogoPic: {
            url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_gedanpic_magiccolor.fcg',
            params: {
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
            }
        },
        // 热门搜索列表
        hotSearch: {
            url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
            params: {
                g_tk: 5381,
                uin: 0,
                format: 'jsonp',
                inCharset: 'utf-8',
                outCharset: 'utf-8',
                notice: 0,
                platform: 'h5',
                needNewCode: 1,
                _: Date.now()
            }
        },
        // 输入内容后歌曲的搜索列表
        searchMusic: {
            url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
            params: {
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
            }
        }
    },
    // 详情页
    detail: {
        // 排行榜歌曲信息，不包括歌词
        topListInfo: {
            url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
            params: {
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
            }
        },
        // 获取歌词
        lyric: {
            url: 'https://route.showapi.com/213-2',
            params: {
                musicid: id,
                showapi_appid: '23654',
                showapi_timestamp: new Date().getTime(),
                showapi_sign: 'd23793312daf46ad88a06294772b7aac'
            }
        },
        // 获取单曲歌单信息
        songInfo: {
            url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_list_songinfo_cp.fcg',
            params: {
                url: 1,
                idlist: id,
                midlist: mid,
                typelist: 0
            }
        }
    }
}

module.exports = host;