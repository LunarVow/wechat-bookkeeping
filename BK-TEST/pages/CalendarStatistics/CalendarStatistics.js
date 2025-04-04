const app = getApp()
const db = wx.cloud.database({ env: "bookkeeping-0g8ou3g9e195b86f" })

const Lunar = {
  lunarInfo: [
    0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
    0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
    0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
    0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
    0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
    0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
    0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
    0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0,
    0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63, 0x09370,
    0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06b20, 0x1a6c4, 0x0aae0, 0x092e0, 0x0d2e3,
    0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4, 0x052d0, 0x0a9b8,
    0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
    0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
    0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
    0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0
  ],

  getLunar(date) {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let i, leap = 0, temp = 0
    let baseDate = new Date(1900, 0, 31)
    let offset = Math.floor((date - baseDate) / 86400000)

    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lunarYearDays(i)
      offset -= temp
    }
    if (offset < 0) { offset += temp; i-- }

    this.year = i
    leap = this.leapMonth(i)
    this.isLeap = false

    for (i = 1; i < 13 && offset > 0; i++) {
      if (leap > 0 && i == (leap + 1) && !this.isLeap) {
        --i; this.isLeap = true
        temp = this.leapDays(this.year)
      } else {
        temp = this.monthDays(this.year, i)
      }

      if (this.isLeap && i == (leap + 1)) this.isLeap = false
      offset -= temp
    }

    if (offset == 0 && leap > 0 && i == leap + 1) {
      if (this.isLeap) { this.isLeap = false }
      else { this.isLeap = true; --i }
    }
    if (offset < 0) { offset += temp; --i }

    this.month = i
    this.day = offset + 1

    return {
      year: this.year,
      month: this.month,
      day: this.day,
      isLeap: this.isLeap,
      monthStr: this.getMonthStr(),
      dayStr: this.getDayStr(),
      festival: this.getFestival()
    }
  },

  lunarYearDays(year) {
    let sum = 348
    for (let i = 0x8000; i > 0x8; i >>= 1) sum += (this.lunarInfo[year - 1900] & i) ? 1 : 0
    return sum + this.leapDays(year)
  },

  leapMonth(year) { return (this.lunarInfo[year - 1900] & 0xf) },

  leapDays(year) {
    if (this.leapMonth(year)) return ((this.lunarInfo[year - 1900] & 0x10000) ? 30 : 29)
    else return 0
  },

  monthDays(year, month) {
    return ((this.lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29)
  },

  getMonthStr() {
    let monthStr = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
    let str = (this.isLeap ? '闰' : '') + monthStr[this.month - 1] + '月'
    return this.month == 1 ? '正月' : str
  },

  getDayStr() {
    let dayStr = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
    return dayStr[this.day - 1]
  },

  getFestival() {
    let festivals = {
      '1-1': '春节', '1-15': '元宵', '5-5': '端午', '7-7': '七夕',
      '8-15': '中秋', '9-9': '重阳', '12-8': '腊八'
    }
    return festivals[this.month + '-' + this.day] || null
  }
}

Page({
  data: {
    selectedTab: 'all' ,
    showSelectedDate: false,  // 是否显示特定日期的记录
    selectedDateTransactions: [], // 选中日期的交易数据
    currentMonth: '',
    dates: [],
    monthlyData: { income: '0.00', expense: '0.00', balance: '0.00' },
    selectedDate: '',
    selectedDayData: [],
    selectedDayStats: { income: '0.00', expense: '0.00' },
    transactions: [],
    hasTransactions: false,
    showDetailModal: false,
    selectedTransaction: null
  },

  onLoad() {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}`
    const selectedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`

    this.setData({
      currentMonth,
      selectedDate
    }, () => {
      this.initCalendar()
      this.loadMonthlyData()
    })
  },

  initCalendar() {
    const [year, month] = this.data.currentMonth.split('.').map(Number)
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)
    const startDay = firstDay.getDay() || 7

    let dates = []
    for (let i = startDay - 1; i > 0; i--) {
      const date = new Date(year, month - 1, -i + 1)
      dates.push(this.createDateCell(date, false))
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month - 1, i)
      dates.push(this.createDateCell(date, true))
    }
    const totalCells = Math.ceil(dates.length / 7) * 7
    for (let i = 1; dates.length < totalCells; i++) {
      const date = new Date(year, month, i)
      dates.push(this.createDateCell(date, false))
    }

    this.setData({ dates }, () => this.mergeTransactionData())
  },

  createDateCell(date, isCurrentMonth) {
    const lunar = Lunar.getLunar(date)
    let displayText = ''
    if (lunar.festival) {
      displayText = lunar.festival
    } else if (lunar.dayStr === '初一') {
      displayText = lunar.monthStr
    } else {
      displayText = lunar.dayStr
    }

    return {
      day: date.getDate(),
      displayText: isCurrentMonth ? displayText : '',
      date: `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
      hasRecord: false,
      income: 0,
      expense: 0,
      isCurrentMonth,
      festival: lunar.festival
    }
  },

// 新增切换选项卡方法
switchTab(e) {
  const tab = e.currentTarget.dataset.tab
  this.setData({ selectedTab: tab }, () => {
    this.updateCellStyles()
  })
},
// 新增计算方法
getBalanceStatus(income, expense) {
  const balance = income - expense
  if (balance > 0) return 'positive'
  if (balance < 0) return 'negative'
  return 'neutral'
},

// 新增更新样式方法
updateCellStyles() {
  this.setData({
    dates: this.data.dates.map(cell => ({
      ...cell,
      balanceStatus: this.getBalanceStatus(cell.income, cell.expense)
    }))
  })
},

  mergeTransactionData() {
    const monthPrefix = this.data.currentMonth.replace('.', '-') + '-'
    db.collection('keepinglist')
      .where({
        date: db.RegExp({
          regexp: `^${monthPrefix}`,
          options: 'i'
        })
      })
      .get()
      .then(res => {
        console.log('查询结果:', res.data)

        const dayMap = res.data.reduce((map, item) => {
          const key = item.date
          if (!map[key]) map[key] = { income: 0, expense: 0 }

          const amount = Number(item.amount) || 0

          if (item.type === '收入') {
            map[key].income += amount
          } else {
            map[key].expense += amount
          }
          return map
        }, {})

        console.log('处理后的dayMap:', dayMap)

        this.setData({
          dates: this.data.dates.map(cell => {
            const record = dayMap[cell.date]
            const income = record ? parseFloat(record.income) : 0
            const expense = record ? parseFloat(record.expense) : 0
            
            return {
              ...cell,
              income: income.toFixed(2),
              expense: expense.toFixed(2),
              balance: (income - expense).toFixed(2),
              balanceStatus: this.getBalanceStatus(income, expense),
              hasRecord: !!record
            }
          })
        }, () => {
          console.log('最终日期数据:', this.data.dates)
        })
      })
      .catch(err => {
        console.error('数据查询失败:', err)
      })
  },

  loadMonthlyData() {
    const monthStr = this.data.currentMonth.replace('.', '-') + '-'
    db.collection('keepinglist')
      .where({
        date: db.RegExp({
          regexp: `^${monthStr}`,
          options: 'i'
        })
      })
      .get()
      .then(res => {
        const stats = res.data.reduce((acc, cur) => {
          if (cur.type === '收入') acc.income += parseFloat(cur.amount)
          else acc.expense += parseFloat(cur.amount)
          return acc
        }, { income: 0, expense: 0 })

        this.setData({
          monthlyData: {
            income: stats.income.toFixed(2),
            expense: stats.expense.toFixed(2),
            balance: (stats.income - stats.expense).toFixed(2)
          }
        })
      })
  },
  loadTransactions() {
    const monthStr = this.data.currentMonth.replace('.', '-') + '-'
    db.collection('keepinglist')
      .where({
        date: db.RegExp({
          regexp: `^${monthStr}`,
          options: 'i'
        })
      })
      .orderBy('date', 'desc')
      .get()
      .then(res => {
        this.processTransactionData(res.data);
      })
  },

  processTransactionData(records) {
    let groupedTransactions = {};
    records.forEach(item => {
      const key = item.date;
      if (!groupedTransactions[key]) {
        groupedTransactions[key] = {
          displayDate: this.formatDateWithWeek(item.date), // 新增显示用字段
          date: item.date, // 保留原始日期
          items: [],
          income: 0,
          expense: 0
        };
      }
      
      const amount = parseFloat(item.amount);
      if (item.type === '收入') {
        groupedTransactions[key].income += amount;
      } else {
        groupedTransactions[key].expense += amount;
      }

      groupedTransactions[key].items.push({
        _id: item._id,
        date: item.date, // 添加原始日期字段
        time: item.time,
        description: item.category?.name || '未分类',
        amount: `${item.type === '支出' ? '-' : '+'}¥${amount.toFixed(2)}`,
        type: item.type,
        remark: item.remark || '无备注'
      });
    });

    const transactions = Object.values(groupedTransactions).map(group => ({
      ...group,
      income: group.income.toFixed(2),
      expense: group.expense.toFixed(2)
    }));

    this.setData({
      transactions,
      hasTransactions: transactions.length > 0
    });
  },

  formatDateWithWeek(dateStr) {
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, parseInt(month) - 1, day);
    return `${parseInt(month)}月${parseInt(day)}日 ${weekDays[date.getDay()]}`;
  },

  // 新增事件处理
  onTransactionTap(e) {
    const transactionId = e.currentTarget.dataset.id;
    const transaction = this.data.transactions
      .flatMap(group => group.items)
      .find(item => item._id === transactionId);
      
    if (transaction) {
      this.setData({
        showDetailModal: true,
        selectedTransaction: transaction
      });
    }
  },

  handleCloseModal() {
    this.setData({
      showDetailModal: false,
      selectedTransaction: null
    });
  },

  // 修改原有loadMonthlyData方法
  loadMonthlyData() {
    const monthStr = this.data.currentMonth.replace('.', '-') + '-';
    db.collection('keepinglist')
      .where({
        date: db.RegExp({
          regexp: `^${monthStr}`,
          options: 'i'
        })
      })
      .get()
      .then(res => {
        const stats = res.data.reduce((acc, cur) => {
          if (cur.type === '收入') acc.income += parseFloat(cur.amount);
          else acc.expense += parseFloat(cur.amount);
          return acc;
        }, { income: 0, expense: 0 });

        this.setData({
          monthlyData: {
            income: stats.income.toFixed(2),
            expense: stats.expense.toFixed(2),
            balance: (stats.income - stats.expense).toFixed(2)
          }
        });

        // 加载交易明细
        this.processTransactionData(res.data);
      });
  },

  handleMonthChange(e) {
    const value = e.detail.value
    this.setData({
      currentMonth: value.replace('-', '.'),
      selectedDate: value + '-01',
      showSelectedDate: false,    // 重置显示状态
      selectedDateTransactions: [] // 清空选中数据
    }, () => {
      this.initCalendar()
      this.loadMonthlyData()
    })
  },


selectDate(e) {
  const date = e.currentTarget.dataset.date;
  const isSameDate = this.data.selectedDate === date;
  
  // 如果是重复点击相同日期则切换显示模式
  if (this.data.showSelectedDate && isSameDate) {
    this.setData({ 
      showSelectedDate: false,
      selectedDate: date 
    });
  } else {
    // 过滤出选中日期的交易数据
    const selectedGroup = this.data.transactions.find(
      group => group.date === date
    );
    
    this.setData({
      selectedDate: date,
      showSelectedDate: true,
      selectedDateTransactions: selectedGroup ? [selectedGroup] : []
    });
  }
},

  goToToday() {
    const now = new Date()
    const currentMonth = `${now.getFullYear()}.${(now.getMonth() + 1).toString().padStart(2, '0')}`
    const selectedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`

    this.setData({
      currentMonth,
      selectedDate
    }, () => {
      this.initCalendar()
      this.loadMonthlyData()
    })
  }
})