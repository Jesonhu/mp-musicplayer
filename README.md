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

# 页面说明

## 1 index
> index为首页文件目录 
> 包括: [index.js](./pages/index/index.js) 、[index.json](./pages/index/index.json) 、[index.wxml](./pages/index/index.wxml) 、[index.wxss](./pages/index/index.wxss)
