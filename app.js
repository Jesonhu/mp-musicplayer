App({
   globalData: {
       songData: null,
       songLists: null
   },
   setGlobalData(obj) {
       for (let n in obj) {
           this.globalData[n] = obj[n];
       }
   }
});