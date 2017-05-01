const app = getApp();
const util = require('../../utils/util.js');
let that;
Page({
    data: {
        dissname: '',
        nickname: '',
        visitnum: 0,
        listBgColor: '',
        focusBg: '',
        songlist: [],
        songData: null,
        songlists: null
    },
    onLoad(options) {
        let id = options.listId; // options一个对象，获取传递过来的data-id
        wx.showLoading({title: "数据加载中...", mask: true});
        that = this;
        util.getListInfo(id, (data) => { //*
           wx.hideLoading();
           this.setData({
               songlists: data.songlist,
               songData: data,
               dissname: data.dissname,
               nickname: data.nickname,
               visitnum: data.visitnum,
               songlist: data.songlist,
               focusBg: data.logo,
               listBgColor: this.calculateBgColor(data.logo) //* 计算背景颜色
           });
        });
    },

    /* 计算背景颜色 */
    calculateBgColor: function (pic_url) {
        util.getLogoPic(pic_url, (data) => { // 调用全局方法getLogoPic
            var magic_color = data.magic_color;

            var r = (magic_color & 0x00ff0000) >> 16,
                g = (magic_color & 0x0000ff00) >> 8,
                b = (magic_color & 0x000000ff);
            that.setData({
                listBgColor: `rgb(${r},${g},${b})`
            })
            return `rgb(${r},${g},${b})`;
        });
    },

    /* 播放按钮与列表点击跳转到playsong/ */
    playsongTap(ev) {
        // 设置全局数据
        app.setGlobalData({
           songData: ev.currentTarget.dataset.data, // 当前点击过来的data-id对象的详情信息
            songLists: this.data.songlists // 当前分类的列表
        });
        // 获取点击时传递过来的数据
        let id = ev.currentTarget.dataset.id;
        let mid = ev.currentTarget.dataset.mid;
        let albummid = ev.currentTarget.dataset.albummid;
        let songFrom = ev.currentTarget.dataset.from;
        let no = ev.currentTarget.dataset.no;
        wx.navigateTo({
           url: `../playsong/playsong?id=${id}&mid=${mid}&albummid=${albummid}&songFrom=${songFrom}&no=${no}`
        });
    }
});