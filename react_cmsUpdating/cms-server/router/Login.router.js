const express = require('express')
const router = express.Router()
const execSQL = require('../model/mysql-conn')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  const {username, password} = req.body
  const sql = 'select * from cms_admin where admin_email=?'
  const result = await execSQL(sql, username)
  
  if (result.length === 0) {
    res.json({code: 201, msg: '账号错误'})

  } else {
    if (result[0].admin_pwd === password) {
      const tokenInfo = {
        id: result[0].admin_id,
        email: result[0].admin_email,
        username: result[0].admin_nickname,
        avatar: result[0].admin_pic
      }
      const token = jwt.sign(tokenInfo, 'castle No1');
      res.json({code: 200, msg: '登录成功', token: token})

    } else {
      res.json({code: 202, msg: '密码错误'})
      
    }
  }
})

router.get('/userinfo', (req, res) => {
  const userInfo = jwt.verify(req.headers.authorization, 'castle No1')
  res.send(userInfo)
})

module.exports = router