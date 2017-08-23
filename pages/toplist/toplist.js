const app = getApp();
const util = require('../../utils/util');
let that;
Page({
    data: {
        topinfo: {},
        songlist: [],
        update_time: '',
        listBgColor: '',
        isLight: false
    },
    onLoad(options) {
        that = this;
        let id = options.topListId;
        wx.showLoading({title:'数据加载中...', mask: true});

        //* 排行榜api方法
        util.getToplistInfo(id, (data) => {
           wx.hideLoading();

           data.color == '14737632' && that.setData({isLight: true});
           console.log('toplist', data);
           that.setData({
              topinfo: data.topinfo,
              songlist: data.songlist,
              update_time: data.update_time,
              listBgColor: that.dealColor(data.color) //*
           });
        });
    },

    /* 列表颜色 */
    dealColor(rgb) {
        if (!rgb) {
            return;
        };
        let r = (rgb & 0x00ff0000) >> 16,
            g = (rgb & 0x0000ff00) >> 8,
            b = (rgb & 0x000000ff);
        return `rgb(${r},${g},${b})`;
    },

    /* 列表点击 */
    playsongTap: function (ev) {
        var that = this;
        app.setGlobalData({songData: ev.currentTarget.dataset.data, songLists: that.data.songlist}); // 改变全局数据
        var id = ev.currentTarget.dataset.id;
        var mid = ev.currentTarget.dataset.mid;
        var albummid = ev.currentTarget.dataset.albummid;
        var songFrom = ev.currentTarget.dataset.from;
        var no = ev.currentTarget.dataset.no;
        wx.navigateTo({
            url: '../playsong/playsong?id=' + id + '&mid=' + mid + "&albummid=" + albummid + '&songFrom=' + songFrom + '&no=' + no
        });
    }
});