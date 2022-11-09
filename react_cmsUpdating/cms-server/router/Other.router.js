const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const path = require('path')

// 实现文件上传的路由
let options = {
	// 保留上传文件的后缀名
	keepExtensions: true,
	// 指定上传文件的的存放位置
	uploadDir: path.join(__dirname, '../static', 'uploads'),
	// 是否允许上传空文件
	allowEmptyFiles: false,
}
// 文件上传
router.post('/upload', (req, res) => {
	// 创建formidable表单解析对象
	const form = new formidable.IncomingForm(options);
	// 解析客户端传递过来的FormData对象
	form.parse(req, (err, fields, files) => {
		console.log(files)
		// 将客户端传递过来的文件地址响应到客户端
		res.send(files.f.filepath.split('static')[1]);
	});
})

const data = {
	'week': {
		title: {
          text: '周访问量'
        },
        tooltip: {},
        legend: {
          data: ['访问量']
        },
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六']
        },
        yAxis: {},
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: [890, 2198, 2079, 1988, 2111, 2305, 2020]
          }
        ]
	},
	'month': {
		title: {
          text: '月访问量'
        },
        tooltip: {},
        legend: {
          data: ['访问量']
        },
        xAxis: {
          data: ['上旬', '中旬', '下旬']
        },
        yAxis: {},
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: [15890, 20198, 21079]
          }
        ]
	},
	'year': {
		title: {
          text: '年访问量'
        },
        tooltip: {},
        legend: {
          data: ['访问量']
        },
        xAxis: {
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        },
        yAxis: {},
        series: [
          {
            name: '访问量',
            type: 'bar',
            data: [48910, 50123, 49378, 44890, 48493, 45345, 51034, 52310, 50987,51768, 52981, 53098]
          }
        ]
	}
}

// 数据统计
router.get('/data/:type', (req, res) => {
	const type = req.params.type
	res.send(data[type])
})

module.exports = router