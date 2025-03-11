// pages/MonthlyBill/MonthlyBill.js
Page({
  data: {
    monthlyExpense: '0.00',
    monthlyIncome: '0.00',
    monthlyBalance: '0.00',
    transactions: [],
    currentMonth: '',
    selectedMonth: '',
    maxMonth: '',
    hasTransactions: false,
    showDetailModal: false,
    selectedTransaction: null
  },

  onLoad(options) { // 添加options参数
    let initialMonth = ''
    
    // 优先使用传入的月份参数
    if (options.month) {
      initialMonth = options.month
    } else {
      const now = new Date()
      initialMonth = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`
    }
  
    this.setData({
      selectedMonth: initialMonth,
      maxMonth: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
      currentMonth: this.formatDisplayMonth(initialMonth)
    })
  
    this.loadTransactionData()
  },

  goBack() {
    wx.redirectTo({
      url: '/pages/main/main'
    });
  },

  async loadTransactionData(callback) {
    wx.showLoading({ title: '加载中...' })
    try {
      const db = wx.cloud.database()
      const { startDate, endDate } = this.getMonthRange()
      
      const cacheKey = `transactions_${this.data.selectedMonth}`
      wx.removeStorageSync(cacheKey)

      const res = await db.collection('keepinglist')
        .where({
          date: db.command.and([
            db.command.gte(startDate),
            db.command.lte(endDate)
          ])
        })
        .orderBy('date', 'desc')
        .get()

      this.processData(res.data)
      wx.setStorageSync(cacheKey, res.data)
    } catch (err) {
      console.error('数据加载失败:', err)
      wx.showToast({ title: '数据加载失败', icon: 'none' })
    }
    wx.hideLoading()
    callback && callback()
  },

  processData(records) {
    let totalExpense = 0, totalIncome = 0
    const groupedTransactions = {}

    records.forEach(item => {
      const isExpense = item.type === '支出'
      const amount = parseFloat(item.amount)
      
      if (isExpense) {
        totalExpense += amount
      } else {
        totalIncome += amount
      }

      const formattedDate = this.formatDateWithWeek(item.date)
      if (!groupedTransactions[formattedDate]) {
        groupedTransactions[formattedDate] = {
          date: formattedDate,
          items: [],
          income: 0,
          expense: 0
        }
      }

      if (isExpense) {
        groupedTransactions[formattedDate].expense += amount
      } else {
        groupedTransactions[formattedDate].income += amount
      }

      groupedTransactions[formattedDate].items.push({
        _id: item._id,
        date: item.date, 
        time: item.time,
        description: item.category?.name || '未分类',
        amount: `${isExpense ? '-' : '+'}¥${amount.toFixed(2)}`,
        type: item.type,
        remark: item.remark || '无备注'
      })
    })

    const transactions = Object.values(groupedTransactions).map(group => ({
      ...group,
      income: group.income.toFixed(2),
      expense: group.expense.toFixed(2)
    }))

    this.setData({
      monthlyExpense: totalExpense.toFixed(2),
      monthlyIncome: totalIncome.toFixed(2),
      monthlyBalance: (totalIncome - totalExpense).toFixed(2),
      transactions,
      hasTransactions: transactions.length > 0
    })
  },

  onMonthChange(e) {
    const selected = e.detail.value
    this.setData({
      selectedMonth: selected,
      currentMonth: this.formatDisplayMonth(selected)
    }, () => {
      this.loadTransactionData()
    })
  },

  getMonthRange() {
    const [year, month] = this.data.selectedMonth.split('-')
    const monthNumber = parseInt(month, 10)
    const endDate = new Date(year, monthNumber, 0).getDate()
    
    return {
      startDate: `${year}-${month.padStart(2, '0')}-01`,
      endDate: `${year}-${month.padStart(2, '0')}-${endDate.toString().padStart(2, '0')}`
    }
  },

  formatDisplayMonth(monthStr) {
    const [year, month] = monthStr.split('-')
    return `${year}年${parseInt(month)}月`
  },

  formatDateWithWeek(dateStr) {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const [year, month, day] = dateStr.split('-')
    const date = new Date(year, parseInt(month) - 1, day)
    return `${parseInt(month)}月${parseInt(day)}日 ${weekDays[date.getDay()]}`
  },

  onTransactionTap(e) {
    const transactionId = e.currentTarget.dataset.id
    const transaction = this.data.transactions
      .flatMap(group => group.items)
      .find(item => item._id === transactionId)
      
    if (transaction) {
      this.setData({
        showDetailModal: true,
        selectedTransaction: transaction
      })
    }
  },

  handleCloseModal() {
    this.setData({
      showDetailModal: false,
      selectedTransaction: null
    })
  },
  onModalClose() {
    this.setData({ showModal: false })
  }
})
