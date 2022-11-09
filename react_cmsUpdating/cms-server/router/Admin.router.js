const express = require('express')
const router = express.Router()
const AdminModel = require('../model/Admin.Model')

router.get('/admin', async (req, res) => {
  const arts = await AdminModel.findAllAdmin(1, 5)
  res.json(arts)
})

router.get('/admin/:id', async (req, res) => {
  const id = req.params.id
  const art = await AdminModel.findAdminById(id)
  res.json(art)
})

router.post('/admin', async (req, res) => {
  const obj = {
    admin_email: req.body.email,
    admin_nickname: req.body.nickname,
    admin_pwd: req.body.pwd,
    admin_gender: req.body.gender,
    admin_tel: req.body.tel,
    admin_age: req.body.age,
    admin_pic: req.body.avatar,
    admin_state: req.body.state,
    admin_sign: req.body.sign
  }
  const result = await AdminModel.addAdmin(obj)
  res.json(result)
})

router.put('/admin/:id', async (req, res) => {
  const obj = {
    admin_id: req.body.id,
    admin_email: req.body.email,
    admin_nickname: req.body.nickname,
    admin_gender: req.body.gender,
    admin_tel: req.body.tel,
    admin_age: req.body.age,
    admin_pic: req.body.avatar,
    admin_state: req.body.state,
    admin_sign: req.body.sign
  }
  const result = await AdminModel.modifyAdmin(obj)
  res.json(result)
})

router.put('/admin/:id/state/:state', async (req, res) => {
  let {id, state} = req.params
  state = state === 'true' ? '激活' : '禁用'
  const result = await AdminModel.changeState(id, state)
  res.json(result)
})

router.delete('/admin/:id', async (req, res) => {
  const id = req.params.id
  const result = await AdminModel.deleteAdminById(id)
  res.json(result)
})

module.exports = router
