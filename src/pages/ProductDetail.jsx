import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Minus, Plus, RotateCcw, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import SafeImg from '../components/SafeImg'
import ProductCarousel from '../components/ProductCarousel'
import Reveal from '../components/Reveal'
import { products, img, formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [active, setActive] = useState(0)
  const [color, setColor] = useState(product?.colors[0])
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('details')
  const [auto, setAuto] = useState(true)
  const [zoom, setZoom] = useState({ on: false, x: 50, y: 50 })

  useEffect(() => {
    setActive(0)
    setQty(1)
    setColor(product?.colors[0])
  }, [id])

  // Auto image slider
  useEffect(() => {
    if (!product || !auto) return
    const t = setInterval(() => setActive((a) => (a + 1) % product.images.length), 4000)
    return () => clearInterval(t)
  }, [product, auto])

  if (!product) {
    return (
      <div className="container-x py-48 text-center">
        <h1 className="font-display text-4xl">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6">Back to shop</Link>
      </div>
    )
  }

  const liked = wishlist.includes(product.id)
  const related = products.filter((p) => p.category === product.category && p.id !== product.id)
  const more = related.length >= 3 ? related : products.filter((p) => p.id !== product.id)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0
  const n = product.images.length

  return (
    <>
      <section className="container-x pb-20 pt-40">
        <nav className="mb-8 text-xs uppercase tracking-widest text-leather/60">
          <Link to="/" className="hover:text-saddle">Home</Link> / <Link to="/shop" className="hover:text-saddle">Shop</Link> /{' '}
          <Link to={`/shop?category=${product.category}`} className="hover:text-saddle">{product.category}</Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Gallery */}
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="flex gap-3 md:flex-col">
              {product.images.map((im, i) => (
                <button key={i} onClick={() => { setActive(i); setAuto(false) }} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl transition ${i === active ? 'ring-2 ring-saddle ring-offset-2 ring-offset-cream' : 'opacity-60 hover:opacity-100'}`}>
                  <SafeImg src={img(im, 200)} alt="" />
                </button>
              ))}
            </div>

            <div
              className="group relative aspect-[4/5] flex-1 cursor-zoom-in overflow-hidden rounded-3xl bg-sand"
              onMouseEnter={() => setAuto(false)}
              onMouseLeave={() => { setZoom({ on: false, x: 50, y: 50 }); setAuto(true) }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                setZoom({ on: true, x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
              }}
            >
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={active}
                  src={img(product.images[active], 1200)}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: zoom.on ? 1.8 : 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 0.6 }, scale: { duration: 0.35 } }}
                  style={{ transformOrigin: `${zoom.x}% ${zoom.y}%` }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>
              {product.badge && <span className="absolute left-4 top-4 rounded-full bg-espresso px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gold">{product.badge}</span>}
              <button onClick={() => setActive((active - 1 + n) % n)} aria-label="Previous image" className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 opacity-0 shadow transition group-hover:opacity-100"><ChevronLeft size={20} /></button>
              <button onClick={() => setActive((active + 1) % n)} aria-label="Next image" className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 opacity-0 shadow transition group-hover:opacity-100"><ChevronRight size={20} /></button>
              <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                {product.images.map((_, i) => <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-cream' : 'w-1.5 bg-cream/50'}`} />)}
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="eyebrow">{product.category}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">{product.name}</motion.h1>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className={i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-tan'} />)}</div>
              <span className="font-medium">{product.rating}</span><span className="text-leather/60">· {product.reviews} reviews</span>
            </div>

            <div className="mt-6 flex items-baseline gap-4">
              <span className="font-display text-4xl">{formatPrice(product.price)}</span>
              {product.oldPrice && <><span className="text-lg text-leather/50 line-through">{formatPrice(product.oldPrice)}</span><span className="rounded-full bg-gold px-3 py-1 text-xs font-bold">Save {discount}%</span></>}
            </div>
            <p className="mt-6 leading-relaxed text-leather/80">{product.description}</p>

            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-saddle">Colour</p>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setColor(c)} aria-label={`Colour ${c}`} className={`h-10 w-10 rounded-full border-2 transition ${color === c ? 'scale-110 border-saddle ring-2 ring-gold/50 ring-offset-2 ring-offset-cream' : 'border-transparent'}`} style={{ background: c }} />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-4 rounded-full border border-tan/60 px-3 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-8 w-8 place-items-center rounded-full hover:bg-sand"><Minus size={16} /></button>
                <span className="w-6 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-8 w-8 place-items-center rounded-full hover:bg-sand"><Plus size={16} /></button>
              </div>
              <button onClick={() => addToCart(product, { qty, color })} className="btn-primary flex-1"><ShoppingBag size={18} /> Add to bag</button>
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => toggleWishlist(product)} aria-label="Wishlist" className="grid h-[52px] w-[52px] place-items-center rounded-full border border-espresso/30 transition hover:bg-sand">
                <Heart size={20} className={liked ? 'fill-red-500 text-red-500' : ''} />
              </motion.button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
              {[[Truck, 'Free delivery over ₹5,000'], [RotateCcw, '30-day returns'], [ShieldCheck, 'Lifetime guarantee']].map(([Icon, t]) => (
                <div key={t} className="rounded-2xl bg-sand/70 p-4"><Icon className="mx-auto mb-2 text-saddle" size={22} />{t}</div>
              ))}
            </div>

            <div className="mt-10">
              <div className="flex gap-8 border-b border-tan/40">
                {[['details', 'Details'], ['care', 'Leather care'], ['shipping', 'Shipping']].map(([k, l]) => (
                  <button key={k} onClick={() => setTab(k)} className={`relative pb-3 text-sm font-medium uppercase tracking-widest ${tab === k ? 'text-espresso' : 'text-leather/50'}`}>
                    {l}{tab === k && <motion.span layoutId="tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-saddle" />}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="pt-5 text-sm leading-relaxed text-leather/80">
                  {tab === 'details' && <ul className="space-y-2">{product.details.map((d) => <li key={d} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{d}</li>)}</ul>}
                  {tab === 'care' && <p>Wipe with a soft dry cloth. Condition twice a year with a natural leather balm. Keep away from direct heat and prolonged moisture. Natural marks and creases add to its character.</p>}
                  {tab === 'shipping' && <p>Dispatched within 24 hours. Delivery in 3–5 business days across India. Free shipping on orders above ₹5,000. Easy 30-day returns.</p>}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden pb-10">
        <div className="container-x mb-8"><Reveal><p className="eyebrow mb-3">You may also love</p><h2 className="font-display text-4xl font-semibold">Complete the look</h2></Reveal></div>
        <ProductCarousel items={more.slice(0, 8)} speed={0.5} />
      </section>
    </>
  )
}
