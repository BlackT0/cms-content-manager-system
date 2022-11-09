import {Card, Breadcrumb, Form, Input, Space, Button, Radio, message} from 'antd'
import MyUploader from '../../components/util/MyUploader/MyUploader'
import {useState} from 'react'
import Ajax from '../../components/util/Ajax'

function UserAdd(props) {

    const [pic, setPic] = useState();

    const getAvatar = (data) => {
        setPic(data)
    }

    const addUser = async (value) => {
        value.avatar = pic;
        const Params = new URLSearchParams(value);
        const {data} = await Ajax.post('/admin', Params);
        data.code === 200
            ? message.success(data.msg, 0.5, () => {
                props.history.push('/main/user-list');
            })
            : message.error(data.msg, 3);
    }

    return (
        <Card className='content-box'>
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                <Breadcrumb.Item>添加用户</Breadcrumb.Item>
            </Breadcrumb>
            <Card title='添加用户' className='card-box'>
                <Form onFinish={addUser}>

                    <Form.Item label='头像' name='avatar'>
                        <MyUploader render={getAvatar}/>
                    </Form.Item>

                    <Form.Item label='账号' name='email'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='昵称' name='nickname'>
                        <Input/>
                    </Form.Item>

                    <Form.Item label='密码' name='pwd'>
                        <Input.Password/>
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

export default UserAdd;