import { Button, Input, Popover, Space, Table } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import React from 'react'
import { EditOutlined } from '@ant-design/icons';
import { ActionTable, moneyFormatIDR } from '../../../../utils';
import { useDeleteProductMutation, useGetProductsQuery } from '../../../../api/productApiSlice';



const ListProduct = () => {

    const dataBarang = [
        {
            id: 1,
            productName: 'Baju',
            description: 'Baju keren',
            price: 10000,
        },
        {
            id: 1,
            productName: 'Baju',
            description: 'Baju keren',
            price: 10000,
        }
    ]

    // add key to data
    const newData = dataBarang.map((item, index) => ({ ...item, key: index }))
    console.log('data : ', newData);

    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        currentData,

    } = useGetProductsQuery()


    const [deleteProduct] = useDeleteProductMutation()
    console.log('products : ', products);
    console.log('currentData : ', currentData);

    console.log('isLoading : ', isLoading);
    console.log('isSuccess : ', isSuccess);
    console.log('isError : ', isError);

    // random three number

    console.log('Random : ', Math.floor(Math.random() * 10));




    // const testReduce = isSuccess && products.map((item) => item.quantity.map((item) => item[1]))

    // console.log('testReduce : ', testReduce);

    // const reReduce = isSuccess && products.map((item) => item.quantity.map((item) => item[1]).reduce((a, b) => a + b))


    // console.log('products hahay : ', reReduce);


    const navigate = useNavigate();
    const handleAdd = () => {
        navigate('/admin/products/add-product')
    }

    const handleAction = (e, value) => {
        console.log('Record : ', value);
        console.log('values : ', e.target.innerText);

        if (e.target.innerText === 'Edit') {
            navigate('/admin/products/add-product', { state: value })
        }

        if (e.target.innerText === 'Delete') {
            deleteProduct(value.id)
                .unwrap()
                .then((res) => {
                    console.log('res delete : ', res);
                })
                .catch((err) => {
                    console.log('err : ', err);
                })



        }

    }



    const { Search } = Input;
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
            width: '25%',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            align: 'center',
            render: (text) => (
                <p>{`Rp. ${moneyFormatIDR(text)}`}</p>
            )

        },
        {
            title: 'Total Quantity',
            dataIndex: 'totalQuantity',
            align: 'center',
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
                // <p>haha</p>
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

    const onSearch = (value) => console.log(value);
    return (
        <>
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
                        <Search placeholder="Search product" onSearch={onSearch} />
                        <Button onClick={handleAdd} type="primary">Add new product</Button>
                    </Space>
                </div>
            </header>
            <main>
                <Table
                    rowKey={record => record.id}
                    columns={columns}
                    dataSource={products?.data}
                    style={{
                        marginTop: '1.5rem',
                    }}
                    pagination={{
                        pageSize: 10,
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