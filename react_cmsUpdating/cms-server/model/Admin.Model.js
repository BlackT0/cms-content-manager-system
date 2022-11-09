const execSQL = require('./mysql-conn')

async function findAllAdmin () {
  const sql = `select * from cms_admin`
  const result = await execSQL(sql)

  result.forEach(item => {
    item.key = item.admin_id
  })

  if (result.length === 0) {
    return {code: 200, msg: '未获取到用户信息'}
  } else {
    return {code: 200, msg: '获取用户列表成功', data: result}
  }
}

async function findAdminById (id) {
  const sql = 'select * from cms_admin where admin_id=?'
  const result = await execSQL(sql, id)

  if (result.length === 0) {
    return {code: 200, msg: '未获取到用户信息'}
  } else {
    return {code: 200, msg: '获取用户信息成功', data: result[0]}
  }
}

async function changeState (id, state) {
  const sql = 'update cms_admin set admin_state=? where admin_id=?'
  const result = await execSQL(sql, [state, id])

  if (result.affectedRows === 1) {
    return {code: 200, msg: '修改用户状态成功'}
  } else {
    return {code: 201, msg: '修改用户状态失败'}
  }
}

async function addAdmin (obj) {
  let sql = 'select * from cms_admin where admin_email=?'
  let result = await execSQL(sql, obj.admin_email)

  if (result[0] && result[0].admin_email === obj.admin_email) {
    return {code: 201, msg: '该用户名已被占用'}

  } else {
    obj.admin_ctime = parseInt(Date.now() / 1000)
    sql = 'insert into cms_admin set ?'
    const result = await execSQL(sql, obj)

    if (result.affectedRows === 1) {
      return {code: 200, msg: '添加新用户成功'}
    } else {
      return {code: 202, msg: '添加新用户失败'}
    }
  }
}

async function deleteAdminById (id) {
  const sql = 'delete from cms_admin where admin_id=?'
  const result = await execSQL(sql, id)

  if (result.affectedRows === 1) {
    return {code: 200, msg: '删除用户成功'}
  } else {
    return {code: 200, msg: '删除用户失败'}
  }
}

async function modifyAdmin (obj) {
  let sql = 'select * from cms_admin where admin_email=? and admin_id!=?'
  let result = await execSQL(sql, [obj.admin_email, obj.amdin_id])

  if (result[0] && result[0].admin_email === obj.admin_email) {
    return {code: 201, msg: '该邮箱名已被占用'}

  } else {
    sql = 'update cms_admin set ? where admin_id=?'
    const result = await execSQL(sql, [obj, obj.admin_id])
    
    if (result.affectedRows === 1) {
      return {code: 200, msg: '修改用户成功'}
    } else {
      return {code: 202, msg: '修改用户失败'}
    }
  }
}

module.exports = {
  findAllAdmin,
  findAdminById,
  changeState,
  addAdmin,
  deleteAdminById,
  modifyAdmin
}