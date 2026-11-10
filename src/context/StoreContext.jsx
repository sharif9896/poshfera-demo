import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'

const StoreContext = createContext(null)

const load = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v ?? fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => load('poshfera_cart', []))
  const [wishlist, setWishlist] = useState(() => load('poshfera_wishlist', []))
  const [user, setUser] = useState(() => load('poshfera_user', null))
  const [cartOpen, setCartOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try { localStorage.setItem('poshfera_cart', JSON.stringify(cart)) } catch {}
  }, [cart])
  useEffect(() => {
    try { localStorage.setItem('poshfera_wishlist', JSON.stringify(wishlist)) } catch {}
  }, [wishlist])
  useEffect(() => {
    try { localStorage.setItem('poshfera_user', JSON.stringify(user)) } catch {}
  }, [user])

  const notify = useCallback((message) => {
    setToast({ message, id: Date.now() })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2600)
    return () => clearTimeout(t)
  }, [toast])

  const addToCart = useCallback((product, opts = {}) => {
    const { qty = 1, color = product.colors[0], silent = false } = opts
    setCart((prev) => {
      const key = `${product.id}-${color}`
      const found = prev.find((i) => i.key === key)
      if (found) return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i))
      return [...prev, { key, id: product.id, color, qty }]
    })
    if (!silent) {
      notify(`${product.name} added to bag`)
      setCartOpen(true)
    }
  }, [notify])

  const updateQty = (key, qty) =>
    setCart((prev) => prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)))
  const removeFromCart = (key) => setCart((prev) => prev.filter((i) => i.key !== key))
  const clearCart = () => setCart([])

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const has = prev.includes(product.id)
      notify(has ? 'Removed from wishlist' : `${product.name} saved to wishlist`)
      return has ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    })
  }

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])

  const value = {
    cart, wishlist, user, setUser, cartOpen, setCartOpen, toast,
    addToCart, updateQty, removeFromCart, clearCart, toggleWishlist, cartCount, notify,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
