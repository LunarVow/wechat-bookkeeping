const express = require('express');
const axios = require('axios');
const app = express();
 
app.use(express.json());
 
// 微信小程序登录接口
app.post('/login', async (req, res) => {
  const { code } = req.body;
 
  try {
    // 请求微信服务器，获取 openid 和 session_key
    const wechatResponse = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session`,
      {
        params: {
          appid: 'your-app-id',
          secret: 'your-app-secret',
          js_code: code,
          grant_type: 'authorization_code',
        },
      }
    );
 
    const { openid, session_key } = wechatResponse.data;
 
    // 根据 openid 查找或创建用户
    const user = findOrCreateUser(openid);
 
    res.json({ success: true, userInfo: user });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ success: false, message: '登录失败' });
  }
});
 
// 模拟用户查找/创建方法
function findOrCreateUser(openid) {
  // 这里可以查询数据库，或者创建新用户
  return { openid, nickname: '新用户' };
}
 
app.listen(3000, () => console.log('Server running on port 3000'));