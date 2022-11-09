import {Button, Form, Input, Radio, Select, Steps, Tabs, Card} from 'antd'
import MyUploader from "../../components/util/MyUploader/MyUploader";
import ReactQuill from "react-quill";
import {useEffect, useState} from "react";
import Ajax from "../../components/util/Ajax";


function ArtEdit() {
    const {Option} = Select;
    const {Step} = Steps;
    const [pic, setPic] = useState();
    const [key, setKey] = useState();
    const [cateList, setCateList] = useState([]);
    useEffect(() => {
        Ajax.get('/cate').then(data => {
            setCateList(data.data.data);
        })
    }, [])
    const getPicValue = (value) => {
        setPic(value);
    }
    const changeTab = (value) => {
        setKey(value);
    }
    const getFormValue = (values) => {
        console.log(values)
    }
    return (
        <Card title='修改文章' className='card-box'>
            <Steps current={key} style={{marginTop: 30}}>
                <Step title='基本信息'/>
                <Step title='其他信息'/>
                <Step title='文章内容'/>
            </Steps>
            <Form
                initialValues={{
                    cateid: 1
                }}
                onFinish={getFormValue}
            >
                <Tabs
                    style={{marginTop: 30}}
                    tabPosition='left'
                    onTabClick={changeTab}
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
    )
}

export default ArtEdit;