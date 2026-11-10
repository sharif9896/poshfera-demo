import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { products, img, formatPrice } from '../data/products'
import SafeImg from './SafeImg'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart } = useStore()
  const lines = cart.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setCartOpen(false)} className="fixed inset-0 z-[60] bg-espresso/60 backdrop-blur-sm" />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-tan/30 p-6">
              <h2 className="font-display text-2xl">Your Bag <span className="text-sm text-saddle">({lines.length})</span></h2>
              <button onClick={() => setCartOpen(false)} className="grid h-10 w-10 place-items-center rounded-full transition hover:rotate-90 hover:bg-sand"><X size={20} /></button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto p-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag size={48} className="text-tan" />
                  <p className="font-display text-2xl">Your bag is empty</p>
                  <p className="text-sm text-leather/70">Discover pieces made to be kept for decades.</p>
                  <Link to="/shop" onClick={() => setCartOpen(false)} className="btn-primary mt-2">Start Shopping</Link>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {lines.map((l) => (
                    <motion.div key={l.key} layout initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 80, height: 0 }} className="flex gap-4">
                      <Link to={`/product/${l.product.id}`} onClick={() => setCartOpen(false)} className="h-28 w-24 shrink-0 overflow-hidden rounded-xl">
                        <SafeImg src={img(l.product.images[0], 300)} alt={l.product.name} />
                      </Link>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <p className="font-display leading-tight">{l.product.name}</p>
                          <p className="mt-1 flex items-center gap-2 text-xs text-leather/70">
                            <span className="h-3 w-3 rounded-full border border-espresso/20" style={{ background: l.color }} /> Colour
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-tan/50 px-2 py-1">
                            <button onClick={() => updateQty(l.key, l.qty - 1)} className="grid h-6 w-6 place-items-center rounded-full hover:bg-sand"><Minus size={13} /></button>
                            <span className="w-4 text-center text-sm">{l.qty}</span>
                            <button onClick={() => updateQty(l.key, l.qty + 1)} className="grid h-6 w-6 place-items-center rounded-full hover:bg-sand"><Plus size={13} /></button>
                          </div>
                          <span className="font-semibold">{formatPrice(l.product.price * l.qty)}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(l.key)} aria-label="Remove" className="self-start text-leather/40 transition hover:text-red-500"><Trash2 size={16} /></button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {lines.length > 0 && (
              <div className="space-y-4 border-t border-tan/30 bg-sand/50 p-6">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-leather/60">{subtotal >= 5000 ? 'You qualify for free shipping 🎉' : `Add ${formatPrice(5000 - subtotal)} more for free shipping`}</p>
                <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-primary w-full">Checkout</Link>
                <Link to="/cart" onClick={() => setCartOpen(false)} className="btn-outline w-full">View Full Bag</Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
