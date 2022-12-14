import React, { useEffect, useState } from 'react';
import { HomeOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ShoppingCartOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, Modal, theme } from 'antd';
import { Outlet } from 'react-router-dom';
import BreadCrumb from '../../component/breadcumb/BreadCumb';
const { Content, Sider, Header } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items2 = [
  getItem('Dashboard', 'admin', <HomeOutlined />),
  getItem('Profile', 'profile', <UserOutlined />),

  getItem('Product', 'product', <ShoppingCartOutlined />, [
    getItem('Category', 'category'),
    getItem('Products', 'products'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Transaction', 'transaction', <SolutionOutlined />, [
    getItem('New Order', 'newOrder'),
    getItem('On Progress', 'onProgress'),
    getItem('Completed Order', 'completedOrder'),
    // getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Logout', 'logout', <LogoutOutlined />),

];

const Home = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState('');
  const [collapsed, setCollapsed] = useState(false);


  const confirm = () => {
    Modal.confirm({
      title: 'Logout',
      content: (
        <div>
          <p>Are you sure ?</p>
        </div>
      ),
      onOk() {
        navigate('/login');
        window.sessionStorage.clear();
      },
      onCancel() {
        setKey((prevkey) => (prevkey = key));
      },
    });
  };


  const clickMenu = (e) => {
    setKey(e.key);


    switch (e.key) {
      case 'products':
        navigate('/admin/products');
        break;

      case 'admin':
        navigate('/admin');
        break;

      case 'category':
        navigate('/admin/products/category');
        break;

      case 'profile':
        navigate('/admin/profile');
        break;


      case 'newOrder':
        navigate('/admin/transaction/new-order');
        break;

      case 'onProgress':
        navigate('/admin/transaction/progress');
        break;

      case 'completedOrder':
        navigate('/admin/transaction/completed');
        break;



      case 'logout':

        confirm();

        break;

      default:
        break;
    }


  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const data = JSON.parse(window.sessionStorage.getItem('keyNavv'));
    if (data !== '') {
      setKey(data);
    }

  }, []);

  useEffect(() => {
    window.sessionStorage.setItem('keyNavv', JSON.stringify(key));

  }, [key]);


  return (
    <>
      <Layout>

        <Layout>
          <Sider
            width={200}
            trigger={null} collapsible collapsed={collapsed}
            style={{
              background: colorBgContainer,
            }}
          >
            <h1 style={{
              textAlign: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginTop: '1rem',
            }}>Agis Store</h1>

            <Menu
              mode="inline"
              // defaultSelectedKeys={key}
              selectedKeys={key === null ? 'admin' : key}
              defaultOpenKeys={['product', 'transaction']}
              style={{
                height: '100%',
                borderRight: 0,
              }}
              onClick={clickMenu}
              items={items2}
            />
          </Sider>
          <Layout
            style={{
              padding: '24px',
            }}
          >


            <div style={{
              display: 'flex',
              paddingBottom: '20px',
            }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                style: {
                  fontSize: '1.5rem',
                },
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>


  );
};
export default Home;