import { Button } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetProductsDetailQuery } from '../../../../api/productApiSlice'

const DetailProduct = () => {
    const params = useParams()
    const navigate = useNavigate()
    console.log('params : ', params);


    const { data: productDetail, isLoading, isSuccess, isError } = useGetProductsDetailQuery(params.id)

    console.log('productDetail : ', productDetail);

    return (
        <div>
            <h3>
                <p>{`Product Name : ${productDetail?.productName}`}</p>
                <p>{`description : ${productDetail?.description}`}</p>
                <p>{`price : ${productDetail?.price}`}</p>
                <p>{`quantity : ${productDetail?.quantity}`}</p>
                <p>{`size : ${productDetail?.size}`}</p>
                <p>{`uploadPicture : ${productDetail?.uploadPicture}`}</p>

                <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
                <Button type="primary" onClick={() => navigate('/admin/products/add-product', { state: productDetail })} danger >Edit</Button>

            </h3>
        </div>
    )
}

export default DetailProduct