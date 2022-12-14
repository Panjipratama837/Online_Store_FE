import { Button, Checkbox, Col, Input, InputNumber, Modal, notification, Popover, Row, Slider, Space, Table } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';

import React, { useEffect, useState } from 'react'
import { DeleteFilled, DeleteOutlined, EditOutlined, FilterFilled, PlusSquareFilled, PlusSquareOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { ActionTable, moneyFormatIDR, Notification } from '../../../../utils';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../../api/productApiSlice';



const Category = () => {

    // local State
    const navigate = useNavigate();
    const location = useLocation();
    const { Search } = Input;
    const [totalRecorded, setTotalRecorded] = useState(0);
    const [category, setCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 5,
        category: 'all',
        search: '',
        price: 10000000,
        sort: '',
    });

    console.log('queryParams : ', queryParams);

    const changeTable = (pagination, filters, sorter, extra) => {
        console.log('params', sorter);
        setQueryParams({
            ...queryParams,
            size: pagination.pageSize,
            page: pagination.current - 1,
            // sort: 'asc',
        })

    };


    const columns = [
        {
            title: 'ID Category',
            dataIndex: 'id',
            // width: '30%',
            align: 'center',
            render: (text, record) => <Link style={{ cursor: "pointer" }} to={`/admin/products/detail/${record.id}`} params={{ id: record?.id }}>
                {text}
            </Link>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            align: 'center',
        },

        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record) => (
                <DeleteOutlined style={{
                    color: 'red',
                    fontSize: '1.5rem',
                    cursor: "pointer"
                }} />
            ),
        },

    ];

    const data = [
        {
            id: '001',
            category: 'Shirt',
        },
        {
            id: '002',
            category: 'Jacket',
        },
        {
            id: '003',
            category: 'Pants',
        },
        {
            id: '004',
            category: 'T-shirt',
        },

    ]

    // RTK Query


    // Handle Actions

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const handleAddProduct = () => {
        navigate('/admin/products/add-product')
    }



    const success = () => {

    }

    // useEffect(() => {
    //     isSuccess && (
    //         success()
    //     )
    // }, [products, isSuccess, queryParams])

    useEffect(() => {

    }, [])


    return (
        <>
            {/* {location.state?.notif && (
                <Notification message={location.state?.message} />
            )} */}

            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                // backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
                <h1 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                }}>Category</h1>
                <div style={{
                    display: 'flex',
                }}>
                    <Space size='small'>
                        <Search placeholder="Search category" onChange={(e) => {
                            setQueryParams({
                                ...queryParams,
                                page: 0,
                                search: e.target.value
                            })

                        }} />

                        <PlusSquareFilled style={{
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: '#1890ff',
                        }} onClick={showModal} />

                        <Modal title="Filter Products" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <div style={{
                                marginBottom: '1.5rem',
                            }}>
                                <h4>Category</h4>
                            </div>
                            <div>
                                <h4>Price</h4>
                            </div>
                        </Modal>
                    </Space>


                </div>
            </header>
            <main>
                <Table
                    onChange={changeTable}
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={data}
                    style={{
                        marginTop: '1.5rem',
                    }}
                    pagination={{
                        current: queryParams.page + 1,
                        pageSize: queryParams.size,
                        total: totalRecorded,

                        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    }}
                    scroll={{
                        y: 350,
                    }}
                />
            </main>

        </>

    )
}

export default Category