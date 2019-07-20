/**
 * 保险订单
 */

import React, { Component } from 'react'

import { DatePicker } from 'antd';  //处理时间
import { InputNumber } from 'antd';  //全额范围
import { Radio } from 'antd';
import { Select } from 'antd';
import { Button } from 'antd';
import axios from 'axios'
import Cookie from 'js-cookie'
import RightTable from '../../components/RightTable'

const { RangePicker } = DatePicker;
const { Option } = Select;

//全额范围
function onChangeNum(value) {
    console.log('changed', value);
}
//处理时间
function onChangeTime(date, dateString) {
    console.log(date, dateString);
}
 

export default class Insurance extends Component {
    state = {
        InsuranceData:[],
        type:"",
        name:""
    }
    
    componentDidMount(){
        axios.defaults.headers.common["authorization"] =Cookie.get("userName") 
        axios.get('http://localhost:3000/api/list?order=3').then((res)=>{
            this.setState({
                InsuranceData:res.data.data
            })
        })
    }
    onChangeType(e){
        let type = this.state.type = e
        this.setState({
            type
        })
    }
    onChangePerson(e){
        let name = this.state.name = e
        this.setState({
            name
        })
    }
    render() {
        return (
            <div className='right-box'>
                <div className='right-check'>
                    <span>处理时间：</span><RangePicker onChange={onChangeTime} />
                    <span>全部范围：</span><InputNumber min={1} max={999999999} defaultValue={1000} onChange={onChangeNum}/>-<InputNumber min={1} max={999999999} defaultValue={200000} onChange={onChangeNum}/>
                </div>
                <div className='right-check'>
                    <span>处理状态：</span><div>
                        <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">全部</Radio.Button>
                            <Radio.Button value="b">新订单</Radio.Button>
                            <Radio.Button value="c">未审核</Radio.Button>
                            <Radio.Button value="d">已接单</Radio.Button>
                            <Radio.Button value="e">已完成</Radio.Button>
                            <Radio.Button value="f">暂无状态</Radio.Button>
                        </Radio.Group>
                    </div>

                    <span>转单类型：</span>
                    <Select
                        showSearch
                        style={{ width: 150 }}
                        placeholder="请选择类型"
                        optionFilterProp="children"
                        onChange={this.onChangeType.bind(this)}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="信用贷">信用贷</Option>
                        <Option value="押房贷">押房贷</Option>
                        <Option value="房乐贷">房乐贷</Option>
                        <Option value="车乐贷">车乐贷</Option>
                    </Select>

                    <span>客服姓名：</span>
                    <Select
                        showSearch
                        style={{ width: 150 }}
                        placeholder="请选择客服"
                        optionFilterProp="children"
                        onChange={this.onChangePerson.bind(this)}
                        filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="李大维">李大维</Option>
                        <Option value="李小冉">李小冉</Option>
                        <Option value="李莉">李莉</Option>
                        <Option value="张玲">张玲</Option>
                        <Option value="李家豪">李家豪</Option>
                    </Select>
                    <Button type="primary" onClick={()=>{
                        axios.defaults.headers.common["authorization"] =Cookie.get("userName") 
                        axios.get('http://localhost:3000/api/list?order=3').then((res)=>{
                            let obj = {
                                type:this.state.type,
                                name:this.state.name
                            }
                            let arr = res.data.data.filter((item)=>{
                                if(obj.type!==""){
                                    if(obj.type !== item.type){
                                        return false
                                    }
                                }
                                if(obj.name!==""){
                                    if(obj.name !== item.serviceName){
                                        return false
                                    }
                                }
                                return true
                            })
                            this.setState({
                                InsuranceData:arr
                            })
                        })
                    }}>提交</Button>
                </div>
                <div className="right-table">
                    <RightTable data={this.state.InsuranceData}></RightTable>
                </div>
            </div>
        )
    }
}
