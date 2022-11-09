import {Card, Breadcrumb, Steps, Tabs, Form, Input, Select, Radio, Button, message} from 'antd'
import {useState, useEffect} from 'react'
import Ajax from '../../components/util/Ajax'
import MyUploader from '../../components/util/MyUploader/MyUploader'

import 'react-quill/dist/quill.snow.css'
import ReactQuill from 'react-quill'


function ArtPub(props) {

    const {Step} = Steps;
    const {Option} = Select;
    const [key, setKey] = useState();
    const [pic, setPic] = useState();
    const [cateList, setCateList] = useState([]);

    useEffect(() => {
        Ajax.get('/cate').then(data => {
            setCateList(data.data.data);
        })
    }, [])

    const changeTab = (value) => {
        setKey(value);
    }

    const getFormValue = async (values) => {
        values.pic = pic;
        const params = new URLSearchParams(values);
        const {data} = await Ajax.post('/art', params);
        data.code === 200
            ? message.success(data.msg, 0.5, () => {
                props.history.push('/main/art-list');
            })
            : message.error(data.msg, 2)
    }
    const getPicValue = (value) => {
        setPic(value);
    }

    return (
        <Card className='content-box'>
            <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>文章管理</Breadcrumb.Item>
                <Breadcrumb.Item>文章发表</Breadcrumb.Item>
            </Breadcrumb>
            <Card title='文章发表' className='card-box'>
                <Steps current={key} style={{marginTop: 30}}>
                    <Step title='基本信息'/>
                    <Step title='其他信息'/>
                    <Step title='文章内容'/>
                </Steps>
                <Form
                    onFinish={getFormValue}
                    initialValues={{
                        cateid: 1
                    }}
                >
                    <Tabs
                        style={{marginTop: 30}}
                        onTabClick={changeTab}
                        tabPosition='left'
                        items={[
                            {
                                label: `基本信息`, key: 0,
                                children:
                                    <>
                                        <Form.Item label='文章标题' name='title'>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label='所属栏目' name='cateid'>
                                            <Select>
                                                {
                                                    cateList.map((item) => {
                                                        return (
                                                            <Option value={item.cate_id}
                                                                    key={item.cate_id}>{item.cate_name}</Option>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item label='发布状态' name='state'>
                                            <Radio.Group>
                                                <Radio value='已发布'>已发布</Radio>
                                                <Radio value='待审核'>待审核</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </>
                            },
                            {
                                label: `其他信息`, key: 1,
                                children:
                                    <>
                                        <Form.Item label='文章封面' name='title'>
                                            <MyUploader render={getPicValue}/>
                                        </Form.Item>
                                        <Form.Item label='点击量' name='click'>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label='点赞量' name='good'>
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item label='点踩量' name='bad'>
                                            <Input/>
                                        </Form.Item>

                                    </>
                            },
                            {
                                label: `文章内容`, key: 2,
                                children:
                                    <>
                                        <Form.Item label='文章内容' name='content'>
                                            <ReactQuill style={{height: '300px'}}/>
                                        </Form.Item>
                                        <Form.Item>
                                            <Button type='primary' htmlType='submit'>提交</Button>
                                        </Form.Item>
                                    </>
                            },
                        ]}
                    />
                </Form>

            </Card>
        </Card>
    )
}

export default ArtPub;