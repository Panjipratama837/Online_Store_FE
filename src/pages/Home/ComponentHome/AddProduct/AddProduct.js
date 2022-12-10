import React, { useEffect } from 'react'
import { Button, Checkbox, Col, Form, Input, InputNumber, Row, Select, Space } from 'antd'
import UploadPicture from './UploadPicture'

import axios from 'axios'
import { useAddProductMutation, useUpdateProductMutation } from '../../../../api/productApiSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const AddProduct = () => {
    const [addProduct, { isLoading, isSuccess, isError }] = useAddProductMutation()
    const [updateProduct] = useUpdateProductMutation()




    const location = useLocation();
    const navigate = useNavigate();

    const productDetail = location.state

    console.log('productDetail : ', productDetail);


    const quantityProductDetail = productDetail?.quantity

    console.log('quantityProductDetail : ', quantityProductDetail);



    const [addProductForm] = Form.useForm();
    const [addProductForm2] = Form.useForm();
    const { Option } = Select;

    const [sizeProduct, setSizeProduct] = React.useState([])
    const [fileImage, setFileImage] = React.useState([])
    // const [quantity, setQuantity] = React.useState({
    //     xs: 0,
    //     s: 0,
    //     m: 0,
    //     l: 0,
    //     xl: 0,
    // })

    const [quantity, setQuantity] = React.useState(
        [
            ['XS', 0],
            ['S', 0],
            ['M', 0],
            ['L', 0],
            ['XL', 0],
        ]
    )

    // const [productUpdate, setProductUpdate] = React.useState(
    //     productDetail.quantity
    // )


    // console.log('productDetail2 : ', productUpdate);
    console.log('quantity : ', quantity);



    useEffect(() => {
        if (productDetail) {
            setQuantity(productDetail.quantity)
            setSizeProduct(productDetail.size)

            addProductForm.setFieldsValue({
                productName: productDetail.productName,
                category: productDetail.category,
                description: productDetail.description,

            })

            addProductForm2.setFieldsValue({
                price: productDetail.price,
                size: productDetail.size,
                quantity: productDetail.quantity,
                uploadPicture: productDetail.uploadPicture,
            })

        }
    }, [])


    const displayQuantity = quantity.map((item, index) => {
        return (
            <Col key={index} span={4}>
                <Row>
                    <p style={{
                        margin: 'auto',
                    }}>{item[0]}</p>
                    <InputNumber style={{
                        width: '60%',
                    }} min={0} max={100}
                        disabled={sizeProduct.includes(item[0]) ? false : true}
                        onChange={(value) => {
                            let newQuantity = [...quantity]
                            newQuantity[index][1] = value
                            setQuantity(newQuantity)
                        }}
                        value={item[1]}
                    />
                </Row>
            </Col>
        )
    })











    console.log("fileImage : ", fileImage);

    const onFinish2 = (values) => {
        // console.log('Success:', values);

        // const filteredQuantity = quantity.filter(item => item[1] !== 0)

        // console.log("filteredQuantity", filteredQuantity)

        values.quantity = quantity
        if (productDetail) {
            values.quantity = productDetail.quantity
            values.id = productDetail.id
        }


        // cek type data 
        const dataPicture = []

        fileImage.forEach((item, index) => {
            dataPicture.push({
                name: item.name,
            })
        })

        // values.uploadPicture = dataPicture

        // get values form addProductForm
        const dataForm = addProductForm.getFieldsValue()
        // console.log("dataForm : ", dataForm);




        const data = {
            ...dataForm,
            ...values,
        }
        console.log("data : ", data);

        if (productDetail) {
            console.log("updateeee");
            updateProduct(data)
                .unwrap()
                .then((res) => {
                    navigate('/admin/products')
                })
                .catch((err) => {
                    console.log("err : ", err);
                })

        } else {
            addProduct(data)
                .unwrap()
                .then((res) => {
                    console.log("res : ", res);
                    addProductForm.resetFields();
                    addProductForm2.resetFields();

                    setSizeProduct([])
                    setQuantity(
                        [
                            ['XS', 0],
                            ['S', 0],
                            ['M', 0],
                            ['L', 0],
                            ['XL', 0],
                        ]
                    )
                })
                .catch((err) => {
                    console.log("err : ", err);
                })
        }

        // axios.post('http://localhost:8000/api/product/create', data)
        //     .then((res) => {
        //         console.log("res : ", res.data);
        //         addProductForm.resetFields();
        //         addProductForm2.resetFields();

        //         setSizeProduct([])
        //         setQuantity(
        //             [
        //                 ['XS', 0],
        //                 ['S', 0],
        //                 ['M', 0],
        //                 ['L', 0],
        //                 ['XL', 0],
        //             ]
        //         )

        //     })
        //     .catch((err) => {
        //         console.log("err : ", err);
        //     })


    };

    const onFinishFailed2 = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleCheckbox = (value) => {
        console.log('value : ', value);
        setSizeProduct(value)


        if (productDetail) {
            productDetail.size = value
            if (!productDetail.size.includes('XS')) {
                let newQuantity = [...productDetail.quantity]
                newQuantity[0][1] = 0
                productDetail.quantity = newQuantity
            }
        }

        if (!value.includes('XS')) {
            let newQuantity = [...quantity]
            newQuantity[0][1] = 0
            setQuantity(newQuantity)
        }

        if (!value.includes('S')) {
            let newQuantity = [...quantity]
            newQuantity[1][1] = 0
            setQuantity(newQuantity)
        }

        if (!value.includes('M')) {
            let newQuantity = [...quantity]
            newQuantity[2][1] = 0
            setQuantity(newQuantity)
        }

        if (!value.includes('L')) {
            let newQuantity = [...quantity]
            newQuantity[3][1] = 0
            setQuantity(newQuantity)
        }

        if (!value.includes('XL')) {
            let newQuantity = [...quantity]
            newQuantity[4][1] = 0
            setQuantity(newQuantity)
        }




    }




    return (
        <>
            <h1 style={{
                fontSize: '1rem',
                fontWeight: '600',
            }}>{productDetail ? 'Update Product' : 'Add Product'}</h1>

            <Row style={{
                marginTop: '1.5rem',
            }} gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form
                        form={addProductForm}
                        name="basic"
                        layout='vertical'
                        labelCol={{
                            span: 8,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Product Name"
                            name="productName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your productName!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Category"
                            name="category"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your category!',
                                },
                            ]}
                        >
                            <Select>
                                <Option value="shirt">Shirt</Option>
                                <Option value="t-shirt">T-shirt</Option>
                                <Option value="jacket">Jacket</Option>
                                <Option value="pants">Pants</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} showCount maxLength={100} />
                        </Form.Item>


                        {/* <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item> */}


                    </Form>
                </Col>

                <Col xs={24} sm={24} md={24} lg={12} xl={12}>

                    <Form
                        form={addProductForm2}
                        name="basic2"
                        layout='vertical'
                        labelCol={{
                            span: 12,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        onFinish={onFinish2}
                        onFinishFailed={onFinishFailed2}
                        autoComplete="off"
                    >

                        <Form.Item
                            label="Upload Picture"
                            name="uploadPicture"
                            rules={[
                                {
                                    // required: true,
                                    message: 'Please input your Upload Picture!',
                                },
                            ]}
                        >
                            {/* <UploadPicture setFileImage={setFileImage} /> */}
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Available Size"
                            name="size"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your size!',
                                },
                            ]}
                        >
                            <Checkbox.Group onChange={handleCheckbox} >
                                <Row>
                                    <Space size={24}>
                                        <Col span={4}>
                                            <Checkbox value="XS">XS</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="S">S</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="M">M</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="L">L</Checkbox>
                                        </Col>
                                        <Col span={4}>
                                            <Checkbox value="XL">XL</Checkbox>
                                        </Col>
                                    </Space>

                                </Row>
                            </Checkbox.Group>
                        </Form.Item>

                        <Form.Item name="quantity" label="Quantity" >
                            <Row>

                                {displayQuantity}

                            </Row>



                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputNumber min={0} max={10000000} defaultValue={0} />
                        </Form.Item>


                        <Form.Item
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                {productDetail ? 'Update' : 'Submit'}
                            </Button>
                        </Form.Item>


                    </Form>
                </Col>

            </Row>
        </>
    )
}

export default AddProduct