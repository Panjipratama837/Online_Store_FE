import { Avatar, Badge, Button, Col, Row, Space } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductsDetailQuery } from '../../../../api/productApiSlice'
import { moneyFormatIDR } from '../../../../utils'

const DetailProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    console.log('params : ', params);


    const { data: productDetail, isLoading, isSuccess, isError } = useGetProductsDetailQuery(params.id)

    console.log('productDetail : ', productDetail);

    return (
        <>

            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <img style={{
                        width: '90%',
                        // height: '80vh',
                        objectFit: 'cover',
                        backgroundPosition: 'center',
                    }} src={productDetail?.uploadPicture} alt="" />
                </Col>

                <Col style={{
                    padding: '20px',
                    borderLeft: '5px solid black'
                }} span={12}>
                    <div>
                        <h3 style={{
                            fontSize: '2rem',
                            textAlign: 'center',
                            fontWeight: 600,
                        }}>{productDetail?.productName}</h3>
                    </div>

                    <div>
                        <h3 style={{
                            fontWeight: 600,
                            // borderBottom: '5px solid black'
                        }}>
                            Description
                        </h3>
                        <hr />
                        <p style={{
                            textAlign: 'justify',
                            marginTop: '10px',
                            lineHeight: '1.5rem'
                        }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                    </div>



                    <div>
                        <h3 style={{
                            fontWeight: 600,
                        }}>
                            Quantity
                        </h3>
                        <Space size={'middle'}>

                            {productDetail?.quantity.map((item, index) => {
                                return (
                                    <Badge count={5}>
                                        <Avatar shape="square" size="large" />
                                    </Badge>
                                )
                            })}
                        </Space>


                    </div>

                    <div>
                        <h3 style={{
                            fontWeight: 600,
                        }}>
                            Price
                        </h3>
                        <p>Rp. {moneyFormatIDR(productDetail?.price)}</p>

                    </div>

                    <p>{`quantity : ${productDetail?.quantity}`}</p>
                    <p>{`size : ${productDetail?.size}`}</p>
                </Col>
            </Row>
        </>


        // <div>
        //     <h3>
        //         <p>{`Product Name : ${productDetail?.productName}`}</p>
        //         <p>{`description : ${productDetail?.description}`}</p>
        //         <p>{`price : ${productDetail?.price}`}</p>
        //         <p>{`quantity : ${productDetail?.quantity}`}</p>
        //         <p>{`size : ${productDetail?.size}`}</p>
        //         <p>{`uploadPicture : ${productDetail?.uploadPicture}`}</p>

        //         <Button type="primary" onClick={() => navigate('/admin/products')}>Back</Button>
        //         <Button type="primary" onClick={() => navigate('/admin/products/add-product', { state: productDetail, replace: true })} danger >Edit</Button>

        //     </h3>
        // </div>
    )
}

export default DetailProduct