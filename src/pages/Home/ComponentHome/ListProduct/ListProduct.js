import { Button, Checkbox, Col, Input, InputNumber, Modal, notification, Popover, Row, Slider, Space, Table } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import currencyFormatter from 'currency-formatter';

import React, { useEffect, useState } from 'react'
import { EditOutlined, FilterFilled, PlusSquareFilled, PlusSquareOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { ActionTable, moneyFormatIDR, Notification } from '../../../../utils';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../../api/productApiSlice';



const ListProduct = () => {

    // local State
    const navigate = useNavigate();
    const { Search } = Input;
    const location = useLocation();

    console.log('location : ', location.state);
    // clear location.state




    const [inputValue, setInputValue] = useState(0);
    console.log('inputValue : ', inputValue);

    // const notif = location.state?.notif;
    const [notif, setNotif] = useState(false);

    console.log('notif : ', notif);
    const [message, setMessage] = useState('');
    console.log('message : ', message);


    const [price, setPrice] = useState({
        min: 0,
        max: 0,
    });
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

        if (sorter.order === 'ascend' && sorter.field === 'totalQuantity') {
            setQueryParams({
                ...queryParams,
                size: pagination.pageSize,
                page: pagination.current - 1,
                sort: 'asc',
            })
        }
        if (sorter.order === 'descend' && sorter.field === 'totalQuantity') {
            setQueryParams({
                ...queryParams,
                size: pagination.pageSize,
                page: pagination.current - 1,
                sort: 'desc',
            })
        }

        if (sorter.order === undefined && sorter.field === 'totalQuantity') {
            setQueryParams({
                ...queryParams,
                size: pagination.pageSize,
                page: pagination.current - 1,
                sort: '',
            })
        }

    };


    const columns = [
        {
            title: 'ID Product',
            dataIndex: 'id',
            // width: '30%',
            align: 'center',
            render: (text, record) => <Link style={{ cursor: "pointer" }} to={`/admin/products/detail/${record.id}`} params={{ id: record?.id }}>
                {text}
            </Link>,
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            // width: '30%',
            align: 'center',

        },
        {
            title: 'Category',
            dataIndex: 'category',
            align: 'center',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            align: 'center',
            // sorter: (a, b) => null,
            width: '25%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: 'center',
            // sorter: (a, b) => null,
            render: (text) => (
                <p>{`Rp. ${moneyFormatIDR(text)}`}</p>
            )

        },
        {
            title: 'Total Quantity',
            dataIndex: 'totalQuantity',
            align: 'center',
            sorter: (a, b) => null,
            render: (text, record) => (
                <p>{`${text} pcs`}</p>
            )

        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record) => (
                <ActionTable arrayContent={['Edit', 'Delete']} onClick={(e) => {
                    handleAction(e, record)
                }} />
            ),
        },

    ];

    const data = [
        {
            productId: '43',
            productName: 'John Brown',
            categoryId: '001',
            category: 'Shirt',
            price: 32,
            totalQuantity: 100,
            description: 'New York No. 1 Lake Park',
            image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            availableSize: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            quantityPerSize: {
                xs: 10,
                s: 20,
                m: 0,
                l: 0,
                xl: 0,
            }
        },
        {
            productId: '1213',
            productName: 'John Brown',
            categoryId: '001',
            category: 'Shirt',
            price: 32,
            totalQuantity: 100,
            description: 'New York No. 1 Lake Park',
            image: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            availableSize: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            quantityPerSize: {
                xs: 10,
                s: 20,
                m: 0,
                l: 0,
                xl: 0,
            }
        },


    ]

    // RTK Query

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        currentData,

    } = useGetProductsQuery(queryParams, { skip: false })

    const [deleteProduct] = useDeleteProductMutation()


    // Handle Actions

    const onChange = (newValue) => {
        setInputValue(newValue);

    };

    const showModal = () => {
        setIsModalOpen(true);
        setQueryParams({
            ...queryParams,
            page: 0,
        })

        if (inputValue === 0) {
            setInputValue(price.max)
        }

    };

    const handleOk = () => {
        setIsModalOpen(false);
        setQueryParams({
            ...queryParams,
            page: 0,
            category: category.toString(),
            price: inputValue,
        })
    };


    const handleCancel = () => {
        setIsModalOpen(false);

    };

    const handleCheckbox = (value) => {
        setCategory(value)
    }

    const confirm = (id) => {
        Modal.confirm({
            title: 'Delete Product',
            content: (
                <div>
                    <p>Are you sure ?</p>
                </div>
            ),
            onOk() {
                deleteProduct(id)
                    .unwrap()
                    .then((res) => {
                        console.log('res delete : ', res);
                        setMessage(res.message)
                        setNotif(true)

                        setTimeout(() => {
                            setNotif(false)
                            setMessage('')
                        }, 2000)
                    })
                    .catch((err) => {
                        console.log('err : ', err);
                    })

            },
        });
    };



    const handleAction = (e, value) => {
        if (e.target.innerText === 'Edit') {
            navigate('/admin/products/add-product', { state: value })
        }

        if (e.target.innerText === 'Delete') {
            confirm(value.id)
        }

    }



    const handleAddProduct = () => {
        navigate('/admin/products/add-product')
    }



    const success = () => {
        setTotalRecorded(products?.total)
        console.log('products : ', products);

        setPrice({
            min: products?.minPrice,
            max: products?.maxPrice,
        })

        // setInputValue(products?.minPrice)
    }

    useEffect(() => {
        isSuccess && (
            success()
        )
    }, [products, isSuccess, queryParams])

    useEffect(() => {

        window.onload = () => {
            location.state = undefined
        }

        if (location.state?.notif) {
            setNotif(true)
        }

        if (location.state?.message) {
            setMessage(location.state?.message)
        }


        setTimeout(() => {
            location.state = undefined

            setMessage('')
        }, 2000);

    }, [])

    console.log('after location : ', location);

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
                }}>List Product</h1>
                <div style={{
                    display: 'flex',
                }}>
                    <Space size='small'>
                        <Search placeholder="Search product" onChange={(e) => {
                            setQueryParams({
                                ...queryParams,
                                page: 0,
                                search: e.target.value
                            })

                        }} />


                        <FilterFilled style={{
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: '#227C70',
                        }} onClick={showModal} />
                        <Modal title="Filter Products" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <div style={{
                                marginBottom: '1.5rem',
                            }}>
                                <h4>Category</h4>
                                <Checkbox.Group onChange={handleCheckbox} >
                                    <Row>
                                        <Space size={24}>
                                            <Col span={24}>
                                                <Checkbox value="shirt">Shirt</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="t-shirt">T-shirt</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="jacket">Jacket</Checkbox>
                                            </Col>
                                            <Col span={24}>
                                                <Checkbox value="pants">Pants</Checkbox>
                                            </Col>
                                        </Space>

                                    </Row>
                                </Checkbox.Group>
                            </div>
                            <div>
                                <h4>Price</h4>
                                <Row>
                                    <Col span={12}>
                                        <Slider
                                            min={0}
                                            max={price.max ? price.max : 10000000}
                                            onChange={onChange}
                                            value={typeof inputValue === 'number' ? inputValue : 0}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InputNumber
                                            min={0}
                                            max={price.max ? price.max : 10000000}
                                            style={{
                                                margin: '0 16px',
                                                width: '55%',
                                            }}
                                            value={inputValue ? currencyFormatter.format(inputValue, { code: 'IDR' }) : 0}
                                            onChange={onChange}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Modal>

                        <PlusSquareFilled style={{
                            fontSize: '2rem',
                            cursor: 'pointer',
                            color: '#1890ff',
                        }} onClick={handleAddProduct} />
                    </Space>


                </div>
            </header>
            <main>
                <Table
                    onChange={changeTable}
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={products?.data}
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

export default ListProduct