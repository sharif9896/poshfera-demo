import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { cartCount, wishlist, setCartOpen, user } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [offset, setOffset] = useState(32)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [q, setQ] = useState('')
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const heroPage = pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      // Announcement bar is 32px tall; the navbar follows it up and sticks to the top edge
      setOffset(Math.max(0, 32 - window.scrollY))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setSearchOpen(false)
  }, [pathname])

  const solid = scrolled || !heroPage
  const text = solid ? 'text-espresso' : 'text-cream'

  const submitSearch = (e) => {
    e.preventDefault()
    navigate(`/shop?q=${encodeURIComponent(q)}`)
    setQ('')
  }

  return (
    <>
      <div className="relative z-50 overflow-hidden bg-espresso py-2 text-[11px] uppercase tracking-[0.3em] text-gold">
        <div className="flex w-max animate-marquee gap-16 whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>Free shipping over ₹5,000 &nbsp;•&nbsp; Lifetime stitching guarantee &nbsp;•&nbsp; 30-day returns</span>
          ))}
        </div>
      </div>

      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ top: offset }}
        className={`fixed inset-x-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${solid ? 'bg-cream/90 shadow-md shadow-espresso/5 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-500 ${solid ? 'h-16' : 'h-20'}`}>
          <Link to="/" className={`font-display text-2xl font-semibold tracking-wide ${text}`}>
            POSHFERA<span className="text-gold">.</span>
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `group relative text-sm font-medium uppercase tracking-widest transition-colors ${text} ${isActive ? 'text-gold' : ''}`
                }
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>

          <div className={`flex items-center gap-1 sm:gap-3 ${text}`}>
            <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-gold/20">
              <Search size={19} />
            </button>
            <Link to="/login" aria-label="Account" className="hidden h-10 w-10 place-items-center rounded-full transition hover:bg-gold/20 sm:grid">
              {user ? <span className="grid h-7 w-7 place-items-center rounded-full bg-gold text-xs font-bold text-espresso">{user.name[0].toUpperCase()}</span> : <User size={19} />}
            </Link>
            <Link to="/wishlist" aria-label="Wishlist" className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-gold/20">
              <Heart size={19} />
              <AnimatePresence>
                {wishlist.length > 0 && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="absolute right-0 top-0 grid h-4 w-4 place-items-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
            <button onClick={() => setCartOpen(true)} aria-label="Open bag" className="relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-gold/20">
              <ShoppingBag size={19} />
              <AnimatePresence mode="popLayout">
                {cartCount > 0 && (
                  <motion.span key={cartCount} initial={{ scale: 0.3 }} animate={{ scale: 1 }} className="absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-gold px-1 text-[10px] font-bold text-espresso">
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button onClick={() => setOpen(true)} aria-label="Menu" className="grid h-10 w-10 place-items-center md:hidden">
              <Menu size={22} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.form
              onSubmit={submitSearch}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-tan/30 bg-cream"
            >
              <div className="container-x flex items-center gap-3 py-4">
                <Search size={18} className="text-saddle" />
                <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bags, wallets, jackets…" className="w-full bg-transparent text-lg outline-none placeholder:text-leather/40" />
                <button type="button" onClick={() => setSearchOpen(false)}><X size={18} /></button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-espresso/60 backdrop-blur-sm" />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="leather-grain fixed right-0 top-0 z-50 flex h-full w-4/5 max-w-sm flex-col bg-espresso p-8 text-cream"
            >
              <button onClick={() => setOpen(false)} className="mb-10 self-end"><X /></button>
              {[...links, { to: '/wishlist', label: 'Wishlist' }, { to: '/login', label: user ? 'Account' : 'Sign in' }].map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                  <Link to={l.to} className="block border-b border-cream/10 py-4 font-display text-3xl transition hover:pl-3 hover:text-gold">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
