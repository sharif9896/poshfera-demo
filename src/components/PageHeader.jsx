import { motion } from 'framer-motion'
import { img } from '../data/products'

export default function PageHeader({ eyebrow, title, text, image }) {
  return (
    <section className="relative flex h-[46vh] min-h-[340px] items-end overflow-hidden bg-espresso pb-14 pt-32">
      {image && (
        <motion.img
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          src={img(image, 1600)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-50"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-espresso/30" />
      <div className="container-x relative z-10 text-cream">
        <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="mb-3 text-xs uppercase tracking-[0.4em] text-gold">{eyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-5xl font-semibold md:text-7xl">{title}</motion.h1>
        {text && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-4 max-w-xl text-cream/70">{text}</motion.p>}
      </div>
    </section>
  )
}
