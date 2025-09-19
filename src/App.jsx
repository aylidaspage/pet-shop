import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/Header.jsx';
import Footer from './layouts/Footer.jsx';

import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import Category from './pages/Category.jsx';
import Products from './pages/Products.jsx';
import Sale from './pages/Sale.jsx';
import Product from './pages/Product.jsx';
import Cart from './pages/Cart.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
