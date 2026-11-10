import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CreditCard, Landmark, Smartphone, Wallet } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { products, formatPrice, PHOTOS } from '../data/products'
import { useStore } from '../context/StoreContext'

const steps = ['Shipping', 'Payment', 'Done']

export default function Checkout() {
  const { cart, clearCart } = useStore()
  const [step, setStep] = useState(0)
  const [pay, setPay] = useState('upi')
  const [orderNo] = useState(() => 'AUR-' + Math.floor(100000 + Math.random() * 900000))
  const [snapshot, setSnapshot] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const lines = cart.map((i) => ({ ...i, product: products.find((p) => p.id === i.id) })).filter((l) => l.product)
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0)
  const shipping = subtotal === 0 || subtotal >= 5000 ? 0 : 199
  const total = subtotal + shipping

  const place = (e) => {
    e.preventDefault()
    setSnapshot({ total, count: lines.reduce((s, l) => s + l.qty, 0) })
    clearCart()
    setStep(2)
  }

  if (lines.length === 0 && step !== 2) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="Nothing to check out" image={PHOTOS.walletTan} />
        <div className="container-x py-20 text-center"><Link to="/shop" className="btn-primary">Browse collection</Link></div>
      </>
    )
  }

  return (
    <>
      <PageHeader eyebrow="Secure" title="Checkout" image={PHOTOS.walletBlack} />
      <section className="container-x py-14">
        <ol className="mx-auto mb-14 flex max-w-xl items-center">
          {steps.map((s, i) => (
            <li key={s} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-2">
                <motion.div animate={{ scale: i === step ? 1.15 : 1 }} className={`grid h-11 w-11 place-items-center rounded-full text-sm font-semibold transition-colors ${i <= step ? 'bg-espresso text-gold' : 'bg-sand text-leather/50'}`}>
                  {i < step ? <Check size={18} /> : i + 1}
                </motion.div>
                <span className="text-xs uppercase tracking-widest">{s}</span>
              </div>
              {i < steps.length - 1 && <div className="mx-3 mb-6 h-px flex-1 bg-tan/40"><motion.div className="h-full bg-saddle" animate={{ width: i < step ? '100%' : '0%' }} transition={{ duration: 0.6 }} /></div>}
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.form key="s0" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} onSubmit={(e) => { e.preventDefault(); setStep(1) }} className="grid gap-12 lg:grid-cols-[1fr_380px]">
              <div className="space-y-5">
                <h2 className="font-display text-3xl">Shipping details</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <input required placeholder="Full name" className="input" value={form.name} onChange={set('name')} />
                  <input required type="email" placeholder="Email" className="input" value={form.email} onChange={set('email')} />
                  <input required placeholder="Phone" className="input sm:col-span-2" value={form.phone} onChange={set('phone')} />
                  <input required placeholder="Address" className="input sm:col-span-2" value={form.address} onChange={set('address')} />
                  <input required placeholder="City" className="input" value={form.city} onChange={set('city')} />
                  <input required placeholder="PIN code" className="input" value={form.pin} onChange={set('pin')} />
                </div>
                <button className="btn-primary">Continue to payment</button>
              </div>
              <Summary lines={lines} subtotal={subtotal} shipping={shipping} total={total} />
            </motion.form>
          )}

          {step === 1 && (
            <motion.form key="s1" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} onSubmit={place} className="grid gap-12 lg:grid-cols-[1fr_380px]">
              <div className="space-y-5">
                <h2 className="font-display text-3xl">Payment method</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[['upi', Smartphone, 'UPI'], ['card', CreditCard, 'Credit / Debit card'], ['net', Landmark, 'Net banking'], ['cod', Wallet, 'Cash on delivery']].map(([k, Icon, l]) => (
                    <button type="button" key={k} onClick={() => setPay(k)} className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition ${pay === k ? 'border-saddle bg-sand' : 'border-tan/30 hover:border-tan'}`}>
                      <Icon className="text-saddle" /><span className="font-medium">{l}</span>
                      {pay === k && <Check size={18} className="ml-auto text-saddle" />}
                    </button>
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div key={pay} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid gap-4 sm:grid-cols-2">
                    {pay === 'upi' && <input required placeholder="yourname@upi" className="input sm:col-span-2" />}
                    {pay === 'card' && (<>
                      <input required placeholder="Card number" inputMode="numeric" className="input sm:col-span-2" />
                      <input required placeholder="MM / YY" className="input" />
                      <input required placeholder="CVV" className="input" />
                    </>)}
                    {pay === 'net' && <select className="input sm:col-span-2"><option>HDFC Bank</option><option>ICICI Bank</option><option>SBI</option><option>Axis Bank</option></select>}
                    {pay === 'cod' && <p className="text-sm text-leather/70 sm:col-span-2">Pay in cash when your order arrives. A ₹50 handling fee may apply.</p>}
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs text-leather/50">This is a demo storefront. No real payment is processed.</p>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setStep(0)} className="btn-outline">Back</button>
                  <button className="btn-primary">Place order · {formatPrice(total)}</button>
                </div>
              </div>
              <Summary lines={lines} subtotal={subtotal} shipping={shipping} total={total} />
            </motion.form>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto max-w-lg py-10 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2, stiffness: 200 }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-gold">
                <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}><Check size={48} className="text-espresso" strokeWidth={3} /></motion.div>
              </motion.div>
              <h2 className="mt-8 font-display text-5xl">Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}!</h2>
              <p className="mt-4 text-leather/70">Your order <b className="text-espresso">{orderNo}</b> is confirmed{snapshot ? ` — ${snapshot.count} item${snapshot.count > 1 ? 's' : ''}, ${formatPrice(snapshot.total)}` : ''}. We’ll email you tracking details shortly.</p>
              <Link to="/shop" className="btn-primary mt-8">Continue shopping</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}

function Summary({ lines, subtotal, shipping, total }) {
  return (
    <aside className="h-fit rounded-3xl bg-espresso p-8 text-cream lg:sticky lg:top-28">
      <h3 className="font-display text-2xl">Your order</h3>
      <ul className="mt-5 space-y-3 text-sm">
        {lines.map((l) => <li key={l.key} className="flex justify-between gap-3"><span className="text-cream/80">{l.product.name} × {l.qty}</span><span>{formatPrice(l.product.price * l.qty)}</span></li>)}
      </ul>
      <dl className="mt-6 space-y-3 border-t border-cream/15 pt-5 text-sm">
        <div className="flex justify-between"><dt className="text-cream/70">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div className="flex justify-between"><dt className="text-cream/70">Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
        <div className="flex justify-between pt-2 text-lg"><dt>Total</dt><dd className="font-semibold text-gold">{formatPrice(total)}</dd></div>
      </dl>
    </aside>
  )
}
