const execSQL = require('./mysql-conn')

async function findAllArts () {
  const sql = `
    select cms_article.*,cms_admin.admin_nickname,cms_cate.cate_name from cms_article
    left join cms_admin on article_adminid=admin_id
    left join cms_cate on article_cateid=cate_id
  `
  const result = await execSQL(sql)

  result.forEach(item => {
    item.key = item.article_id
  })

  if (result.length === 0) {
    return {code: 200, msg: '未获取到文章信息'}
  } else {
    return {code: 200, msg: '获取文章列表成功', data: result}
  }
}

async function findArtById (id) {
  const sql = `select * from cms_article where article_id=?`
  const result = await execSQL(sql, id)

  if (result.length === 0) {
    return {code: 200, msg: '未获取到文章信息'}
  } else {
    return {code: 200, msg: '获取文章信息成功', data: result[0]}
  }
}

async function changeStatus (id, state) {
  const sql = 'update cms_article set article_state=? where article_id=?'
  const result = await execSQL(sql, [state, id])

  if (result.affectedRows === 1) {
    return {code: 200, msg: '修改文章状态成功'}
  } else {
    return {code: 201, msg: '修改文章状态失败'}
  }
}

async function deleteArtById (id) {
  const sql = 'delete from cms_article where article_id=?'
  const result = await execSQL(sql, id)

  if (result.affectedRows === 1) {
    return {code: 200, msg: '删除文章成功'}
  } else {
    return {code: 201, msg: '删除文章失败'}
  }
}

async function addArt (obj) {
  const sql = 'insert into cms_article set ?'
  const result =  await execSQL(sql, obj)

  if (result.affectedRows === 1) {
    return {code: 200, msg: '发表文章成功'}
  } else {
    return {code: 201, msg: '发表文章失败'}
  }
}

async function modifyArt (obj) {
  const sql = 'update cms_article set ? where article_id=?'
  const result = await execSQL(sql, [obj, obj.article_id])

  if (result.affectedRows === 1) {
    return {code: 200, msg: '修改文章成功'}
  } else {
    return {code: 201, msg: '修改文章失败'}
  }
}

module.exports = {
  findAllArts,
  findArtById,
  changeStatus,
  addArt,
  modifyArt,
  deleteArtById
}

// async function test () {
//   const r = await changeStatus(1, '待审核')
//   console.log(r)
// }

// test()