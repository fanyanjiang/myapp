import React, { Component } from 'react'
import axios from 'axios'
import Cookie from 'js-cookie'
export default class Login extends Component {
    state={
        phone:"",
        password:"",
        checkcode:"",
        isCode:"FAN6"
    }
    render() {
        return (
            <div className='login'>
                <div className="contain">
                    <div className="left">
                        <p>Welcome</p>
                        <span>赚赚金融 开创信贷“1＋N”模式的综合互联网金融服务共享平台</span>
                    </div>
                    <div className="right">
                        <p>赚赚金融渠道管理系统</p>
                        <p>
                            <input type="text" placeholder='手机号' onChange={(e)=>{
                                this.setState({
                                    phone:e.target.value
                                })
                            }}/>
                        </p>
                        <p>
                            <input type="password" placeholder='登录密码' onChange={(e)=>{
                                this.setState({
                                    password:e.target.value
                                })
                            }}/>
                        </p>
                        <p>
                            <input type="text" placeholder='验证码' onChange={(e)=>{
                                this.setState({
                                    checkcode:e.target.value
                                })
                            }}/>
                            <span onClick={()=>{
                                axios.get('http://localhost:3000/api/checkCode').then((res)=>{
                                    // console.log(res.data.Verification);
                                    this.setState({
                                        isCode:res.data.Verification
                                    })
                                })
                            }}>{this.state.isCode}</span>
                        </p>
                        <p><button onClick={()=>{
                            axios.defaults.headers.common["authorization"] =Cookie.get("userName") 
                            axios.post('http://localhost:3000/api/login',{phone:this.state.phone,password:this.state.password,checkcode:this.state.checkcode}).then((data)=>{
                                if(data.data.code){
                                    return
                                }else{
                                    Cookie.set('userName',data.data.sessionId)
                                    this.props.history.push('/home')
                                }                     
                            })
                        }} >登录</button></p>
                    </div>
                </div>
            </div>
        )
    }
}
