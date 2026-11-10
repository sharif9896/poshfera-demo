import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { SlidersHorizontal, X } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ProductCard from '../components/ProductCard'
import { categories, products, formatPrice, PHOTOS } from '../data/products'

const sorts = [
  ['featured', 'Featured'],
  ['price-asc', 'Price: Low to High'],
  ['price-desc', 'Price: High to Low'],
  ['rating', 'Top Rated'],
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'
  const q = (params.get('q') || '').toLowerCase()
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(25000)
  const [showFilters, setShowFilters] = useState(false)

  const setCategory = (c) => {
    const next = new URLSearchParams(params)
    c === 'all' ? next.delete('category') : next.set('category', c)
    setParams(next)
  }

  const list = useMemo(() => {
    let l = products.filter((p) => (category === 'all' || p.category === category) && p.price <= maxPrice)
    if (q) l = l.filter((p) => (p.name + p.category + p.description).toLowerCase().includes(q))
    if (sort === 'price-asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'rating') l = [...l].sort((a, b) => b.rating - a.rating)
    return l
  }, [category, q, sort, maxPrice])

  const Filters = (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-saddle">Category</h4>
        <div className="space-y-1">
          {[{ id: 'all', name: 'All products' }, ...categories].map((c) => (
            <button key={c.id} onClick={() => setCategory(c.id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${category === c.id ? 'bg-espresso text-cream' : 'hover:bg-sand'}`}>
              {c.name}
              <span className="text-xs opacity-60">{c.id === 'all' ? products.length : products.filter((p) => p.category === c.id).length}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-4 text-xs uppercase tracking-[0.3em] text-saddle">Max price: {formatPrice(maxPrice)}</h4>
        <input type="range" min={1000} max={25000} step={500} value={maxPrice} onChange={(e) => setMaxPrice(+e.target.value)} className="w-full accent-saddle" />
        <div className="mt-1 flex justify-between text-xs text-leather/60"><span>₹1,000</span><span>₹25,000</span></div>
      </div>
    </div>
  )

  return (
    <>
      <PageHeader eyebrow="The collection" title="Shop all" text="Handcrafted bags, wallets and jackets in full-grain leather." image={PHOTOS.manJacketShades} />
      <section className="container-x py-14">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-tan/30 pb-6">
          <p className="text-sm text-leather/70">
            Showing <b className="text-espresso">{list.length}</b> products{q && <> for “{q}” <button onClick={() => { const n = new URLSearchParams(params); n.delete('q'); setParams(n) }} className="ml-2 inline-flex items-center gap-1 rounded-full bg-sand px-2 py-0.5 text-xs">clear <X size={11} /></button></>}
          </p>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowFilters(true)} className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-5 py-2.5 text-sm lg:hidden"><SlidersHorizontal size={15} /> Filters</button>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-espresso/20 bg-transparent px-5 py-2.5 text-sm outline-none focus:border-saddle">
              {sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[250px_1fr]">
          <aside className="hidden lg:block"><div className="sticky top-28">{Filters}</div></aside>

          <div>
            <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-10 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }}>
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            {list.length === 0 && (
              <div className="py-24 text-center">
                <p className="font-display text-3xl">Nothing matched</p>
                <p className="mt-2 text-leather/60">Try widening your filters.</p>
                <button className="btn-primary mt-6" onClick={() => { setParams({}); setMaxPrice(25000) }}>Reset filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 z-[60] bg-espresso/60" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }} className="fixed inset-x-0 bottom-0 z-[70] max-h-[85vh] overflow-y-auto rounded-t-3xl bg-cream p-6">
              <div className="mb-6 flex items-center justify-between"><h3 className="font-display text-2xl">Filters</h3><button onClick={() => setShowFilters(false)}><X /></button></div>
              {Filters}
              <button onClick={() => setShowFilters(false)} className="btn-primary mt-8 w-full">Show {list.length} results</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
