import {Button, Form, Input, Radio, Space, message} from 'antd';
import React, {useEffect, useRef} from 'react';
import Ajax from '../../components/util/Ajax'

const CateEdit = (props) => {
    const formRef = useRef(null)

    useEffect(() => {

        Ajax.get('/cate/' + props.id).then(data => {
                data = data.data.data;
                formRef.current.setFieldsValue({
                    name: data.cate_name,
                    icon: data.cate_icon,
                    state: data.cate_state
                })
            }
        )
    })

    const modifyCate = async (values) => {
        const params = new URLSearchParams(values);
        const {data} = await Ajax.put('/cate/' + props.id, params);
        data.code === 200
            ? message.success(data.msg, 0.5, () => {
                values.id = props.id;
                props.render(values);
            })
            : message.error(data.msg, 3)
    }

    return (
        <Form ref={formRef} onFinish={modifyCate}>
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
    );
};
export default CateEdit;