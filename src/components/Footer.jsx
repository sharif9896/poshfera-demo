import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Footer() {
  const [email, setEmail] = useState('')
  const { notify } = useStore()
  const subscribe = (e) => {
    e.preventDefault()
    if (!email) return
    notify('Welcome to the Poshfera circle ✨')
    setEmail('')
  }
  return (
    <footer className="leather-grain relative mt-24 overflow-hidden bg-espresso text-cream">
      <div className="container-x grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <h3 className="font-display text-3xl">POSHFERA<span className="text-gold">.</span></h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
            Handcrafted leather goods made from full-grain hides. Designed to age beautifully and last a lifetime.
          </p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:-translate-y-1 hover:bg-gold hover:text-espresso">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-gold">Shop</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            {[['Handbags', 'handbags'], ['Totes & Crossbody', 'totes'], ['Backpacks & Travel', 'travel'], ['Wallets', 'wallets'], ['Jackets', 'jackets']].map(([n, c]) => (
              <li key={c}><Link className="transition hover:pl-2 hover:text-gold" to={`/shop?category=${c}`}>{n}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-gold">Company</h4>
          <ul className="space-y-3 text-sm text-cream/70">
            {[['Our Story', '/about'], ['Contact', '/contact'], ['Wishlist', '/wishlist'], ['Sign in', '/login']].map(([n, to]) => (
              <li key={to}><Link className="transition hover:pl-2 hover:text-gold" to={to}>{n}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-5 text-xs uppercase tracking-[0.3em] text-gold">Join the circle</h4>
          <p className="mb-4 text-sm text-cream/60">New drops, care tips and 10% off your first order.</p>
          <form onSubmit={subscribe} className="flex overflow-hidden rounded-full border border-cream/20 focus-within:border-gold">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="w-full bg-transparent px-5 py-3 text-sm outline-none placeholder:text-cream/40" />
            <button className="grid w-14 place-items-center bg-gold text-espresso transition hover:bg-cream" aria-label="Subscribe"><ArrowRight size={18} /></button>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10 py-6 text-center text-xs tracking-widest text-cream/40">
        © {new Date().getFullYear()} POSHFERA LEATHERS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  )
}
