import {Card, Breadcrumb, Form, Input, Space, Button, Radio, message} from 'antd'
import React from "react";

import Ajax from "../../components/util/Ajax";

function CateAdd(props) {

    const formRef = React.createRef();

    const onFinish = async (values) => {
        const params = new URLSearchParams(values);
        const {data} = await Ajax.post('/cate', params);
        // eslint-disable-next-line default-case
        switch (data.code) {
            case 200:
                message.success(data.msg, 0.5, () => {
                    // formRef.current.resetFields();
                    props.history.push('/main/cate-list');
                });
                break;
            case 201:
                message.success(data.msg, 0.5);
                break;
            case 202:
                message.success(data.msg, 0.5);
                break;
            case 203:
                message.success(data.msg, 0.5);
                break;
        }

    }

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
                    <a href="#">添加栏目</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Card className='card-box' title='添加栏目'>
                <Form id='my-form' ref={formRef} name="basic" onFinish={onFinish}>
                    <Form.Item label='栏目名称' name="name"
                               rules={[
                                   {required: true, message: '栏目图标为空'},
                                   {max: 12, message: '账号长度不能超过10位'},
                                   {min: 3, message: '账号长度不能少于3位'}
                               ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label='栏目图标' name="icon"
                               rules={[
                                   {required: true, message: '栏目图标为空'}
                               ]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item label='栏目状态' name="state"
                               rules={[
                                   {required: true, message: '栏目状态为空'}
                               ]}
                    >
                        <Radio.Group>
                            <Radio value={1}>启用</Radio>
                            <Radio value={0}>禁用</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Space size={20}>
                            <Button htmlType="reset">重置</Button>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </Card>
    )
}

export default CateAdd;