import './Main.scss';
import {Layout, Avatar} from 'antd';
import React, {useEffect, useState} from 'react';
import AsliderLeft from '../../components/util/AsildeLeft/AsildeLeft';
import {Route} from 'react-router-dom';
import Hzw from '../../assets/images/hzw.jpeg';
import Ajax from '../../components/util/Ajax'

import Home from '../Home/Home';
import UserList from '../User/UserList';
import UserEdit from '../User/UserEdit2';
import UserAdd from '../User/UserAdd';
import CateList from '../Cate/CateList';
import CateAdd from '../Cate/CateAdd';
import ArtList from '../Art/ArtList';
import ArtEdit from '../Art/ArtEdit';
import ArtPub from '../Art/ArtPub';
import SetSys from '../Home/SetSys';
import Auth from '../../components/util/Auth/Auth'


const {Header, Sider, Content} = Layout;

function Main(props) {

    const [username, setUserName] = useState();
    const [avatar, setAvatar] = useState();

    useEffect(() => {
        Ajax.get('/userInfo').then(data => {
            data = data.data;
            setUserName(data.username);
            setAvatar(data.avatar);
        })
    }, [])

    return (
        <Auth>
            <Layout className='my-main'>
                <Header className='my-header'>
                    <h2>CMS后台管理系统</h2>
                    <div className='header-a'>
                        <a href="#">个人中心</a>
                        <a href="/">退出</a>
                    </div>

                </Header>
                <Layout>
                    <Sider style={{height: '100%'}}>
                        <div className='avatar-box'>
                            <Avatar size={88} src={'http://127.0.0.1:8888' + avatar}/>
                            <h3>{username}</h3>
                        </div>

                        <AsliderLeft {...props}/>
                    </Sider>
                    <Content>
                        <Route exact path='/main' component={Home}/>
                        {/*<Route path='/main/home' component={Home}/>*/}
                        <Route path='/main/user-list' component={UserList}/>
                        <Route path='/main/user-edit' component={UserEdit}/>
                        <Route path='/main/user-add' component={UserAdd}/>
                        <Route path='/main/cate-list' component={CateList}/>
                        <Route path='/main/cate-add' component={CateAdd}/>
                        <Route path='/main/art-list' component={ArtList}/>
                        <Route path='/main/art-edit' component={ArtEdit}/>
                        <Route path='/main/art-pub' component={ArtPub}/>
                        <Route path='/main/sys' component={SetSys}/>
                    </Content>
                </Layout>
            </Layout>
        </Auth>

    )
}

export default Main