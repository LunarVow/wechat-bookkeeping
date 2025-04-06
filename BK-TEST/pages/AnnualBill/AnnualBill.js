// pages/AnnualBill/AnnualBill.js
Page({
  data: {
    annualExpense: '0.00',
    annualIncome: '0.00',
    annualBalance: '0.00',
    transactions: [],
    currentYear: '',
    selectedYear: '',
    maxYear: '',
    hasTransactions: false,
    showDetailModal: false,
    selectedTransaction: null
  },

  onLoad(options) {
    let initialYear = ''
    if (options.year) {
      initialYear = options.year
    } else {
      initialYear = `${new Date().getFullYear()}`
    }

    this.setData({
      selectedYear: initialYear,
      maxYear: `${new Date().getFullYear()}`,
      currentYear: `${initialYear}年`
    })

    this.loadTransactionData()
  },

  goBack() {
    wx.redirectTo({
      url: '/pages/main/main'
    })
  },

  async loadTransactionData(callback) {
    wx.showLoading({ title: '加载中...' })
    try {
      const db = wx.cloud.database()
      const { startDate, endDate } = this.getYearRange()
      
      const cacheKey = `transactions_${this.data.selectedYear}`
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
      annualExpense: totalExpense.toFixed(2),
      annualIncome: totalIncome.toFixed(2),
      annualBalance: (totalIncome - totalExpense).toFixed(2),
      transactions,
      hasTransactions: transactions.length > 0
    })
  },

  onYearChange(e) {
    const selected = e.detail.value
    this.setData({
      selectedYear: selected,
      currentYear: `${selected}年`
    }, () => {
      this.loadTransactionData()
    })
  },

  getYearRange() {
    const year = this.data.selectedYear
    return {
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`
    }
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
  handleRefreshData() {
    this.loadTransactionData(() => {
      wx.showToast({ title: '数据已更新', icon: 'success' })
    })
  }
})
