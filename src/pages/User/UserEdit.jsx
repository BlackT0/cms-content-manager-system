import {Card, Form, Input, Radio, Button, Space, message} from 'antd';
import MyUploader from '../../components/util/MyUploader/MyUploader'
import {useState, useEffect, useRef} from "react";
import Ajax from '../../components/util/Ajax'

const UserEdit = (props) => {

    const [pic, setPic] = useState();

    const formRef = useRef();

    useEffect(() => {

        Ajax.get('/admin/' + props.id).then(data => {
            data = data.data.data
            // console.log(data);
            formRef.current.setFieldsValue({
                id: props.id,
                email: data.admin_email,
                nickname: data.admin_nickname,
                tel: data.admin_tel,
                gender: data.admin_gender,
                age: data.admin_age,
                sign: data.admin_sign,
                avatar: data.admin_pic,
                state: data.admin_state
            })
        })

    });

    const getAvatar = (data) => {
        setPic(data)
    }

    const modifyUser = async (values) => {
        values.id = props.id;
        values.avatar = pic;
        const params = new URLSearchParams(values);
        const {data} = await Ajax.put('/admin/' + props.id, params);
        data.code === 200 ?
            message.success(data.msg, 0.5, () => {
                props.render(values);
            })
            : message.error(data.msg, 2);
    }

    return (
        <Card>
            <Form onFinish={modifyUser} ref={formRef}>
                <Form.Item label='头像' name='avatar'>
                    <MyUploader render={getAvatar}/>
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
    );
};
export default UserEdit;