const app = getApp();
const util = require('../../utils/util.js');
let that;
Page({
    data: {
        playsong: null, // 保存歌词
        songlists: null, // 右侧播放列表
        songUrl: '', // 保存歌曲地址
        songImg: '',
        songTitle: '',
        songState: { // 播放进度相关
            progress: 0,
            currentPosition: '00.00',
            duration: '00.00'
        },
        isPlaying: true, // 保存当前是否正在播放
        pause: '', // 头像是否滚动
        selectedIndex: 0, //当前选中的歌曲
        hasSonglists: true,
        lyricSwiperH: 400,
        lyric: null,
        dotsClass: [
            'on', ''
        ],
        songFrom: 0,
        scrollTop: 0
    },
    /**
     * 初始化声明周期钩子
    **/
    onLoad(options) {
        that = this;
        // 设置全局对象数据
        let songlists = app.globalData.songLists;
        let songdata = app.globalData.songData;

        let arr = [];

        // 获取跳转传递过来的数据
        let index = options.no;
        let id = options.id;
        let mid = options.mid;
        let albummid = options.albummid;

        // 更新data的数据
        this.setData({
           songFrom:  options.songFrom,
           songTitle: options.songTitle
        });

        // 来自搜索歌曲处理
        options.songFrom === 'searchlist' && that.setData({hasSonglists: false});

        // 来自排行榜歌曲处理
        if (options.songFrom === 'toplist') {
            // console.log(songlist);
            for (let i = 0, len = songlists.length; i < len; i++) {
                songlists[i].data.title = songlists[i].data.songname;
                songlists[i].data.mid = songlists[i].data.songmid;
                arr[i] = songlists[i].data;
            }
            songlists = arr; // 作为实参
            that.setData({songlists: arr});
        }

        //* 歌词内容区域的高度
        wx.getSystemInfo({
           success(res) {
              that.setData({
                lyricSwiperH: res.windowHeight - 180
            })
           }
        });

        //* 修改配置方法
        this.changeOption(index, id, mid, albummid, songlists);
    },

    /**
     * 页面初次渲染完成钩子
    **/
    onReady() {
        // 使用小程序内置播放音乐api--进来就可以播放
        wx.playBackgroundAudio({
            dataUrl: this.data.songUrl,
            title: this.data.songTitle,
            coverImgUrl: this.data.songImg
        });
        this.startPlay(); // 调用自定义播放音乐方法
    },

    /**
     * 自定义方法
    **/

    /* 修改配置方法 */
    changeOption(index, id, mid, albummid, songlists) {
        //* 获取歌词方法
        that.getLyric(id);

        //* 获取歌取信息方法
        util.getSongInfo(id, mid, (data) => {
           this.setData({playsong: data[0]});
        });

        this.setData({
           slectedIndex: index,
           songlists: songlists,
           songUrl: `http://ws.stream.qqmusic.qq.com/C100${mid}.m4a?fromtag=38`,
           songImg: `http://y.gtimg.cn/music/photo_new/T002R150x150M000${albummid}.jpg`
        });
    },

    /* 播放音乐方法--开始播放 */
    startPlay() {
        that.songPlay(); // 调用播放状态控制

        // 调用小程序监听音乐播放
        wx.onBackgroundAudioPlay(function(){
            that.songPlay(); // 调用播放状态控制
        });
    },

    /* 获取歌词 */
    getLyric(id) {
        util.getLyric(id, (data) => {
            let lyric = that.reconvert(data.showapi_res_body.lyric).slice(4); // 调用解码 中文
            lyric = that.parseLyric(lyric); // 调用解析歌词
            that.setData({
                lyric: lyric
            })
        });
    },

    /* 播放状态控制 */
    songPlay() {
        clearInterval(timer);
        let timer  = setInterval(function() {
            wx.getBackgroundAudioPlayerState({ // 调用小程序播放控制api
                success(res) {
                    let status = res.status;
                    if (status === 1) {
                        that.setData({
                            songState: {
                                progress: res.currentPosition / res.duration * 100,
                                currentPosition: that.timeToString(res.currentPosition), // 调用转换时间格式
                                duration: that.timeToString(res.duration) // 调用转换时间格式
                            }
                        });
                    }else if (status ===0) {
                        clearInterval(timer);
                    }
                }
            })
        },1000);
    },

    /* 播放或暂停 */
    onplayToggle() {
        wx.getBackgroundAudioPlayerState({ // 小程序播放控制api
            success(res) {
                let status = res.status;
                if (status === 1) { // 正在播放中
                    wx.pauseBackgroundAudio();
                    that.setData({
                        isPlaying: false,
                        pause: 'pause'
                    });
                }else if(status === 0) { // 正在暂停中
                    wx.playBackgroundAudio({
                        title: that.data.playsong.title,
                        coverImgUrl: that.data.songImg,
                        dataUrl: that.data.songUrl
                    });
                    that.setData({
                        isPlaying: true,
                        pause: ''
                    });
                    that.songPlay();
                }
            }
        })
    },

    /* 歌词滑动 */
    onscrollHandle() {
      // console.log(1);
    },

    /* 选歌 */
    onchangeSong(ev) {
        let currentIndex = ev.currentTarget.dataset.index;
        let songlists = that.data.songlists;
        let currentData = songlists[currentIndex];

        // 修改配置
        let id = currentData.id;
        let mid = currentData.mid;

        if (that.data.songFrom === 'toplist') { // 歌曲来自排行榜分类
            var albummid = currentData.albummid; // 这里不能用let
            id = currentData.songid;
        } else {
            var albummid = currentData.album.mid;
        }

        that.setData({
            songTitle: currentData.title,
            isPlaying: true,
            pause: '',
            selectedIndex: ev.currentTarget.dataset.index
        });

        that.changeOption(currentIndex, id, mid, albummid, songlists); //*
        wx.seekBackgroundAudio({position: 0});
        that.startPlay(); //*
        //* 使用后台播放器播放音乐
        wx.playBackgroundAudio({dataUrl: that.data.songUrl, title: that.data.songTitle, coverImgUrl: that.data.songImg});
    },

    /* 左右内容滑动 */
    onswiperChange(ev) {
        // console.log(ev.detail.current);
        let dotsClass = ['', '', ''];
        dotsClass[ev.detail.current] = 'on';
        that.setData({dotsClass: dotsClass});
    },

    /* 解码 中文 */
    reconvert(str) {
        str = str.replace(/(\\u)(\w{1,4})/gi, function ($0) {
            return (String.fromCharCode(parseInt((escape($0).replace(/(%5Cu)(\w{1,4})/g, "$2")), 16)));
        });
        str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
        });
        str = str.replace(/(&#)(\d{1,6});/gi, function ($0) {
            return String.fromCharCode(parseInt(escape($0).replace(/(%26%23)(\d{1,6})(%3B)/g, "$2")));
        });
      return str;
    },

    /* 解析歌词 */
    parseLyric(lrc) {
      let lyrics = lrc.split('\n');
      let lrcObj = {};
    for (var i = 0; i < lyrics.length; i++) {
      let lyric = decodeURIComponent(lyrics[i]);
      let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      let timeRegExpArr = lyric.match(timeReg);
      if (!timeRegExpArr)
        continue;
      let clause = lyric.replace(timeReg, '');
      if (clause.length > 0) {
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
            let t = timeRegExpArr[k];
            let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
            let time = min * 60 + sec;
            lrcObj[time] = clause;
        }
      }
    }
      return lrcObj;
    },

    /* 转换时间格式 */
    timeToString(duration) {
        let str = '';
        let minute = parseInt(duration / 60) < 10
            ? ('0' + parseInt(duration / 60))
            : (parseInt(duration / 60));
        let second = duration % 60 < 10
            ? ('0' + duration % 60)
            : (duration % 60);
        str = minute + ':' + second;
        return str;
    }



});