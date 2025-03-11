// pages/collection.js
Page({
  goBack() {
    wx.redirectTo({
      url: '/pages/main/main' // 请确认你的main页面实际路径
    });
  },
  switchType(e) {
    const type = e.currentTarget.dataset.type
    const app = getApp()
    app.globalData.currentTab = type
    
    // 修改为redirectTo跳转
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
  // 新增onShow生命周期
  onShow() {
    const app = getApp()
    // 添加双重保险逻辑
    this.setData({
      isExpense: app.globalData.currentTab === 'expense' || !app.globalData.currentTab
    })
  },

  data: {
    isExpense: true,
    currentDate:"",
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
    // 小键盘...
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

// 修改后的 handleKeyPress 方法
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

  // 处理加减操作
  if (key === '+' || key === '-') {
    let num = parseFloat(amount || 0);
    if (key === '+') num += 1;
    if (key === '-') num = Math.max(num - 1, 0);
    amount = num.toString();
  }
  // 处理数字输入
  else if (/[0-9]/.test(key)) {
    amount = amount === '0' ? key : amount + key;
  }
  // 处理小数点
  else if (key === '.') {
    if (!amount.includes('.')) {
      amount = amount === '' ? '0.' : amount + '.';
    }
  }
  // 处理删除
  else if (key === 'delete') {
    amount = amount.slice(0, -1);
    if (amount === '') amount = '';
    if (amount.endsWith('.')) amount = amount.slice(0, -1);
  }

  // 统一格式化处理
  amount = this.formatAmount(amount);
  this.setData({ amount });
},

// 修改后的格式化方法
formatAmount(amount) {
  if (amount === '') return '';
  
  // 处理 ".5" -> "0.5"
  if (amount.startsWith('.')) {
    amount = '0' + amount;
  }
  
  // 分割整数和小数部分
  const parts = amount.split('.');
  let intPart = parts[0].replace(/^0+/, '') || '0';
  let decPart = parts[1] ? parts[1].slice(0, 2) : '';

  // 组合结果（保留小数点）
  let result = intPart;
  if (amount.includes('.') || decPart) {
    result += '.' + decPart;
    // 处理类似 "5." 的情况
    if (amount.endsWith('.') && decPart === '') {
      result = intPart + '.';
    }
  }
  
  return result;
},
  


  
// 新增输入处理函数
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
      type: '支出',
      category: {
        id: selectedCategory,
        name: selectedCategoryObj.name
      },
      amount: numericAmount,
      date: this.data.currentDate, // 包含时间的完整日期
      remark: remark || '无备注',
      time:this.data.currentTime,
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
              const recordMonth = this.data.currentDate.substr(0, 7)
              
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
//---------------------------------------------------------
selectCategory(e) {
  this.setData({ selectedCategory: e.currentTarget.dataset.id });
}





})
