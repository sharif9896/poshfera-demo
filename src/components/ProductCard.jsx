import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import SafeImg from './SafeImg'
import { img, formatPrice } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart, toggleWishlist, wishlist } = useStore()
  const [hover, setHover] = useState(false)
  const liked = wishlist.includes(product.id)
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-sand shadow-sm transition-shadow duration-500 group-hover:shadow-2xl group-hover:shadow-saddle/20">
          <div className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-110">
            <SafeImg src={img(product.images[0], 700)} alt={product.name} />
          </div>
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: hover ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <SafeImg src={img(product.images[1], 700)} alt={`${product.name} alternate view`} />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.badge && (
              <span className="rounded-full bg-espresso px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-gold">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="rounded-full bg-gold px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-espresso">
                -{discount}%
              </span>
            )}
          </div>
        </div>
      </Link>

      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={() => toggleWishlist(product)}
        aria-label="Toggle wishlist"
        className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 shadow-md backdrop-blur transition hover:scale-110"
      >
        <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-espresso'} />
      </motion.button>

      <button
        onClick={() => addToCart(product)}
        className="absolute inset-x-3 top-[calc(100%-8.5rem)] z-10 flex translate-y-4 items-center justify-center gap-2 rounded-full bg-cream/95 py-3 text-xs font-semibold uppercase tracking-widest text-espresso opacity-0 shadow-lg backdrop-blur transition-all duration-500 hover:bg-espresso hover:text-cream group-hover:translate-y-0 group-hover:opacity-100"
      >
        <ShoppingBag size={15} /> Quick add
      </button>

      <div className="mt-4 space-y-1.5 px-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.25em] text-saddle">{product.category}</p>
          <div className="flex items-center gap-1 text-xs text-leather">
            <Star size={12} className="fill-gold text-gold" /> {product.rating}
            <span className="text-leather/50">({product.reviews})</span>
          </div>
        </div>
        <Link to={`/product/${product.id}`} className="block font-display text-lg leading-snug transition-colors hover:text-saddle">
          {product.name}
        </Link>
        <div className="flex items-center gap-3">
          <span className="font-semibold">{formatPrice(product.price)}</span>
          {product.oldPrice && <span className="text-sm text-leather/50 line-through">{formatPrice(product.oldPrice)}</span>}
          <div className="ml-auto flex gap-1">
            {product.colors.map((c) => (
              <span key={c} className="h-3.5 w-3.5 rounded-full border border-espresso/20" style={{ background: c }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
