import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SafeImg from '../components/SafeImg'
import { products, img, formatPrice, PHOTOS } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function Cart() {
  const { cart, updateQty, removeFromCart, clearCart } = useStore()
  const lines = cart.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 199
  const total = subtotal + shipping

  return (
    <>
      <PageHeader eyebrow="Review" title="Your bag" image={PHOTOS.walletBrown} />
      <section className="container-x py-16">
        {lines.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
            <ShoppingBag size={64} className="mx-auto text-tan" />
            <h2 className="mt-6 font-display text-4xl">Your bag is empty</h2>
            <p className="mt-2 text-leather/60">Find something worth keeping.</p>
            <Link to="/shop" className="btn-primary mt-8">Browse collection</Link>
          </motion.div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
            <div className="space-y-5">
              <AnimatePresence initial={false}>
                {lines.map((l) => (
                  <motion.div key={l.key} layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -80 }} className="flex gap-5 rounded-3xl bg-white/60 p-4 shadow-sm sm:p-5">
                    <Link to={`/product/${l.product.id}`} className="h-36 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-40 sm:w-32"><SafeImg src={img(l.product.images[0], 400)} alt={l.product.name} /></Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-4">
                        <div>
                          <Link to={`/product/${l.product.id}`} className="font-display text-xl hover:text-saddle">{l.product.name}</Link>
                          <p className="mt-1 text-xs uppercase tracking-widest text-saddle">{l.product.category}</p>
                          <span className="mt-2 inline-block h-4 w-4 rounded-full border border-espresso/20" style={{ background: l.color }} />
                        </div>
                        <button onClick={() => removeFromCart(l.key)} aria-label="Remove" className="self-start text-leather/40 transition hover:text-red-500"><Trash2 size={18} /></button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 rounded-full border border-tan/50 px-2 py-1">
                          <button onClick={() => updateQty(l.key, l.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-sand"><Minus size={14} /></button>
                          <span className="w-5 text-center">{l.qty}</span>
                          <button onClick={() => updateQty(l.key, l.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full hover:bg-sand"><Plus size={14} /></button>
                        </div>
                        <span className="text-lg font-semibold">{formatPrice(l.product.price * l.qty)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button onClick={clearCart} className="text-sm text-leather/60 underline hover:text-red-500">Clear bag</button>
            </div>

            <aside className="h-fit rounded-3xl bg-espresso p-8 text-cream lg:sticky lg:top-28">
              <h3 className="font-display text-2xl">Order summary</h3>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-cream/70">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-cream/70">Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
                <div className="flex justify-between border-t border-cream/15 pt-4 text-lg"><dt>Total</dt><dd className="font-semibold text-gold">{formatPrice(total)}</dd></div>
              </dl>
              <Link to="/checkout" className="btn-gold mt-8 w-full">Proceed to checkout</Link>
              <Link to="/shop" className="mt-3 block text-center text-sm text-cream/60 hover:text-gold">Continue shopping</Link>
            </aside>
          </div>
        )}
      </section>
    </>
  )
}
