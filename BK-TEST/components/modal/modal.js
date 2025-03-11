// components/modal/modal.js
Component({
  properties: {
    visible: Boolean,
    transaction: Object
  },

  methods: {
    // 关闭弹窗方法
    closeModal() {
      this.triggerEvent('close') // 触发关闭事件
    },
    handleCopy() {
      const type = this.data.transaction.type === '支出' ? 'collection' : 'take';
      // 去除符号和货币符号，保留纯数字
      const rawAmount = this.data.transaction.amount.replace(/[^0-9.]/g, '');
      wx.navigateTo({
        url: `/pages/CopyChange${type}/CopyChange${type}?mode=copy&amount=${rawAmount}`
      });
    },
    handleEdit() {
      const originData = this.data.transaction;
      
      // 兼容旧数据格式（如果category是字符串）
      let processedCategory = originData.category;
      if (typeof originData.category === 'string') {
        processedCategory = {
          name: originData.category,
          // 这里需要根据实际情况添加查找id的逻辑，示例使用默认值
          id: this.findCategoryIdByName(originData.category) || 0
        };
      }
    
      const editData = {
        ...originData,
        amount: originData.amount.replace(/[^0-9.]/g, ''),
        date: originData.date.split(' ')[0],
        time: originData.time,
        category: processedCategory // 确保传递正确的分类对象
      };
    
      const pageType = originData.type === '支出' ? 'collection' : 'take';
      wx.navigateTo({
        url: `/pages/CopyChange${pageType}/CopyChange${pageType}?mode=edit&data=${JSON.stringify(editData)}`
      });
    },
    handleDelete() {
      wx.showModal({
        title: '确认删除',
        content: '确定要删除这条记录吗？',
        success: (res) => {
          if (res.confirm) {
            this.deleteRecord()
          }
        }
      })
    },
    async deleteRecord() {
      try {
        const db = wx.cloud.database()
        await db.collection('keepinglist').doc(this.data.transaction._id).remove()
        wx.showToast({ title: '删除成功', icon: 'success' })
        this.triggerEvent('delete')
      } catch (err) {
        console.error('删除失败:', err)
        wx.showToast({ title: '删除失败', icon: 'none' })
      }
    }
  }
})
