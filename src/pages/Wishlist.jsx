import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { products, PHOTOS } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))
  return (
    <>
      <PageHeader eyebrow="Saved for later" title="Wishlist" image={PHOTOS.womanWhiteBag} />
      <section className="container-x py-16">
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="py-16 text-center">
            <motion.div animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 1.8 }} className="inline-block"><Heart size={64} className="text-tan" /></motion.div>
            <h2 className="mt-6 font-display text-4xl">Nothing saved yet</h2>
            <p className="mt-2 text-leather/60">Tap the heart on any piece to keep it here.</p>
            <Link to="/shop" className="btn-primary mt-8">Explore the collection</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </section>
    </>
  )
}
