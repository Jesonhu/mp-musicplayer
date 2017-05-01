const app = getApp(); // 通过全局函数 getApp() 可以获取全局的应用实例，如果需要全局的数据可以在 App()(app.js) 中设置
const util = require('../../utils/util.js');
let that;

Page({
    data: {
        loading: false,

        navbar: ['推荐', '排行榜', '搜索'],
        currentTab: 0, // 导航栏切换索引

        slider: [], // 保存slider图片数据
        radioList: [], // 保存slider底部按钮数据
        songList: [], // 保存推荐数据
        topList: [],  // 保存排行榜数据
        scrollviewH: 0, // 搜索结果的scrollview高度

        inputFocus: false, // 搜索框是否获取焦点
        searchKeyword: "", // 搜索关键词
        searchHotShow: true, // 是否显示热门搜索
        searchHistoryShow: false, // 是否显示搜索历史
        searchResultShow: false, // 是否显示搜索结果
        searchCancelShow: false, // 是否显示取消按钮

        searchHistorys: [], // 搜索历史记录
        searchSongList: [], // 搜索结果
        searchPageNum: 1, // 分页数
        searchLoading: false, // 加载更多
        searchLoadingComplete: false, // 加载更多结束
        scrollFlag: true, // 上拉分页加载条件

        searchPageSize: 0, // 每页多少
        searchTotalNum: 0, // 结果总条数
        scrollToView: 'scrollTop', // 返回顶部位置
        backToTop: false, // 返回顶部
    },
    onLoad(options) { // 生命周期函数--监听页面加载
        that = this;
        wx.showLoading({title: '数据加载中...', mask: true});
        //* 推荐频道 热门歌单
        util.getRecomment((data) => {
            wx.hideLoading(); // 隐藏加载中提示
            this.setData({ // 更新data里的数据
                loading: true,
                slider: data.data.slider,
                radioList: data.data.radioList,
                songList: data.data.songList
            });
            // console.log('首页数据' + data);
        });

        //* 排行榜数据
        util.getTopList((data) => {
           wx.hideLoading();
           this.setData({
              topList: data.filter((item, i) => item.id != 201)
           });
        });

        //* 搜索 热门搜索
        util.getHotSearch((data) => {
           // console.log(data.data.hotkey);
           that.setData({
             hotkey: data.data.hotkey.slice(1),
             special: data.data.special_key
           })
        });
        //* 设置搜索结果 scrollview的高度
        wx.getSystemInfo({
          success(res) {
              that.setData({
                scrollviewH: res.windowHeight - 90
              })
          }
        });

        // 历史搜索记录--从本地缓存中获取前10条数据
        let searchHistorys = wx.getStorageSync('searchHistorysKey') || []; // * 作者？ 有取值 没有时结果为空数组
        if (searchHistorys.length > 0) {
            let searchResult = searchHistorys.length >= 10 ? searchHistorys.slice(0,10) : searchHistorys; // 超过10条取10条，不足10条全取
            that.setData({
              searchHistorys: searchResult
            })
        }
    },

    /* 导航栏操作 */
    onNavbarTap(ev) {
        // console.log(ev);
        this.setData({currentTab: ev.currentTarget.dataset.index});
    },

    /* 点击排行榜列表 */
    onTopListTap(ev) {
        let id = ev.currentTarget.dataset.id;

        wx.navigateTo({
            url: `../toplist/toplist?topListId=${id}`
        });
    },

    /* 推荐页面点击跳转到list */
    onHotListTap(ev) {
        let id = ev.currentTarget.dataset.id; // 点击位置的 data-id
        wx.navigateTo({ // 保留当前页面，跳转的某个页面 wx.navigateBack可以返回
            url: '../list/list?listId=' + id
        });
    },

    /* 搜索框焦点获取 */
    onSearchFocus(ev) {
        let searchKeyword = that.data.searchKeyword.trim(); //?
        if (searchKeyword) {
            that.setData({
              searchHotShow: false,
              searchHistoryShow: false,
              searchResultShow: true,
              searchCancelShow: true
            });
        } else {
            that.setData({
              searchHotShow: false,
              searchHistoryShow: true,
              searchResultShow: false,
              searchCancelShow: true
            });
        }
    },

    /* 搜索取消 */
    onSearchCancel() {
        that.setData({
          searchHotShow: true,
          searchHistoryShow: false,
          searchResultShow: false,
          searchCancelShow: false,
          searchKeyword: '',
          inputFocus: false
        })
    },

    /* 搜索框输入值时 */
    onSearchInput(ev) {
        that.setData({
          searchKeyword: ev.detail.value
        })
    },

    /* 点击搜索框清除按钮 */
    onClearInput() {
        that.setData({
          searchHotShow: false,
          searchHistoryShow: true,
          searchResultShow: false,
          searchCancelShow: true,
          searchKeyword: '',
          inputFocus: true
        })
    },

    /* 搜索确认(输入结果后点击了回车键) */
    onSearchConfirm(ev) {
        let searchKeyword = ev.detail.value;
        let searchHistorys = that.data.searchHistorys;
        that.setData({searchKeyword: searchKeyword});
        if (searchKeyword.trim()) {
            if (searchHistorys.length > 0) {
                searchHistorys.indexOf(searchKeyword) < 0 && searchHistorys.unshift(searchKeyword);
            } else {
                searchHistorys.push(searchKeyword)
            }
        };

        //* 设置本地存储的内容并更新data搜索历史记录
        wx.setStorage({
          key: 'searchHistorysKey',
          data: searchHistorys,
          success() {
            that.setData({searchHistorys: searchHistorys});
          }
        });

        that.setData({
          searchHotShow: false,
          searchHistoryShow: false,
          searchResultShow: true,
          searchSongList: []
        });

        that.onFetchSearchList(1); // *
        that.onSearchFocus(); // <--
    },

    /* 搜索结果 */
    onFetchSearchList(searchPageNum) {
        let searchKeyword = that.data.searchKeyword;
        that.setData({
          searchLoading: true, // 显示加载更多
          scrollFlag: false // 上拉加载
        });

        util.getSearchMusic(searchKeyword, searchPageNum, (res) => { // *
            let result = res.data; // 注意不能改变变量不能和形参命名一样
            that.setData({
             searchSongList: that.data.searchSongList.concat(result.song.list),
             zhida: result.zhida,
             searchLoading: false,
             searchPageNum: result.song.totalnum,
             searchPageSize: result.song.curnum,
             scrollFlag: true
            });
        });
    },

    /* 点击历史记录 */
    oninInputSearch(ev) {
        let selectedSongName = ev.target.dataset.name;
        that.setData({
          searchKeyword: selectedSongName
        })
        that.onFetchSearchList(1); // 立刻搜索出结果
    },

    /* 删除单条记录 */
    onSearchHistoryDelete(ev) {
        let item = ev.currentTarget.dataset.item;
        let searchHistorys = wx.getStorageSync('searchHistorysKey');
        searchHistorys.splice(searchHistorys.indexOf(item,1));
        wx.setStorage({
          key: 'searchHistorysKey',
          data: searchHistorys,
          success() {
              that.setData({searchHistorys: searchHistorys});
          }
        })
    },

    /* 删除所有搜索历史记录 */
    onSearchHistoryDeleteAll() {
        wx.removeStorage({
          key: 'searchHistorysKey',
          success() {
              that.setData({searchHistorys: []})
          }
        })
    },

    /* 滚动分页加载 */
    onScrollLower() {
        if (that.data.scrollFlag) {
            let num = that.data.searchPageNum + 1;
            let total = Math.ceil(that.data.searchTotalNum / that.data.searchPageSize);
            if (num > total) {
                that.setData({searchLoadingComplete: true});
                return;
            } else {
                if (num == total) {
                    that.setData({searchLoading: true});
                } else {
                    that.setData({searchLoading: true});
                }
                that.setData({searchPageNum: num});
                that.onFetchSearchList(that.data.searchPageNum); // <- 搜索结果
            }
        }
    },

    /* 滚动计算滚动条距离 */
    onScroll(ev) {
        let scrollTop = ev.detail.scrollTop;
        scrollTop > 500 ? that.setData({backToTop: true}) : that.setData({backToTop: false});
    },

    /* 返回顶部 */
    onBackToTop() {
        that.setData({
            scrollToView: 'scrollTop',
            backToTop: false
        });
    },

    /* 点击搜索列表跳转到播放页 */
    onPlaysongTap(ev) {
        app.setGlobalData({songData: ev.currentTarget.dataset.data});
        let evCurrentDataset = ev.currentTarget.dataset;
        let id = evCurrentDataset.id;
        let mid = evCurrentDataset.mid;
        let albummid = evCurrentDataset.albummid;
        let songFrom = evCurrentDataset.from;
        wx.navigateTo({
          url: `../playsong/playsong?id=${id}&mid=${mid}&albummid=${albummid}&songFrom=${songFrom}`
        });
    },

    /* 点击右上角分享 */
    onShareAppMessage() {
        return {
            title: '音乐相伴过五一o(╯□╰)o',
            desc: '微信音乐小程序By：Jesonhu--参考: m.y.qq.com，源码: github.com/Jesonhu',
            path: '/pages/index/index'
        }
    }
});