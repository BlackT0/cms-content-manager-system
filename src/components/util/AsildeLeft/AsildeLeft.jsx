import {
    PieChartOutlined,
    TeamOutlined,
    AppstoreOutlined,
    FileOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {Menu} from 'antd';
import React, {useState, useEffect} from 'react';


const items = [
    {label: '数据统计', key: '', icon: <PieChartOutlined/>},
    {
        label: '用户管理', key: 'admin', icon: <TeamOutlined/>, children: [
            {label: '用户列表', key: 'user-list'},
            {label: '添加用户', key: 'user-add'},
        ]
    },
    {
        label: '栏目管理', key: 'Cate', icon: <AppstoreOutlined/>, children: [
            {label: '栏目列表', key: 'cate-list'},
            {label: '添加栏目', key: 'cate-add'},
        ]
    },
    {
        label: '文章管理', key: 'art', icon: <FileOutlined/>, children: [
            {label: '文章列表', key: 'art-list'},
            {label: '发表文章', key: 'art-pub'},
        ]
    },
    {label: '系统设置', key: 'sys', icon: <SettingOutlined/>},
]

const AslideLeft = (props) => {
    const [openKey, setOpenKey] = useState();
    const [selectedKey, setSelectedKey] = useState();

    useEffect(() => {
        let tmp = window.location.pathname.split('/')[2];
        if (tmp !== undefined) {
            setSelectedKey(tmp);
            // setOpenKey(tmp.split('-')[1]);
        }
    }, [window.location.pathname])

    const changeUrl = (e) => {
        props.history.push('/main/' + e.key);
    }
    const openChange = (e) => {
        setOpenKey(e[1]);
    }

    return (
        <Menu
            selectedKeys={[selectedKey]}
            openKeys={[openKey]}
            theme='dark'
            mode="inline"
            items={items}
            onClick={changeUrl}
            onOpenChange={openChange}
        />
    );
};
export default AslideLeft;