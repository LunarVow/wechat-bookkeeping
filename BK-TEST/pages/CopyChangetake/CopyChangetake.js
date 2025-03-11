// pages/CopyChangetake/CopyChangetake.js
Page({
  data: {
    mode: '', // copy/edit
    editData: null,
    currentDate: "",
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

  onLoad(options) {
    this.initDefaultTime()
    
    if (options.mode === 'copy') {
      this.handleCopyMode(options)
    } 
    
    if (options.mode === 'edit') {
      this.handleEditMode(options)
    }
  },

  initDefaultTime() {
    const now = new Date()
    this.setData({
      currentDate: now.toISOString().split('T')[0],
      currentTime: `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
    })
  },

  handleCopyMode(options) {
    this.setData({
      mode: 'copy',
      amount: options.amount ? parseFloat(options.amount).toFixed(2) : '',
      remark: options.remark || ''
    })
  },

  handleEditMode(options) {
    try {
      const editData = JSON.parse(options.data)
      this.processEditData(editData)
      wx.setNavigationBarTitle({ title: '编辑收入' })
    } catch (e) {
      console.error('数据解析失败:', e)
      wx.showToast({ title: '数据加载失败', icon: 'none' })
      wx.navigateBack()
    }
  },

  processEditData(editData) {
    let categoryId = 0;
    if (editData.category) {
      if (typeof editData.category === 'object') {
        categoryId = editData.category.id;
      } else {
        const foundCategory = this.data.categories.find(
          c => c.name === editData.category
        );
        categoryId = foundCategory ? foundCategory.id : 0;
      }
    }

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

  onDateChange(e) {
    this.setData({
      currentDate: e.detail.value
    })
  },

  onTimeChange(e) {
    this.setData({
      currentTime: e.detail.value
    })
  },

  handleKeyPress(e) {
    const key = e.currentTarget.dataset.key;
    
    if (key === '再记') return this.handleSave(false);
    if (key === '保存') return this.handleSave(true);
    
    let amount = this.data.amount;
  
    if (['+', '-'].includes(key)) {
      const num = parseFloat(amount || 0);
      amount = key === '+' ? (num + 1) : Math.max(num - 1, 0);
      amount = amount.toString();
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
      if (amount === '' || amount === '0') amount = '';
      if (amount.endsWith('.')) amount = amount.slice(0, -1);
    }
    
    this.setData({
      amount: this.formatAmount(amount || '')
    });
  },

  formatAmount(amount) {
    if (!amount) return '0.00';
    if (amount.startsWith('.')) amount = '0' + amount;
  
    const parts = amount.split('.');
    let intPart = parts[0].replace(/^0+/, '') || '0';
    let decPart = parts[1] ? parts[1].slice(0, 2) : '';
  
    let result = intPart;
    if (decPart || amount.includes('.')) {
      result += `.${decPart}`;
    }
    return result;
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  selectCategory(e) {
    this.setData({ 
      selectedCategory: e.currentTarget.dataset.id 
    })
  },

  async handleSave(needNavigate = true) {
    if (!this.validateForm()) return

    try {
      if (this.data.mode === 'edit') {
        await this.updateExistingRecord()
      } else {
        await this.createNewRecord()
      }

      this.handleSuccess(needNavigate)
    } catch (err) {
      this.handleError(err)
    }
  },

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

  async updateExistingRecord() {
    const db = wx.cloud.database()
    const updateData = this.prepareRecordData()

    await db.collection('keepinglist').doc(this.data.editData._id).update({
      data: updateData
    })
  },

  async createNewRecord() {
    const db = wx.cloud.database()
    const newData = this.prepareRecordData()

    await db.collection('keepinglist').add({
      data: {
        ...newData,
        type: '收入',
        createTime: db.serverDate()
      }
    })
  },

  prepareRecordData() {
    return {
      category: {
        id: this.data.selectedCategory,
        name: this.data.categories.find(c => c.id === this.data.selectedCategory).name
      },
      amount: parseFloat(this.data.amount),
      date: this.data.currentDate,
      time: this.data.currentTime,
      remark: this.data.remark || '无备注'
    }
  },

  handleSuccess(needNavigate) {
    wx.showToast({
      title: this.data.mode === 'edit' ? '更新成功' : '保存成功',
      icon: 'success'
    })

    if (needNavigate) {
      getApp().globalData.needRefresh = true
      const recordMonth = this.data.currentDate.substr(0, 7)
      
      setTimeout(() => {
        wx.redirectTo({
          url: `/pages/MonthlyBill/MonthlyBill?month=${recordMonth}`
        })
      }, 1500)
    }
  },

  handleError(err) {
    console.error('操作失败:', err)
    wx.showToast({ 
      title: this.data.mode === 'edit' ? '更新失败' : '保存失败', 
      icon: 'none' 
    })
  },

  goBack() {
    wx.redirectTo({
      url: '/pages/main/main'
    })
  }
})
