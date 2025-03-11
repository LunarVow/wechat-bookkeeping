// pages/CopyChangecollection/CopyChangecollection.js
Page({
  data: {
    mode: '', // copy/edit
    editData: null,
    isExpense: true,
    currentDate: "",
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
    amount: '',
    keyboardKeys: ['1','2','3','+','4','5','6','-','7','8','9','.', '再记','0','delete','保存']
  },

  onLoad(options) {
    this.initDefaultTime()
    
    if (options.mode === 'copy') {
      this.handleCopyMode(options)
    } 
    
    if (options.mode === 'edit') {
      this.handleEditMode(options)
    }
  },

  // 初始化默认时间
  initDefaultTime() {
    const now = new Date()
    this.setData({
      currentDate: now.toISOString().split('T')[0],
      currentTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    })
  },

  // 处理复制模式
  handleCopyMode(options) {
    this.setData({
      mode: 'copy',
      amount: options.amount ? parseFloat(options.amount).toFixed(2) : '',
      remark: options.remark || ''
    })
  },

  // 处理编辑模式
  handleEditMode(options) {
    try {
      const editData = JSON.parse(options.data)
      this.processEditData(editData)
      wx.setNavigationBarTitle({ title: '编辑支出' })
    } catch (e) {
      console.error('数据解析失败:', e)
      wx.showToast({ title: '数据加载失败', icon: 'none' })
      wx.navigateBack()
    }
  },

  // 处理编辑数据
  processEditData(editData) {
    // 处理分类数据（兼容新旧格式）
    let categoryId = 0;
    if (editData.category) {
      if (typeof editData.category === 'object') {
        categoryId = editData.category.id;
      } else {
        // 如果旧数据存储的是分类名称，查找对应id
        const foundCategory = this.data.categories.find(
          c => c.name === editData.category
        );
        categoryId = foundCategory ? foundCategory.id : 0;
      }
    }
  
    // 处理时间数据
    const [datePart, timePart] = editData.date.split(' ');
    const [year, month, day] = (datePart || '').split('-');
    const [hours, minutes] = (editData.time || '').split(':');
  
    this.setData({
      mode: 'edit',
      editData,
      selectedCategory: categoryId,
      amount: parseFloat(editData.amount).toFixed(2),
      remark: editData.remark || '',
      currentDate: year ? `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}` : this.data.currentDate,
      currentTime: hours ? `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}` : this.data.currentTime
    });
  },
  
  findCategoryIdByName(name) {
    const category = this.data.categories.find(c => c.name === name);
    return category ? category.id : 0;
  },

  // 日期变更处理
  onDateChange(e) {
    this.setData({
      currentDate: e.detail.value
    })
  },

  // 时间变更处理
  onTimeChange(e) {
    this.setData({
      currentTime: e.detail.value
    })
  },

  // 键盘输入处理
  handleKeyPress(e) {
    const key = e.currentTarget.dataset.key;
    
    // 处理功能按钮
    if (key === '再记') return this.handleSave(false);
    if (key === '保存') return this.handleSave(true);
    
    let amount = this.data.amount;
  
    // 处理运算符
    if (['+', '-'].includes(key)) {
      const num = parseFloat(amount || 0);
      amount = key === '+' ? (num + 1) : Math.max(num - 1, 0);
      amount = amount.toString();
    }
    // 处理数字
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
      // 处理删除后为空的情况
      if (amount === '' || amount === '0') amount = '';
      // 处理删除小数点后的情况
      if (amount.endsWith('.')) amount = amount.slice(0, -1);
    }
    // 传递原始值而不是'0'
    this.setData({
      amount: this.formatAmount(amount || '') // 修改此处
    });
  },

  // 处理金额输入
  processAmountInput(key, currentAmount) {
    if (['+', '-'].includes(key)) {
      return this.handleMathOperation(key, currentAmount)
    }

    if (key === '.') {
      return currentAmount.includes('.') ? currentAmount : currentAmount + key
    }

    return currentAmount === '0' ? key : currentAmount + key
  },

  // 处理加减运算
  handleMathOperation(operator, currentAmount) {
    let num = parseFloat(currentAmount || 0)
    if (operator === '+') num += 1
    if (operator === '-') num = Math.max(num - 1, 0)
    return num.toFixed(2)
  },

  formatAmount(amount) {
    if (!amount) return '0.00';
    if (amount.startsWith('.')) amount = '0' + amount;
  
    const parts = amount.split('.');
    let intPart = parts[0].replace(/^0+/, '') || '0';
    let decPart = parts[1] ? parts[1].slice(0, 2) : '';
  
    let result = intPart;
    if (decPart || amount.includes('.')) {
      result += `.${decPart}`; // 移除了padEnd补零
    }
    return result;
  },
  
  // 确保删除按钮处理
  handleDelete() {
    let amount = this.data.amount;
    if (amount.length > 0) {
      amount = amount.slice(0, -1);
      if (amount === '') amount = '0.00';
      this.setData({ amount: this.formatAmount(amount) });
    }
  },

  // 备注输入处理
  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  // 分类选择
  selectCategory(e) {
    this.setData({ 
      selectedCategory: e.currentTarget.dataset.id 
    })
  },

// 保存处理
async handleSave(needNavigate = true) {
  if (!this.validateForm()) return

  try {
    if (this.data.mode === 'edit') {
      await this.updateExistingRecord()
    } else {
      await this.createNewRecord()
    }

    this.handleSuccess(needNavigate) // 确保传递needNavigate参数
  } catch (err) {
    this.handleError(err)
  }
},

  // 表单验证
  validateForm() {
    if (!this.data.selectedCategory) {
      wx.showToast({ title: '请选择分类', icon: 'none' })
      return false
    }

    const amount = parseFloat(this.data.amount)
    if (isNaN(amount) || amount <= 0) {
      wx.showToast({ title: '请输入有效金额', icon: 'none' })
      return false
    }

    return true
  },

  // 更新已有记录
  async updateExistingRecord() {
    const db = wx.cloud.database()
    const updateData = this.prepareRecordData()

    await db.collection('keepinglist').doc(this.data.editData._id).update({
      data: updateData
    })
  },

  // 创建新记录
  async createNewRecord() {
    const db = wx.cloud.database()
    const newData = this.prepareRecordData()

    await db.collection('keepinglist').add({
      data: {
        ...newData,
        type: '支出',
        createTime: db.serverDate()
      }
    })
  },

// 准备记录数据
prepareRecordData() {
  return {
    category: {
      id: this.data.selectedCategory,
      name: this.data.categories.find(c => c.id === this.data.selectedCategory).name
    },
    amount: parseFloat(this.data.amount),
    date: this.data.currentDate,  // 确保使用YYYY-MM-DD格式
    time: this.data.currentTime,
    remark: this.data.remark || '无备注'
  }
},

  // 处理成功操作
handleSuccess(needNavigate) {
  wx.showToast({
    title: this.data.mode === 'edit' ? '更新成功' : '保存成功',
    icon: 'success'
  })

  if (needNavigate) {
    getApp().globalData.needRefresh = true
    // 新增：获取当前记录的月份
    const recordMonth = this.data.currentDate.substr(0, 7)
    
    setTimeout(() => {
      wx.redirectTo({
        url: `/pages/MonthlyBill/MonthlyBill?month=${recordMonth}`
      })
    }, 1500)
  }
},

  // 处理错误
  handleError(err) {
    console.error('操作失败:', err)
    wx.showToast({ 
      title: this.data.mode === 'edit' ? '更新失败' : '保存失败', 
      icon: 'none' 
    })
  },

  // 返回主页
  goBack() {
    wx.redirectTo({
      url: '/pages/main/main'
    })
  }
})