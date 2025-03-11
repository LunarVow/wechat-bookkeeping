// app.js
App({
  onLaunch: function() {
    wx.cloud.init({
      env: "bookkeeping-0g8ou3g9e195b86f"
    })
  },
  globalData: {
    currentTab: 'expense' // 统一使用currentTab字段
  },
  
  // 添加状态同步方法
  syncTabState: function(page) {
    page.setData({
      isExpense: this.globalData.currentTab === 'expense'
    })
  }
})
