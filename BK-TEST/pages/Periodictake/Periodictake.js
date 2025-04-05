// pages/Periodictake/Periodictake.js
const app = getApp()

Page({
  data: {
    isExpense: false, // 默认收入类型
    currentMonth: '',
    categories: [
      { id: 1, name: '工资', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/Salary.png', activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/Salary-on.png' },
      { id: 2, name: '生活费', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/LivingExpenses.png', activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/LivingExpenses-on.png' },
      { id: 3, name: '收红包', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/RedPacket.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/RedPacket-on.png' },
      { id: 4, name: '外快', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/SideIncome.png', activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/SideIncome-on.png' },
      { id: 5, name: '股票基金', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/StocksFunds.png', activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/收入图标/StocksFunds-on.png' },
      { id: 6, name: '其它', icon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Others.png',activeIcon: 'cloud://bookkeeping-0g8ou3g9e195b86f.626f-bookkeeping-0g8ou3g9e195b86f-1333597569/支出图标/Others-on.png' },
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
      isExpense: false
    })
  },

  onShow() {
    this.setData({ isExpense: false })
  },

  switchType(e) {
    const type = e.currentTarget.dataset.type
    if(type === 'expense') {
      wx.redirectTo({ url: '/pages/Periodicaccount/Periodicaccount' })
      return
    }
    app.globalData.currentTab = type
    this.setData({ 
      isExpense: false,
      selectedCategory: null
    })
  },

  onMonthChange(e) {
    this.setData({ currentMonth: e.detail.value })
  },

  handleKeyPress(e) {
    const key = e.currentTarget.dataset.key
    let amount = this.data.amount.replace(/¥|\s/g, '')
    
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

    if (amount.includes('.')) {
      const parts = amount.split('.')
      amount = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1].slice(0,2)
    } else {
      amount = amount.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    this.setData({ amount: `¥ ${amount}` })
  },

  selectCategory(e) {
    this.setData({ selectedCategory: e.currentTarget.dataset.id })
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value })
  },

  async saveRecord(needNavigate) {
    if (!this.validate()) return;

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
  
      let currentDate = new Date(start)
      while (currentDate <= end) {
        const month = `${currentDate.getFullYear()}-${(currentDate.getMonth()+1).toString().padStart(2, '0')}`
        
        records.push({
          type: '收入', // 修改为收入类型
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

        currentDate.setMonth(currentDate.getMonth() + 1)
      }

      const batchSize = 20
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
    wx.redirectTo({ url: '/pages/main/main' })
  },

  setStartMonth(e) {
    this.setData({ startMonth: e.detail.value })
  },
  
  setEndMonth(e) {
    this.setData({ endMonth: e.detail.value })
  },
})
