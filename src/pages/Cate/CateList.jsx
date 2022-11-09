import {
    Card,
    Modal,
    Breadcrumb,
    Table,
    Switch,
    message,
    Space,
    Button,
    Popconfirm
} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import React, {useState, useEffect} from "react";
import Ajax from '../../components/util/Ajax';
import CateEdit from './CateEdit';


function CateList() {

    // cateList是一个对象数组
    const [cateList, setCateList] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cateId, setCateId] = useState(-1);

    useEffect(() => {
        Ajax.get('/cate').then(data => {
            setCateList(data.data.data);
        })
    }, []);

    const changeState = async (id, state) => {
        console.log(id, state)
        const {data} = await Ajax.put(`/cate/${id}/state/${state ? 1 : 0}`);
        // 使用三元运算符来判断状态显示相应的信息
        data.code === 200
            ? message.success(data.msg, 0.5,
                // 在message中第三个参数（回调函数）中将数据库中修改后的id在改回页面中的cateList中
                () => {
                    let item = cateList.find(item => item.cate_id === id);
                    item.cate_state = state ? 1 : 0;
                    setCateList([...cateList])
                })
            : message.error(data.msg);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const cateEditUpdate = (values) => {
        console.log(values)
        let index = cateList.findIndex(idx => idx.cate_id === values.id);
        cateList[index] = {
            cate_id: values.id,
            cate_name: values.name,
            cate_icon: values.icon,
            cate_state: values.state,
            key: values.id
        }
        setCateList([...cateList])
        setIsModalOpen(false);
    }

    const showCateEditShow = (id) => {
        setIsModalOpen(true);
        setCateId(id);
    }

    const delItem = async (id) => {
        const {data} = await Ajax.delete('/cate/' + id);
        data.code === 200
            ? message.success(data.msg, 0.5,
                () => {
                    let index = cateList.findIndex(item => item.cate_id === id);
                    cateList.splice(index, 1);
                    setCateList([...cateList])
                })
            : message.success(data.msg, 0.5)
    }

    const columns = [
        {title: 'id', dataIndex: 'cate_id', key: 'cate_id'},
        {title: '栏目名称', dataIndex: 'cate_name', key: 'cate_name'},
        {title: '栏目图标', dataIndex: 'cate_icon', key: 'cate_icon'},
        {
            title: '栏目状态', dataIndex: 'cate_state', key: 'cate_state', render(state, record) {
                return (
                    <Switch checkedChildren='启用'
                            unCheckedChildren='禁用'
                            defaultChecked={state === 1}
                            onChange={(key) => changeState(record.cate_id, key)}
                    />
                )
            }
        },
        {
            title: '操作', dataIndex: 'cate_id', key: 'cate_id', render(id) {
                return (

                    <Space size={15}>
                        <Button type='primary' shape='circle' danger
                                onClick={() => showCateEditShow(id)}><EditOutlined/></Button>
                        <Popconfirm title="确认删除？" okText="确认" cancelText="取消" onConfirm={() => delItem(id)}>
                            <Button type='primary' shape='circle' className='btn-warning'><DeleteOutlined/></Button>
                        </Popconfirm>
                    </Space>

                )
            }
        }
    ];

    return (
        <Card className='content-box'>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <a href="#">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="#">栏目管理</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="#">栏目列表</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className='card-box' title='栏目列表'>
                <Table dataSource={cateList}
                       columns={columns}
                       pagination={{
                           defaultPageSize: 5,
                           pageSizeOptions: [2, 3, 5, 10],
                           showSizeChanger: true
                       }}
                />
            </Card>
            <Modal title="添加栏目" open={isModalOpen} onCancel={handleCancel} footer={null}>
                <CateEdit id={cateId} render={cateEditUpdate}/>
            </Modal>
        </Card>
    )
}

export default CateList;