import {Card, Breadcrumb, Table, Image, Switch, Space, Button, message, Popconfirm, Modal} from 'antd'
import {EditOutlined, DeleteOutlined} from '@ant-design/icons'
import {useState, useEffect} from 'react'
import Ajax from '../../components/util/Ajax'
import UserEdit from './UserEdit'

function UserList(props) {

    //保存用户列表，用于渲染到本页面
    const [userList, setUserList] = useState();
    //保存是否显示编辑对话框的布尔值
    const [isModalOpen, setIsModalOpen] = useState(false);
    //保存编辑后的id
    const [userId, setUserId] = useState();
    //Table表每列的信息
    const columns = [
        {title: 'id', dataIndex: 'admin_id', key: 'admin_id'},
        {
            title: '头像', dataIndex: 'admin_pic', key: 'admin_pic', render(pic) {
                return (
                    <Image width={50} src={'http://127.0.0.1:8888' + pic}/>
                )
            }
        },
        {title: '邮箱', dataIndex: 'admin_email', key: 'admin_email'},
        {title: '昵称', dataIndex: 'admin_nickname', key: 'admin_nickname'},
        {
            title: '状态', dataIndex: 'admin_state', key: 'admin_state', render(state, record) {
                return (<Switch checkedChildren='启用'
                                unCheckedChildren='禁用'
                                defaultChecked={state === '激活'}
                                onChange={(key) => changeState(record.admin_id, key)}
                />)
            }
        },
        {
            title: '操作', dataIndex: 'admin_id', key: 'admin_id', render(id) {
                return (
                    <Space>
                        <Button type='primary' shape='circle' danger
                                onClick={() => showEditUser(id)}><EditOutlined/></Button>
                        <Popconfirm title='确认删除吗？'
                                    onConfirm={() => confirm(id)}
                                    okText="确定"
                                    cancelText="取消"
                        >
                            <Button type='primary' shape='circle' className='btn-warning'>
                                <DeleteOutlined/>
                            </Button>
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    //第一次显示是请求数据渲染到页面
    useEffect(() => {
        Ajax.get('/admin').then(data => {
                setUserList(data.data.data);
            }
        )
    }, []);

    //显示编辑对话框的方法
    const showEditUser = async (id) => {
        setUserId(id);
        // 对话框形式修改用户数据
        // setIsModalOpen(true);
        // 加薪路由方式修改用户数据
        props.history.push('/main/user-edit?id=' + id);
    }

    // 确认删除数据后执行的回调
    const confirm = async (id) => {
        // console.log(id);
        const {data} = await Ajax.delete('/admin/' + id);
        data.code === 200
            ? message.success(data.msg, 0.5, () => {
                const index = userList.findIndex(idx => idx.admin_id === id)
                userList.splice(index, 1);
                setUserList([...userList]);
            })
            : message.error(data.msg, 3);

    };

    //取消编辑
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    // 拿到最新修改后的元素
    const getNewValue = (data) => {
        console.log(data)
        let index = userList.findIndex(idx => idx.admin_id === data.id);
        userList[index] = {
            admin_id: data.id,
            admin_email: data.email,
            admin_nickname: data.nickname,
            admin_tel: data.tel,
            admin_gender: data.gender,
            admin_age: data.age,
            admin_sign: data.sign,
            admin_avatar: data.avatar,
            admin_state: data.state,
            key: data.id
        }
        console.log(userList[index])
        setUserList([...userList]);
        setIsModalOpen(false);
    }
    //点击状态按钮改变数据库值
    const changeState = async (id, state) => {
        // console.log(id);
        // console.log(state);
        const {data} = await Ajax.put(`/admin/${id}/state/${(!!state)}`)
        data.code === 200
            ? message.success(data.msg, 0.5, () => {
                let item = userList.find(item => item.admin_id === id);
                item.admin_state = state ? '激活' : '禁用';
                setUserList([...userList])
            })
            : message.error(data.msg, 2)
    }

    return (
        <Card className='content-box'>
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>用户列表</Breadcrumb.Item>
            </Breadcrumb>
            <Card title='用户列表' className='card-box'>
                <Table dataSource={userList} columns={columns} pagination={{
                    defaultPageSize: 5,
                    pageSizeOptions: [2, 3, 5, 10],
                    showSizeChanger: true
                }}/>
            </Card>
            <Modal title="修改用户" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <UserEdit id={userId} render={getNewValue}/>
            </Modal>
        </Card>
    )
}

export default UserList;