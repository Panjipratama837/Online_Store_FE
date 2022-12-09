import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Form, Input, Row, Col, Select } from 'antd';
import { MinusOutlined, FacebookFilled, AppleFilled, GoogleOutlined } from '@ant-design/icons';
import Styles from './register.module.scss'
import bgLogin from '../../assets/images/b.jpg'

const Register = () => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [signupForm] = Form.useForm();




  const [width, setWidth] = useState(0);

  const updateWindowDimensions = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
    console.log('updating newWidth');
  };

  const onFinish = (values) => {
    console.log('Success:', values);

    axios.post('http://localhost:8000/api/register', values)
      .then(res => {
        console.log("Ini res : ", res);
        console.log("Ini res data : ", res.data);

        signupForm.resetFields();
        console.log('resetting form');

      })
      .catch(err => {
        console.log(err);
      })


  };

  // useForm 




  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    console.log('useEffect');

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
              }}>SIGN UP</h3>
              <p>
                Hey, Register your details below to login to your account
              </p>
            </center>

            <Form
              form={signupForm}
              name="signup"
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
                <Input placeholder='Username' />
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

              {/* <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Please select role!',
                  },
                ]}
              >
                <Select placeholder="select your role">
                  <Option value="admin">Admin</Option>
                  <Option value="user">User</Option>
                </Select>
              </Form.Item> */}

              <p style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'blue',
              }}>Having trouble in sign up?</p>

              <Button size='large' style={{
                width: '100%',
              }} type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form>

            <center>
              <p style={{
                marginTop: '20px',
              }}><MinusOutlined /> Or sign up with <MinusOutlined /></p>
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
                have an account? <span style={{
                  color: 'blue',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }} onClick={
                  () => navigate('/login')
                }>Sign In</span>
              </p>
            </center>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Register