const express = require('express')
const router = express.Router()
const ArtModel = require('../model/Art.Model')
const moment = require('moment');

function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 获取文章列表
router.get('/art', async (req, res) => {
  const arts = await ArtModel.findAllArts()
  res.json(arts)
})

// 根据article_id获取文章
router.get('/art/:id', async (req, res) => {
  const id = req.params.id
  const art = await ArtModel.findArtById(id)
  res.json(art)
})

// 添加新文章
router.post('/art', async (req, res) => {
  const obj = {
    article_title: req.body.title,
    article_cateid: req.body.cateid,
    article_adminid: 1,
    article_state: req.body.state,
    article_pic: req.body.pic,
    article_text: req.body.content,
    article_click: req.body.click || getRandomNum(1000, 5000),
    article_good: req.body.good || getRandomNum(500, 900),
    article_bad: req.body.bad || getRandomNum(0, 800),
    article_ctime: moment().format('YYYY-MM-DD HH:mm:ss')
  }
  
  console.log(obj)
  const result = await ArtModel.addArt(obj)

  res.json(result)
})

// 根据article_id删除文章
router.delete('/art/:id', async (req, res) => {
  const id = req.params.id
  const result = await ArtModel.deleteArtById(id)
  res.json(result)
})

// 修改文章内容
router.put('/art/:id', async (req, res) => {
  const id = req.params.id
  const obj = req.body
  obj.article_id = id

  const result = await ArtModel.modifyArt(obj)
  res.json(result)
})

module.exports = router