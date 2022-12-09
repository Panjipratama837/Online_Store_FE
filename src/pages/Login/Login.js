import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Col } from 'antd';
import { MinusOutlined, FacebookFilled, AppleFilled, GoogleOutlined } from '@ant-design/icons';
import Styles from './login.module.scss'
import bgLogin from '../../assets/images/b.jpg'

const Login = () => {
    const [signinForm] = Form.useForm();


    const navigate = useNavigate();


    const [width, setWidth] = useState(0);

    const updateWindowDimensions = () => {
        const newWidth = window.innerWidth;
        setWidth(newWidth);
        console.log('updating newWidth');
    };

    const onFinish = (values) => {
        console.log('Success:', values);

        axios.post('http://localhost:8000/api/login', values)
            .then(res => {
                console.log("Ini res : ", res);
                console.log("Ini res data : ", res.data);

                signinForm.resetFields();
                console.log('resetting form');

                navigate('/');

            })
            .catch(err => {
                console.log(err);
            })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        window.addEventListener('resize', updateWindowDimensions);
        console.log('useEffect');
        localStorage.removeItem('keyNavv')

    }, [])

    console.log('width : ', width);

    return (
        <div style={{
            backgroundImage: `url(${bgLogin})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
        }}>
            <div className={Styles.container_fluid}>
                <h3 style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                }}>AGIS STORE</h3>
                <div style={{
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // backgroundColor: 'rgba(0,0,0,0.5)',
                    // height: '80vh',
                }}>
                    <div className={Styles.card}>
                        <center>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: '600',
                            }}>SIGN IN</h3>
                            <p>
                                Hey, Enter your details below to login to your account
                            </p>
                        </center>

                        <Form
                            form={signinForm}
                            name="signinForm"
                            wrapperCol={{
                                span: 24,
                            }}
                            initialValues={{
                                // remember: true,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your username!',
                                    },
                                ]}
                            >
                                <Input placeholder='Email / Username' />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder='Password' />
                            </Form.Item>

                            <p style={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                                color: 'blue',
                            }}>Having trouble in sign in?</p>

                            <Button size='large' style={{
                                width: '100%',
                            }} type="primary" htmlType="submit">
                                Sign In
                            </Button>
                        </Form>

                        <center>
                            <p style={{
                                marginTop: '20px',
                            }}><MinusOutlined /> Or sign in with <MinusOutlined /></p>
                        </center>


                        <Row
                            gutter={[8, 8]}
                        >
                            <Col xs={24} sm={24} md={24} lg={8}>
                                <Button className={Styles.btn} size={'middle'} icon={<GoogleOutlined />}>Google</Button>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8}>
                                <Button className={Styles.btn} size={'middle'} icon={<AppleFilled />}>Apple</Button>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8}>
                                <Button className={Styles.btn} size={'middle'} icon={<FacebookFilled />}>Facebook</Button>
                            </Col>
                        </Row>

                        <center style={{
                            marginTop: '20px',
                        }}>
                            <p>
                                Don't have an account? <span style={{
                                    color: 'blue',
                                    cursor: 'pointer',
                                    textDecoration: 'underline',
                                }} onClick={
                                    () => navigate('/register')
                                }>Sign Up</span>
                            </p>
                        </center>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default Login