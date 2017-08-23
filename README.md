# xcx-qq music player
微信小程序：音乐播放器

## 已完成功能
* [x] 轮播图
* [x] 推荐分类、排行榜分类
* [x] 搜索、搜索历史记录
* [x] 歌词显示
* [x] 写真图片转动
* [x] 歌曲分类列表显示,分类列表点击切换歌曲

## 目录说明
```

├─ app.js                                        // 小程序主脚本文件
├─ app.json                                      // 小程序主配置文件
├─ app.wxss                                      // 小程序主样式文件（同.css）
├─ jsconfig.json
├─ README.md
├─ image                                         // 图片资源文件夹
├─ pages                                         // 页面及组件文件夹   
│  ├─ components                                 // 组件文件夹   
│  │  ├─ cblist                                  // ?
│  │  │      cblist.js
│  │  │      cblist.json
│  │  │      cblist.wxml
│  │  │      cblist.wxss
│  │  │
│  │  ├─ cblistheader                            // 列表页上部份：图片、标题、播放量、来自
│  │  │      cblistheader.js
│  │  │      cblistheader.json
│  │  │      cblistheader.wxml
│  │  │      cblistheader.wxss
│  │  │
│  │  ├─ loading                                 // 
│  │  │      index.json
│  │  │      index.wxml
│  │  │      index.wxss
│  │  │
│  │  ├─ movielist                               //
│  │  │      movielist.js
│  │  │      movielist.json
│  │  │      movielist.wxml
│  │  │      movielist.wxss
│  │  │
│  │  ├─ navbar                                  //
│  │  │      navbar.wxml
│  │  │
│  │  └─ swiper                                  // banner文件夹
│  │          swiper.js
│  │          swiper.json
│  │          swiper.wxml
│  │          swiper.wxss
│  │
│  ├─ index                                      // 首页文件夹 
│  │      index.js
│  │      index.json
│  │      index.wxml
│  │      index.wxss
│  │
│  ├─ list                                       // 列表页 
│  │      list.js
│  │      list.json
│  │      list.wxml
│  │      list.wxss
│  │
│  ├─ playsong                                   // 歌曲播放页
│  │      playsong.js
│  │      playsong.json
│  │      playsong.wxml
│  │      playsong.wxss
│  │
│  └─ toplist                                    // 搜索页 
│          toplist.js
│          toplist.json
│          toplist.wxml
│          toplist.wxss
│
├─ typings                                       // vscode 微信预览插件自动生成(可删除)
│      wx.d.ts
└─ utils                                            
       util.js                                   // request脚本
```
-----

# 代码文件说明

## 1 根目录app
> app为微信小程序的主体部分 [官方参考](https://mp.weixin.qq.com/debug/wxadoc/dev/component/)

> 包括：[app.js](./app.js)、[app.json](./app.json)、[app.wxss](./app.wxss)

app.js 配置全局数据```globalData.songData```  ```globalData.songLists```

app.json 小程序全局配置 [官方参考](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html)

app.wxss 全局样式表可以为空

----

## 2 index首页
> index为首页文件目录 
> 包括: [index.js](./pages/index/index.js) 、[index.json](./pages/index/index.json) 、[index.wxml](./pages/index/index.wxml) 、[index.wxss](./pages/index/index.wxss)
#### index.wxml

涉及知识点

```模板引入```
> 引用的模板：(import方式引入)
[movielist.wxml](./components/movielist/movielist.wxml)、
[loading/index.wxml](./components/loading/index.wxml)、
[navbar.wxml](./components/navbar/navbar.wxml)、
[swiper.wxml](./components/swiper/swiper.wxml)[官方参考](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html)
```html
<!-- 语法 -->
<import src="文件目录地址"></import>

<!-- 使用实例 -->
<!--顶部tab导航 is="xxx"和模板 template name="xxx"一样 -->
<template is="navbar" data="{{navbar:navbar,currentTab:currentTab}}"></template>
```

```tab切换```

hidden="{{boolean}}" 与 wx:if="{{boolean}}" [官方参考](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/conditional.html)

```html
       <!--顶部tab导航-->
       <template is="navbar" data="{{navbar:navbar,currentTab:currentTab}}"></template>

       <!--    tab内容     -->
       <view hidden="{{currentTab !== 0}}">
       <view hidden="{{currentTab !== 1}}">
       <view hidden="{{currentTab !== 2}}">
```
[navbar组件](./components/navbar/navbar.wxml)代码 事件：bindtap="onNavbarTap"[官方事件参考](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/event.html)

```javascript
   // index.js
   Page({
     data: {
       currentTab: 0
     },
     
     /* 导航栏操作 */
    onNavbarTap(ev) {
        // console.log(ev);
        this.setData({currentTab: ev.currentTarget.dataset.index});
    }
   })
```
改变data中的数据 setDate()方法;
ev.currentTarget.dataset.index ,组件属性data-index="{{index}}"当前对象所在父元素中的索引,参考：[小程序dataset参考](http://www.aiyingli.com/44636.html) [WX dataset参考2](http://www.aiyingli.com/46397.html) [WX dataset参考3](http://blog.csdn.net/beilinyu/article/details/53945438), [原生event参考](http://www.w3school.com.cn/jsref/event_currenttarget.asp)

```页面跳转```

```html
   <!-- 热门歌单 -->
    <view class="channel hot">
        <text class="{{songList.length>0?'title':''}}">热门歌单</text>
        <view class="list">
            <view class="item songitem"
                  wx:for="{{songList}}"
                  wx:key="{{item.id}}"
                  data-id="{{item.id}}"
                  bindtap="onHotListTap"
            >
                <view class="list-media">
                    <image class="img" src="{{item.picUrl}}" mode="widthFix"></image>
                    <text class="list-count">{{item.accessnum}}</text>
                </view>
                <text class="text">{{item.songListDesc}}</text>
                <text class="author">{{item.songListAuthor}}</text>
                <text class="play"></text>
            </view>
        </view>
    </view>
```
```javascript
       const app = getApp(); // 通过全局函数 getApp() 可以获取全局的应用实例，如果需要全局的数据可以在 App()(app.js) 中设置
       const util = require('../../utils/util.js');
       let that;
       
       Page({
              data: {
                     songList: []
              }
              
              // 生命周期函数--监听页面加载
              onLoad(options) { 
                   that = this;
                      // 页面加载指示
                      wx.showLoading({title: '数据加载中...', mask: true});
                      
                      // 推荐频道 热门歌单
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
              },
              
              // 推荐页面点击跳转到list
              onHotListTap(ev) {
               let id = ev.currentTarget.dataset.id; // 点击位置的 data-id
               wx.navigateTo({ // 保留当前页面，跳转的某个页面 wx.navigateBack可以返回
                   url: '../list/list?listId=' + id
               });
              }
       })
```

> 参考：
1 页面导航：[官方参考](https://mp.weixin.qq.com/debug/wxadoc/dev/api/ui-navigate.html#wxnavigatetoobject)

