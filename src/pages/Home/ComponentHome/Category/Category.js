import { Button, Checkbox, Col, Input, InputNumber, Modal, notification, Popover, Row, Slider, Space, Table } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';

import React, { useEffect, useState } from 'react'
import { DeleteFilled, DeleteOutlined, EditOutlined, FilterFilled, MenuFoldOutlined, PlusSquareFilled, PlusSquareOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { ActionTable, moneyFormatIDR, Notification, ShowConfirm } from '../../../../utils';
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from '../../../../api/categoryApiSlice';



const Category = () => {

    // local State
    const navigate = useNavigate();
    const location = useLocation();
    const { Search } = Input;
    const [totalRecorded, setTotalRecorded] = useState(0);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [notif, setNotif] = useState(false);
    const [payload, setPayload] = useState({})
    const [category, setCategory] = useState('')
    const [queryParams, setQueryParams] = useState({
        page: 0,
        size: 5,
        search: '',
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
        },
        {
            title: 'Category',
            dataIndex: 'categoryName',
            align: 'center',
        },

        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record) => (
                //     deleteCategory(record?.id)
                //         .unwrap()
                //         .then((res) => {
                //             console.log("Res: ", res);
                //             setMessage(res.message)
                //             setNotif(true)

                //             setTimeout(() => {
                //                 setNotif(false)
                //             }, 2000)
                //         })
                //         .catch((err) => {
                //             console.log("Err Message: ", err);
                //         })
                // }} />



                <ShowConfirm
                    title={'Delete Category'}
                    content={
                        <p>Are you sure?</p>
                    }
                    icon={<DeleteOutlined style={{
                        fontSize: '1.5rem',
                        color: "red",
                        cursor: "pointer"
                    }} />}
                    handleOk={() => {
                        deleteCategory(record?.id)
                            .unwrap()
                            .then((res) => {
                                console.log("Res: ", res);
                                setMessage(res.message)
                                setNotif(true)

                                setTimeout(() => {
                                    setNotif(false)
                                }, 2000)
                            })
                            .catch((err) => {
                                console.log("Err Message: ", err);
                            })
                    }}
                    handleCancel={() => console.log('Cancel Props')}
                />
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
    const {
        data: categories,
        isLoading,
        isSuccess,
        isError,
    } = useGetCategoriesQuery(queryParams, { skip: false })

    console.log('isSuccess: ', isSuccess);

    const [addCategory] = useAddCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()


    // Handle Actions

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setCategory('')
    };


    const handleAddCategory = () => {
        addCategory(payload)
            .unwrap()
            .then((res) => {
                console.log("Res : ", res);
                setMessage(res?.message)
                setNotif(true)
                setCategory('')

                setTimeout(() => {
                    setNotif(false)
                }, 2000)
            })
            .catch((err) => {
                console.log('Error: ', err);
            })
    }


    const success = () => {
        setTotalRecorded(categories?.total)
        console.log('Categories : ', categories);

    }

    useEffect(() => {
        isSuccess && (
            success()
        )
    }, [categories, queryParams])

    return (
        <>
            {notif && (
                <Notification message={message} />
            )}



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

                        <Modal footer={null} title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <div style={{
                                marginBottom: '1.5rem',
                            }}>
                                <Input.Group compact>
                                    <Input
                                        style={{
                                            width: 'calc(100% - 150px)',

                                        }}
                                        onChange={(e) => {
                                            console.log('Value Input: ', e.target.value);
                                            const valueInput = e.target.value
                                            setCategory(valueInput)
                                            setPayload({
                                                categoryName: valueInput
                                            })
                                        }}
                                        value={category}
                                    />
                                    <Button type="primary" onClick={handleAddCategory} >Add category</Button>
                                </Input.Group>
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
                    dataSource={categories?.data}
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