const express = require('express')
const app = express()
app.listen(8888, () => {
  console.log('CMS-Server is running...')
})

const cors = require('cors')
app.use(cors())

app.use(express.static('./static'))

const bp = require('body-parser')
app.use(bp.urlencoded({extended: false}))

const loginRouter = require('./router/Login.router')
app.use('/cms/api/v1.0', loginRouter)

const artRouter = require('./router/Art.router')
app.use('/cms/api/v1.0', artRouter)

const cateRouter = require('./router/Cate.router')
app.use('/cms/api/v1.0', cateRouter)

const adminRouter = require('./router/Admin.router')
app.use('/cms/api/v1.0', adminRouter)

const otherRouter = require('./router/Other.router')
app.use('/cms/api/v1.0', otherRouter)
