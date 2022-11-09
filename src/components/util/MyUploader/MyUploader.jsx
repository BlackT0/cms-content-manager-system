import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import React, {useState, useEffect} from 'react';

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('上传文件的格式必须是JPG或者PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const MyUploader = (props) => {

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    useEffect(() => {
        if (props.pic !== undefined) {
            setImageUrl(`http://127.0.0.1:8888${props.pic}`);
        }
    }, [props.pic])

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            setLoading(false);
            setImageUrl('http://127.0.0.1:8888' + info.file.response);
            props.render(info.file.response);
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <Upload
            name="f"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="http://127.0.0.1:8888/cms/api/v1.0/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    );
};
export default MyUploader;