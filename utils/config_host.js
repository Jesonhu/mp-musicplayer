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
            url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
        },
        // 获取列表上部的图片
        listLogoPic: {
            url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_gedanpic_magiccolor.fcg'
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
            url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
        },
        // 首页排行榜点击后，跳转到此处
        topListInfo: {
            url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
        },
    },
    // 详情页
    detail: {
        // 获取歌词
        lyric: {
            url: 'https://route.showapi.com/213-2'
        },
        // 获取单曲歌单信息
        songInfo: {
            url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_list_songinfo_cp.fcg'
        }
    }
}

module.exports = host;