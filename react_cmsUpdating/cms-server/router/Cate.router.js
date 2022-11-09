const express = require('express')
const router = express.Router()
const CateModel = require('../model/Cate.Model')

router.get('/cate', async (req, res) => {
  const cates = await CateModel.findAllCates()
  res.json(cates)
})

router.get('/cate/:id', async (req, res) => {
  const result = await CateModel.findCateById(req.params.id)
  res.json(result)
})

router.put('/cate/:id/state/:state', async (req, res) => {
  let {id, state} = req.params
  const result = await CateModel.changeStatus(id, state)
  res.json(result)
})

router.post('/cate', async (req, res) => {
  if (req.body.name == undefined || req.body.name == '' || req.body.name == 'undefined') {
    res.json({code: 203, msg: '栏目名称不能为空'})
  } else {
    const obj = {
      cate_name: req.body.name,
      cate_icon: req.body.icon,
      cate_state: req.body.state
    }
    const result = await CateModel.addCate(obj)
    res.json(result)
  }
})

router.put('/cate/:id', async (req, res) => {
  const obj = {
    cate_id: req.params.id,
    cate_name: req.body.name,
    cate_icon: req.body.icon,
    cate_state: req.body.state
  }

  const result = await CateModel.modifyCate(obj)
  res.json(result)
})

router.delete('/cate/:id', async (req, res) => {
  const id = req.params.id
  const result = await CateModel.deleteCateById(id)
  res.json(result)
})

module.exports = router