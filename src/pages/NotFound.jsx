import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <section className="leather-grain flex min-h-screen flex-col items-center justify-center bg-espresso px-6 text-center text-cream">
      <motion.p initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring' }} className="font-display text-[9rem] leading-none text-gold sm:text-[14rem]">404</motion.p>
      <h1 className="mt-4 font-display text-3xl">This page has worn away.</h1>
      <p className="mt-2 text-cream/60">Let’s get you back to something well made.</p>
      <Link to="/" className="btn-gold mt-8">Back home</Link>
    </section>
  )
}
