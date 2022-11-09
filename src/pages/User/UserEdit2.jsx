import {Card, Breadcrumb, Form, Input, Space, Button, Radio, message} from 'antd'
import MyUploader from '../../components/util/MyUploader/MyUploader'
import {useState, useEffect, useRef} from 'react'
import qs from 'qs';

import Ajax from '../../components/util/Ajax'

function UserEdit(props) {

    const [pic, setPic] = useState();
    const [adminId, setAdminId] = useState();
    const formRef = useRef();

    useEffect(() => {
        let str = window.location.search.slice(1);
        let obj = qs.parse(str);
        setAdminId(obj.id);
        Ajax.get('/admin/' + obj.id).then(data => {
                data = data.data.data;
                formRef.current.setFieldsValue({
                    email: data.admin_email,
                    nickname: data.admin_nickname,
                    tel: data.admin_tel,
                    gender: data.admin_gender,
                    age: data.admin_age,
                    sign: data.admin_sign,
                    state: data.admin_state
                })
                setPic(data.admin_pic);
            }
        )
    }, [])

    const changeUser = async (values) => {
        values.id = adminId;
        values.avatar = pic;
        const params = new URLSearchParams(values);
        const {data} = await Ajax.put('/admin/' + adminId, params);
        data.code === 200
            ? message.success(data.msg, 0.5, () => {
                props.history.push('/main/user-list');
            })
            : message.error(data.msg, 2)
    }

    const getAvatar = (data) => {
        setPic(data)
    }

    return (
        <Card className='content-box'>
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>修改用户</Breadcrumb.Item>
            </Breadcrumb>
            <Card title='修改用户' className='card-box'>
                <Form ref={formRef} onFinish={changeUser}>
                    <Form.Item label='头像' name='avatar'>
                        <MyUploader pic={pic} render={getAvatar}/>
                    </Form.Item>

                    <Form.Item label='账号' name='email'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='昵称' name='nickname'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='电话' name='tel'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='年龄' name='age'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='性别' name='gender'>
                        <Radio.Group>
                            <Radio value='男'>男</Radio>
                            <Radio value='女'>女</Radio>
                            <Radio value='人妖'>人妖</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label='状态' name='state'>
                        <Radio.Group>
                            <Radio value='激活'>激活</Radio>
                            <Radio value='禁用'>禁用</Radio>
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item label='个人签名' name='sign'>
                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button htmlType='reset'>重置</Button>
                            <Button type='primary' htmlType='submit'>提交</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Card>
    )
}

export default UserEdit;