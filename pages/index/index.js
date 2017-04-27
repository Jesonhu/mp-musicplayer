const app = getApp(); // 通过全局函数 getApp() 可以获取全局的应用实例，如果需要全局的数据可以在 App()(app.js) 中设置
const API_URL = 'https://api.douban.com/v2/movie/top250'; // 豆瓣api

Page({
    data: {
        title: '加载中...',
        movies: [],
        loading: false,
        start: 0,
        count: 20
    },
    onLoad(options) { // 生命周期函数--监听页面加载
        //调用应用实例的方法获取全局数据 app.js里面的方法
        app.fetchApi(API_URL + `?start=${this.data.start}&count=${this.data.count}`, (err, data) => {
              // console.log(data);
              // 更新data数据
              this.setData({
                  title: '小电影Top250',
                  movies: data.subjects,
                  loading: true
              });
            }
        );
    }
});