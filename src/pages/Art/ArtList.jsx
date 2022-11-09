import {Card, Breadcrumb, Table, Space, Button, Popconfirm, Switch, message} from 'antd'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useState, useEffect} from 'react'
import Ajax from '../../components/util/Ajax'


function ArtList(props) {

    const [artList, setArtList] = useState();

    useEffect(() => {
        Ajax.get('/art').then(data => {
            setArtList(data.data.data)
        })
    }, [])

    const columns = [
        {title: 'id', dataIndex: 'article_id', key: 'article_id'},
        {title: '文章标题', dataIndex: 'article_title', key: 'article_title'},
        {title: '文章作者', dataIndex: 'admin_nickname', key: 'admin_nickname'},
        {title: '所属栏目', dataIndex: 'cate_name', key: 'cate_name'},
        {
            title: '发布状态', dataIndex: 'article_state', key: 'article_state', render(state, record) {
                return (
                    <Switch checkedChildren="已发布" unCheckedChildren="待审核"
                            defaultChecked={record.article_state === '已发布'}
                    />
                )
            }
        },
        {
            title: '操作', dataIndex: 'article_id', key: 'article_id', render(id) {
                return (
                    <Space>
                        <Button type='primary' shape='circle' danger
                                onClick={() => editArt(id)}><EditOutlined/></Button>
                        <Popconfirm title='确认删除吗？'
                                    onConfirm={() => confirm(id)}
                                    okText="确定"
                                    cancelText="取消"
                        >
                            <Button type='primary' shape='circle'
                                    className='btn-warning'
                            >
                                <DeleteOutlined/>
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }

    ]

    const confirm = async (id) => {
        const {data} = await Ajax.delete('/art/' + id);
        data.code === 200
            ? message.success(data.code, 0.5, () => {
                let index = artList.findIndex(item => item.article_id === id);
                artList.splice(index, 1);
                setArtList([...artList])
            })
            : message.error(data.code, 2)
    }

    const editArt = (id) => {
        props.history.push('/main/art-edit?id=' + id);
    }

    return (
        <Card className='content-box'>
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
            <Card title='文章列表' className='card-box'>
                <Table dataSource={artList} columns={columns}>
                </Table>
            </Card>
        </Card>
    )
}

export default ArtList;