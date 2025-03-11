// pages/take/take.js
Page({
  goBack() {
    wx.redirectTo({
      url: '/pages/main/main' // 请确认你的main页面实际路径
    });
  },
  switchType(e) {
    const type = e.currentTarget.dataset.type
    const app = getApp()
    
    // 更新全局状态
    app.globalData.currentTab = type
    // 使用重定向方式跳转
    wx.redirectTo({
      url: type === 'expense' 
        ? '/pages/collection/collection' 
        : '/pages/take/take'
    })
  },

  onLoad() {
    const app = getApp()
    if (!app.globalData.currentTab) {
      app.globalData.currentTab = 'expense'
    }
    const now = new Date()
    this.setData({
      currentDate: now.toISOString().split('T')[0], // 仅日期部分
      currentTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    })
  },

  data: {
    isExpense: false,
    currentDate:"",
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
    amount: '',
    keyboardKeys: ['1','2','3','+','4','5','6','-','7','8','9','.', '再记','0','delete','保存']
  },

 // 日期处理方法
 getLocalISOString(date) {
  return date.toISOString().split('T')[0] // 仅返回日期部分
},
// 修改后的日期变更处理
onDateChange(e) {
  const selected = e.detail.value
  this.setData({
    currentDate: this.getLocalISOString(new Date(selected))
  })
},

// 时间变更处理
onTimeChange(e) {
  this.setData({
    currentTime: e.detail.value
  })
},

  handleKeyPress(e) {
    const key = e.currentTarget.dataset.key;
    // 处理再记按钮（原位置）
    if (key === '再记') {
      this.saveRecord(false); // 不跳转
      return;
    }
    // 处理保存按钮（原位置）
    if (key === '保存') {
      this.saveRecord(true);  // 需要跳转
      return;
    }

    let amount = this.data.amount;

    if (key === '+' || key === '-') {
      let num = parseFloat(amount || 0);
      if (key === '+') num += 1;
      if (key === '-') num = Math.max(num - 1, 0);
      amount = num.toString();
    }
    else if (/[0-9]/.test(key)) {
      amount = amount === '0' ? key : amount + key;
    }
    else if (key === '.') {
      if (!amount.includes('.')) {
        amount = amount === '' ? '0.' : amount + '.';
      }
    }
    else if (key === 'delete') {
      amount = amount.slice(0, -1);
      if (amount === '') amount = '';
      if (amount.endsWith('.')) amount = amount.slice(0, -1);
    }

    amount = this.formatAmount(amount);
    this.setData({ amount });
  },

  formatAmount(amount) {
    if (amount === '') return '';
    
    if (amount.startsWith('.')) {
      amount = '0' + amount;
    }
    
    const parts = amount.split('.');
    let intPart = parts[0].replace(/^0+/, '') || '0';
    let decPart = parts[1] ? parts[1].slice(0, 2) : '';

    let result = intPart;
    if (amount.includes('.') || decPart) {
      result += '.' + decPart;
      if (amount.endsWith('.') && decPart === '') {
        result = intPart + '.';
      }
    }
    
    return result;
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  // 保存记录
  async saveRecord(needNavigate = false) {
    const { selectedCategory, categories, amount, currentDate, remark } = this.data;
  
    // 数据验证保持不变
    if (!selectedCategory || !categories.some(item => item.id === selectedCategory)) {
      return wx.showToast({ title: '请选择有效分类', icon: 'none' });
    }
  
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return wx.showToast({ title: '金额需大于0', icon: 'none' });
    }
  
    const selectedCategoryObj = categories.find(item => item.id === selectedCategory);
    if (!selectedCategoryObj) {
      return wx.showToast({ title: '无效的分类', icon: 'none' });
    }
  
    // 获取当前时间并格式化
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
    // 构造新的记录对象
    const record = {
      type: '收入', // 修改为收入类型
      category: {
        id: selectedCategory,
        name: selectedCategoryObj.name
      },
      amount: numericAmount,
      date: this.data.currentDate,
      remark: remark || '无备注',
      time: this.data.currentTime,
    };

    try {
      const db = wx.cloud.database();
      await db.collection('keepinglist').add({ data: record });
      
      wx.showToast({ 
        title: '保存成功', 
        icon: 'success',
        success: () => {
          setTimeout(() => {
            // 清空输入
            this.setData({/* 保持不变 */});

            if (needNavigate) {
              // 获取当前记录的月份（格式：YYYY-MM）
              const recordMonth = currentDate.substr(0, 7)
              
              wx.redirectTo({
                url: `/pages/MonthlyBill/MonthlyBill?month=${recordMonth}`
              });
            }
          }, 1500);
        }
      });
    } catch (err) {
      console.error('保存失败:', err);
      wx.showToast({ 
        title: `保存失败: ${err.errMsg || '未知错误'}`,
        icon: 'none',
        duration: 3000
      });
  }
  
},

  selectCategory(e) {
    this.setData({ selectedCategory: e.currentTarget.dataset.id });
  }
});
