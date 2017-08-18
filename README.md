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
.
├── image                                       // 图片资源文件夹
├── utils                                       // 自定义文件夹 
    |-- uitl.js                                 // 自定义接口文件（异步请求方法）
├── pages                                       // 源码目录
    ├── components                              // 组件文件夹
    |-- index                                   // 首页文件内容                     
        |-- index.js                            // 首页脚本 
        |-- index.json                          // 首页配置文件
        |-- index.wxml                          // 首页html文件（同.html）
        |-- index.wxss                          // 首页样式文件（同.css）
    |-- list                                    // 列表页文件内容                     
        |-- list.js                             // 列表页脚本 
        |-- list.json                           // 列表页配置文件
        |-- list.wxml                           // 列表页html文件（同.html）
        |-- list.wxss                           // 列表页样式文件（同.css）
    |-- playsong                                // 歌曲播放页文件内容                     
        |-- playsong.js                         // 歌曲播放页脚本 
        |-- playsong.json                       // 歌曲播放页配置文件
        |-- playsong.wxml                       // 歌曲播放页html文件（同.html）
        |-- playsong.wxss                       // 歌曲播放页样式文件（同.css）
    |-- toplist                                 // 搜索列表页文件内容                     
        |-- toplist.js                          // 搜索列表页脚本 
        |-- toplist.json                        // 搜索列表页配置文件
        |-- toplist.wxml                        // 搜索列表页html文件（同.html）
        |-- toplist.wxss                        // 搜索列表页样式文件（同.css）        
|-- app.js                                      // 小程序主脚本文件 
|-- app.json                                    // 小程序主配置文件
|-- app.wxss                                    // 小程序主样式文件（同.css）
.
```
