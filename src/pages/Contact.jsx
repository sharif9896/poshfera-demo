import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { PHOTOS } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function Contact() {
  const { notify } = useStore()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    notify('Message sent — we’ll reply within a day')
    setForm({ name: '', email: '', message: '' })
  }
  return (
    <>
      <PageHeader eyebrow="Say hello" title="Contact us" text="Questions about sizing, care or an order? We’re happy to help." image={PHOTOS.modelHoldingBag} />
      <section className="container-x grid gap-14 py-20 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-6">
          {[[MapPin, 'Studio', '12 Craftsmen Lane, Chennai 600001'], [Phone, 'Phone', '+91 98765 43210'], [Mail, 'Email', 'hello@poshferaleathers.com'], [Clock, 'Hours', 'Mon–Sat, 10am – 7pm']].map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.1} x={-30} y={0}>
              <div className="group flex items-center gap-5 rounded-2xl bg-sand/60 p-5 transition hover:bg-sand">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-espresso text-gold transition group-hover:scale-110"><Icon size={22} /></div>
                <div><p className="text-xs uppercase tracking-widest text-saddle">{t}</p><p className="font-medium">{d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal x={40} y={0}>
          <form onSubmit={submit} className="space-y-5 rounded-3xl bg-white/60 p-8 shadow-sm">
            <h2 className="font-display text-3xl">Send a message</h2>
            <input required placeholder="Your name" className="input" value={form.name} onChange={set('name')} />
            <input required type="email" placeholder="Email address" className="input" value={form.email} onChange={set('email')} />
            <textarea required rows={6} placeholder="How can we help?" className="input resize-none" value={form.message} onChange={set('message')} />
            <motion.button whileTap={{ scale: 0.97 }} className="btn-primary">Send message <Send size={16} /></motion.button>
          </form>
        </Reveal>
      </section>
    </>
  )
}
