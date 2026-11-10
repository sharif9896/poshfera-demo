import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toast from './components/Toast'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Wishlist from './pages/Wishlist'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  const location = useLocation()
  const wrap = (el) => <PageTransition>{el}</PageTransition>
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <Toast />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={wrap(<Home />)} />
          <Route path="/shop" element={wrap(<Shop />)} />
          <Route path="/product/:id" element={wrap(<ProductDetail />)} />
          <Route path="/cart" element={wrap(<Cart />)} />
          <Route path="/checkout" element={wrap(<Checkout />)} />
          <Route path="/wishlist" element={wrap(<Wishlist />)} />
          <Route path="/about" element={wrap(<About />)} />
          <Route path="/contact" element={wrap(<Contact />)} />
          <Route path="/login" element={wrap(<Login />)} />
          <Route path="*" element={wrap(<NotFound />)} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
