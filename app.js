//app.js
App({
  //=================应用程序全局方法=======================
  fetchApi(url, cb) {
    wx.request({
        url,
        data: {},
        header: {'Content-Type': 'application/text'},
        success(res) {
          cb(null, res.data);
        },
        error(err) {
          cb(err);
        }
    });
  },

  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
  getData(address,datas,cb) {
    wx.request({
        url: address,
        data:datas,
        header: { 'Content-Type': 'application/json' },
        success: cb
    })
  }
})