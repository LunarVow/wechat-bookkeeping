// pages/auth/auth.js
Page({
  data: {},

  onLogin() {
    wx.login({
      success: () => {
        wx.cloud.callFunction({
          name: 'getOpenId',
          success: res => {
            const validOpenId = 'o3sLz69w7tkbP4_4JHQ_4Gzvhvhg';
            
            if (res.result.openid === validOpenId) {
              wx.showToast({
                title: '授权成功',
                icon: 'success',
                duration: 1500,
                success: () => {
                  setTimeout(() => {
                    wx.redirectTo({ url: '/pages/main/main' });
                  }, 1800);
                }
              });
            } else {
              wx.showModal({
                title: '权限不足',
                content: '当前账号无访问权限',
                showCancel: false,
                confirmText: '知道了'
              });
            }
          },
          fail: () => {
            wx.showModal({
              title: '提示',
              content: '用户信息获取失败，请重试',
              showCancel: false
            });
          }
        });
      },
      fail: () => {
        wx.showModal({
          title: '登录失败',
          content: '请检查网络后重试',
          showCancel: false
        });
      }
    });
  }
});