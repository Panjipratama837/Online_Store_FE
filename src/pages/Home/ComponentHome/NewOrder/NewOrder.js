import React from 'react'
import { Button, Popover, Space, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { ActionTable, moneyFormatIDR } from '../../../../utils';


// styled component

const TableCustom = styled(Table)`
  thead[class*="ant-table-thead"] th {
    background-color: white !important;
  }
  `



const NewOrder = () => {

    const handleAction = (e) => {
        console.log('values : ', e.target.innerText);
    }

    const columns = [
        {
            title: 'ID Order',
            dataIndex: 'orderId',
            key: 'orderId',
            align: 'center',
            render: (text) => <a>{text}</a>,
        },

        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },


        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            align: 'center',
            width: '20%'
        },
        {
            title: 'Total Quantity',
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            align: 'center',
            render: (text) => <span>{moneyFormatIDR(text)}</span>,
        },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            align: 'center',
            render: (_, { status }) => (
                <>
                    {status === 'newOrder' && <Tag color="blue">New Order</Tag>}
                    {status === 'progress' && <Tag color="orange">In Progress</Tag>}
                    {status === 'completed' && <Tag color="green">Completed</Tag>}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: () => (
                <ActionTable arrayContent={['In Progress', 'Completed']} onClick={handleAction} />
            ),
        },
    ];
    const data = [
        {
            orderId: '1',
            username: 'John Brown',
            address: 'New York No. 1 Lake Park',
            totalQuantity: 32,
            totalAmount: 100000,
            status: 'newOrder',
            createdAt: '2021-01-01',
            updatedAt: '2021-01-01',
        },
        {
            orderId: '2',
            username: 'John Brown',
            address: 'New York No. 1 Lake Park',
            totalQuantity: 32,
            totalAmount: 100000,
            status: 'newOrder',
            createdAt: '2021-01-01',
            updatedAt: '2021-01-01',
        },
    ];
    return (
        <>
            <h1 style={{
                fontSize: '1rem',
                fontWeight: '600',
            }}>New Order</h1>
            <TableCustom style={{
                marginTop: '2rem',
            }} columns={columns}
                dataSource={data}
                pagination={
                    {
                        pageSize: 5,
                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,

                    }
                }
                rowKey={record => record.orderId} />
        </>
    )
}

export default NewOrder