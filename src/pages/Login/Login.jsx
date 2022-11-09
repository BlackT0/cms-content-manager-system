import './Login.scss';
import {Button, Checkbox, Form, Input, Space, message} from "antd";
import React from "react";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import Ajax from '../../components/util/Ajax';

function Login(props) {

    const onFinish = async (values) => {
        // 将表单收集到的对象改造为 key=value&key=value&... 结构
        const params = new URLSearchParams(values);
        // 发送Ajax请求
        const {data} = await Ajax.post('/login', params);
        // 区分结果，成功则跳转到首页；失败显示错误信息
        if (data.code === 200) {
            window.sessionStorage.setItem('token', data.token)
            message.success(data.msg, 0.5, () => {
                props.history.push('/main');
            });
        } else {
            message.error('账号或密码错误');
        }
    }

    return (
        <div className='page-box'>
            <div className='login-box'>
                <h2>登录</h2>
                <Form id='my-form' name="basic" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[
                            {required: true, message: 'Please input your username!'},
                            {max: 12, message: '账号长度不能超过12位'},
                            {min: 3, message: '账号长度不能少于3位'}
                        ]}
                    >
                        <Input size='large' prefix={<UserOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'Please input your password!'},
                            // 参数2
                            {
                                validator(_, value) {
                                    const reg = /^\w{3,12}$/;
                                    if (reg.test(value)) {
                                        // 通过验证
                                        return Promise.resolve();
                                    } else {
                                        // 未通过验证
                                        return Promise.reject('密码必须是3-12位字母数字下划线');
                                    }
                                }
                            },
                        ]}
                    >
                        <Input.Password size='large' prefix={<LockOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item className='btns'>
                        <Space>
                            <Button ype="primary" htmlType="reset">重置</Button>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login