const mysql = require('mysql')

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '000',
  database: 'cms',
  connectionLimit: 10,
  multipleStatements: false
})

function execSQL (sql, condition = null) {
  return new Promise(function (resolve, reject) {
    pool.query(sql, condition, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports = execSQL
