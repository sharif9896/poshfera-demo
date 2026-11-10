import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut } from 'lucide-react'
import SafeImg from '../components/SafeImg'
import { img, PHOTOS } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function Login() {
  const { user, setUser, notify } = useStore()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    // Demo only: stores a local profile. Connect a real auth API here.
    const name = form.name || form.email.split('@')[0]
    setUser({ name, email: form.email })
    notify(`Welcome, ${name}`)
    navigate('/')
  }

  return (
    <section className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <SafeImg src={img(PHOTOS.manJacketShades, 1400)} alt="" className="object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
        <div className="absolute bottom-16 left-12 right-12 text-cream">
          <p className="font-display text-5xl leading-tight">Join the<br />Poshfera circle.</p>
          <p className="mt-3 max-w-sm text-cream/70">Early access to drops, free repairs and 10% off your first order.</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 pb-16 pt-40">
        {user ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm text-center">
            <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-espresso font-display text-4xl text-gold">{user.name[0].toUpperCase()}</div>
            <h1 className="mt-6 font-display text-4xl">Hello, {user.name}</h1>
            <p className="mt-2 text-sm text-leather/60">{user.email}</p>
            <Link to="/shop" className="btn-primary mt-8 w-full">Continue shopping</Link>
            <button onClick={() => { setUser(null); notify('Signed out') }} className="btn-outline mt-3 w-full"><LogOut size={16} /> Sign out</button>
          </motion.div>
        ) : (
          <div className="w-full max-w-sm">
            <h1 className="font-display text-4xl">{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
            <p className="mt-2 text-sm text-leather/60">{mode === 'login' ? 'Sign in to continue.' : 'It takes less than a minute.'}</p>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <AnimatePresence initial={false}>
                {mode === 'register' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <input required placeholder="Full name" className="input" value={form.name} onChange={set('name')} />
                  </motion.div>
                )}
              </AnimatePresence>
              <input required type="email" placeholder="Email" className="input" value={form.email} onChange={set('email')} />
              <input required type="password" minLength={6} placeholder="Password (min 6 characters)" className="input" value={form.password} onChange={set('password')} />
              <button className="btn-primary w-full">{mode === 'login' ? 'Sign in' : 'Create account'}</button>
            </form>
            <p className="mt-6 text-center text-sm text-leather/70">
              {mode === 'login' ? 'New here?' : 'Already a member?'}{' '}
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="font-semibold text-saddle underline">{mode === 'login' ? 'Create an account' : 'Sign in'}</button>
            </p>
            <p className="mt-6 text-center text-xs text-leather/40">Demo sign-in: details are kept in your browser only.</p>
          </div>
        )}
      </div>
    </section>
  )
}
