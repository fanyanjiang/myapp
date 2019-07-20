import React, { Component } from 'react'

import { Table } from 'antd';

export default class RightTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            data:[],
            columns:[
                {
                    title: '订单号',
                    width: 100,
                    dataIndex: 'id',
                    key: 'name',
                    fixed: 'left',
                },
                {
                    title: '下单时间',
                    width: 200,
                    dataIndex: 'date',
                    key: 'age',
                    fixed: 'left',
                },
                { title: '用户名称', dataIndex: 'customerName', key: '1' },
                { title: '手机号', dataIndex: 'phone', key: '2' },
                { title: '产品类型', dataIndex: 'type', key: '3' },
                { title: '贷款金额(万元)', dataIndex: 'money', key: '4' },
                { title: '贷款利率', dataIndex: 'interestRate', key: '5' },
                { title: '订单状态', dataIndex: 'handleState', key: '6' },
                { title: '客服', dataIndex: 'serviceName', key: '7' },
                {
                    title: 'Action',
                    key: 'operation',
                    fixed: 'right',
                    width: 100,
                    render: () => <a href="javascript:;">action</a>,
                },
                ]
        }
    }
    render() {   
        // console.log(this.props.data)
        return (
            <Table columns={this.state.columns} dataSource={this.props.data} scroll={{ x: 1300 }} />
        )
    }
}
