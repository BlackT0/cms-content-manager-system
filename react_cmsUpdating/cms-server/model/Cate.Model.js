const execSQL = require('./mysql-conn')

async function findAllCates () {
  const sql = `select * from cms_cate`
  const result = await execSQL(sql)

  result.forEach(item => {
    item.key = item.cate_id
  })

  if (result.length === 0) {
    return {code: 200, msg: '未获取到栏目信息'}
  } else {
    return {code: 200, msg: '获取栏目信息成功', data: result}
  }
}

async function findCateById (id) {
  const sql = 'select * from cms_cate where cate_id=?'
  const result = await execSQL(sql, id)

  if (result.length === 0) {
    return {code: 200, msg: '未获取到栏目信息'}
  } else {
    return {code: 200, msg: '获取栏目信息成功', data: result[0]}
  }
}

async function changeStatus (id, state) {
  const sql = 'update cms_cate set cate_state=? where cate_id=?'
  const result = await execSQL(sql, [state, id])
  
  if (result.affectedRows === 1) {
    return {code: 200, msg: '修改栏目状态成功'}
  } else {
    return {code: 201, msg: '修改栏目状态失败'}
  }
}

async function deleteCateById (id) {
  const sql = 'delete from cms_cate where cate_id=?'
  const result = await execSQL(sql, id)
  
  if (result.affectedRows == 1) {
    return {code: 200, msg: '删除栏目信息成功'}
  } else {
    return {code: 201, msg: '删除栏目信息失败'}
  }
}

async function addCate (obj) {
  let sql = 'select * from cms_cate where cate_name=?'
  let result = await execSQL(sql, obj.cate_name)
  console.log(result)
  
  if (result[0] && result[0].cate_name === obj.cate_name) {
    return {code: 202, msg: '该栏目名已被占用'}

  } else {
    obj.cate_ctime = new Date().toLocaleDateString()
    sql = 'insert into cms_cate set ?'
    const result = await execSQL(sql, obj)

    if (result.affectedRows === 1) {
      return {code: 200, msg: '添加栏目成功'}
    } else {
      return {code: 201, msg: '添加栏目失败'}
    }
  }
}

async function modifyCate (obj) {
  let sql = 'select * from cms_cate where cate_name=? and cate_id!=?'
  let result = await execSQL(sql, [obj.cate_name, obj.cate_id])

  if (result[0] && result[0].cate_name === obj.cate_name) {
    return {code: 201, msg: '该栏目名已被占用'}

  } else {
    sql = 'update cms_cate set ? where cate_id=?'
    const result = await execSQL(sql, [obj, obj.cate_id])
    
    if (result.affectedRows === 1) {
      return {code: 200, msg: '修改栏目成功'}
    } else {
      return {code: 202, msg: '修改栏目失败'}
    }
  }
}

module.exports = {
  findAllCates,
  findCateById,
  changeStatus,
  addCate,
  modifyCate,
  deleteCateById
}