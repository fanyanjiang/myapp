import React, { Component } from 'react'
import RouterView from '../router/RouterView'
import Cookie from 'js-cookie'

import { Layout, Menu, Icon } from 'antd';
import axios from 'axios'
const { Header, Sider } = Layout;
const { SubMenu } = Menu;
// const {  Sider } = Layout;
// const { SubMenu } = Menu;
export default class Home extends Component {
    state = {
        collapsed: false,
        userInfo:{}
    };
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    componentDidMount(){
        axios.defaults.headers.common["authorization"] =Cookie.get("userName") 
        axios.get('http://localhost:3000/api/islogin').then((res)=>{
            this.setState({
                userInfo:res.data.info
            })
        })
    }
    render() {
        let {userInfo} = this.state
        // console.log(userInfo)
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <div className='logo'>
                            <img src={'http://localhost:3000'+userInfo.facePhoto} alt="" />
                            <span>{userInfo.phone}</span>
                        </div>
                        <Menu.Item key="1" onClick={() => {
                            this.props.history.push('/home/first')
                        }}>
                            <Icon type="pie-chart" />
                            <span>首页</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={() => {
                            this.props.history.push('/home/set')
                        }}>
                            <Icon type="desktop" />
                            <span>设置</span>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    <span>订单管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="3" onClick={() => {
                                this.props.history.push('/home/goods')
                            }}>贷款订单</Menu.Item>
                            <Menu.Item key="4" onClick={() => {
                                this.props.history.push('/home/transition')
                            }}>转单订单</Menu.Item>
                            <Menu.Item key="5" onClick={() => {
                                this.props.history.push('/home/insurance')
                            }}>保险订单</Menu.Item>
                        </SubMenu>
                        <li className='set-btns'>
                            <span onClick={()=>{
                                this.props.history.push('/login')
                            }}>退出</span>
                            <span onClick={()=>{
                                this.props.history.push('/home/changeimg')
                            }}>设置</span>
                        </li>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <div className='main'>
                        <RouterView routes={this.props.children}></RouterView>
                    </div>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            </Layout>
        );
    }
}
