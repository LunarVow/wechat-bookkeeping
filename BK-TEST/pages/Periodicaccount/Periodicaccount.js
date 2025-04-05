const app = getApp()

Page({
  data: {
    isExpense: true,
    currentMonth: '',
    categories: [
      { id: 1, name: '三餐', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Meals.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Meals-on.png' },
      { id: 2, name: '零食', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Snacks.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Snacks-on.png' },
      { id: 3, name: '衣服', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Clothing.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Clothing-on.png' },
      { id: 4, name: '交通', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Transportation.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Transportation-on.png' },
      { id: 5, name: '旅行', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Travel.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Travel-on.png' },
      { id: 6, name: '孩子', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Children.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Children-on.png' },
      { id: 7, name: '宠物', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Pets.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Pets-on.png' },
      { id: 8, name: '话费网费', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/PhoneBill.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/PhoneBill-on.png' },
      { id: 9, name: '烟酒', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Tobacco.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Tobacco-on.png' },
      { id: 10, name: '学习', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Studying.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Studying-on.png' },
      { id: 11, name: '日用品', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/DailyNecessities.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/DailyNecessities-on.png' },
      { id: 12, name: '美妆', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Beauty.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Beauty-on.png' },
      { id: 13, name: '医疗', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Medical.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Medical-on.png' },
      { id: 14, name: '红包', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/RedPacket.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/RedPacket-on.png' },
      { id: 15, name: '汽车加油', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Gas.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Gas-on.png' },
      { id: 16, name: '娱乐', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Entertainment.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Entertainment-on.png' },
      { id: 17, name: '请客送礼', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/GiftGiving.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/GiftGiving-on.png' },
      { id: 18, name: '电器数码', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Electronics.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Electronics-on.png' },
      { id: 19, name: '运动', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Sports.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Sports-on.png' },
      { id: 20, name: '其他', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Others.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Others-on.png' },
      { id: 21, name: '水电煤', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Utilities.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Utilities-on.png' },
    // 类别...
    ],
    selectedCategory: null,
    remark: '',
    amount: '0.00',
    keyboardKeys: ['1','2','3','+','4','5','6','-','7','8','9','.', '再记','0','delete','保存']
  },

  onLoad() {
    const now = new Date()
    const defaultMonth = `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2, '0')}`
    this.setData({
      startMonth: defaultMonth,
      endMonth: defaultMonth,
      currentMonth: defaultMonth,
      isExpense: app.globalData.currentTab === 'expense'
    })
  },

  onShow() {
    this.setData({
      isExpense: app.globalData.currentTab === 'expense'
    })
  },
  switchType(e) {
    const type = e.currentTarget.dataset.type
    if(type === 'income') {
      app.globalData.currentTab = 'income' // 新增这行
      wx.redirectTo({ 
        url: '/pages/Periodictake/Periodictake' // 补全斜杠
      })
      return
    }
    app.globalData.currentTab = type
    this.setData({ 
      isExpense: true, // 保持当前页面为支出类型
      selectedCategory: null
    })
  },
  

  onMonthChange(e) {
    this.setData({
      currentMonth: e.detail.value
    })
  },

  handleKeyPress(e) {
    const key = e.currentTarget.dataset.key
    let amount = this.data.amount.replace(/¥|\s/g, '')
    
    // 处理功能键
    if (key === '再记') return this.saveRecord(false)
    if (key === '保存') return this.saveRecord(true)
    if (key === 'delete') {
      amount = amount.slice(0, -1)
      if (amount === '') amount = '0.00'
    } else if (key === '+') {
      amount = (parseFloat(amount) + 1).toFixed(2)
    } else if (key === '-') {
      amount = Math.max(parseFloat(amount) - 1, 0).toFixed(2)
    } else if (key === '.') {
      if (!amount.includes('.')) amount += '.'
    } else if (!isNaN(key)) {
      amount = amount === '0.00' ? key : amount + key
    }

    // 格式化金额
    if (amount.includes('.')) {
      const parts = amount.split('.')
      amount = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1].slice(0,2)
    } else {
      amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    this.setData({ amount: `¥ ${amount}` })
  },

  selectCategory(e) {
    this.setData({ 
      selectedCategory: e.currentTarget.dataset.id 
    })
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  async saveRecord(needNavigate) {
    if (!this.validate()) return;
  
    // 新增日期范围验证
    const start = new Date(this.data.startMonth + '-01')
    const end = new Date(this.data.endMonth + '-01')
    if (start > end) {
      wx.showToast({ title: '结束月份不能早于开始月份', icon: 'none' })
      return
    }
  
    try {
      const selectedCategoryObj = this.data.categories.find(
        item => item.id === this.data.selectedCategory
      )
  
      const db = wx.cloud.database()
      const records = []
  
      // 生成所有月份的记录
      let currentDate = new Date(start)
      while (currentDate <= end) {
        const month = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}`
        
        records.push({
          type: '支出',
          category: {
            id: selectedCategoryObj.id,
            name: selectedCategoryObj.name
          },
          amount: parseFloat(this.data.amount.replace(/¥|\s/g, '')),
          remark: this.data.remark || '无备注',
          date: `${month}-01`,
          time: '00:00',
          createTime: db.serverDate()
        })
  
        // 增加一个月
        currentDate.setMonth(currentDate.getMonth() + 1)
      }
  
      // 批量添加记录
      const batchSize = 20 // 微信云开发单次最多插入20条
      for (const record of records) {
        await db.collection('keepinglist').add({ data: record })
      }
  
      wx.showToast({
        title: `成功添加${records.length}条记录`,
        success: () => {
          if (needNavigate) {
            setTimeout(() => {
              wx.redirectTo({
                url: `/pages/MonthlyBill/MonthlyBill?month=${this.data.startMonth}`
              })
            }, 1500)
          } else {
            this.resetForm()
          }
        }
      })
    } catch (err) {
      wx.showToast({ 
        title: `保存失败: ${err.errMsg || '未知错误'}`,
        icon: 'none',
        duration: 3000
      })
      console.error('保存失败:', err)
    }
  },
  
  validate() {
    if (!this.data.selectedCategory) {
      wx.showToast({ title: '请选择分类', icon: 'none' })
      return false
    }
  
    const amount = parseFloat(this.data.amount.replace(/¥|\s/g, ''))
    if (isNaN(amount) || amount <= 0) {
      wx.showToast({ title: '请输入有效金额', icon: 'none' })
      return false
    }
  
    // 新增日期范围验证
    if (!this.data.startMonth || !this.data.endMonth) {
      wx.showToast({ title: '请选择完整日期范围', icon: 'none' })
      return false
    }
  
    return true
  },
  


  resetForm() {
    this.setData({
      amount: '0.00',
      remark: '',
      selectedCategory: null
    })
  },

  goBack() {
    wx.redirectTo({
      url: '/pages/main/main'
    });
  },
  setStartMonth(e) {
    this.setData({ startMonth: e.detail.value })
  },
  
  setEndMonth(e) {
    this.setData({ endMonth: e.detail.value })
  },

})

