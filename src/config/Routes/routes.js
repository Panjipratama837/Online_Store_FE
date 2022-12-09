import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Login, Register } from '../../pages';
import { ListProduct, AddProduct, Profile, Category, Dashboard, NewOrder, ProgressOrder, CompletedOrder, DetailProduct } from '../../pages/Home/ComponentHome';

const routes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='admin' element={<Home />}>
                    <Route index element={<Dashboard />} />
                    <Route path='profile' element={<Profile />} />
                    <Route path='products/add-product' element={<AddProduct />} />
                    <Route path='products' element={<ListProduct />} />
                    <Route path='products/detail/:id' element={<DetailProduct />} />
                    <Route path='products/category' element={<Category />} />

                    <Route path='transaction/new-order' element={<NewOrder />} />
                    <Route path='transaction/progress' element={<ProgressOrder />} />
                    <Route path='transaction/completed' element={<CompletedOrder />} />


                </Route>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </Router>
    )
}

export default routes