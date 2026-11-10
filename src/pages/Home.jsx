import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ArrowRight, Award, Leaf, RotateCcw, Truck, Quote, Star } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import ProductCarousel from '../components/ProductCarousel'
import ProductCard from '../components/ProductCard'
import Reveal from '../components/Reveal'
import SafeImg from '../components/SafeImg'
import { categories, products, testimonials, img, PHOTOS } from '../data/products'

function SectionTitle({ eyebrow, title, link }) {
  return (
    <div className="container-x mb-10 flex flex-wrap items-end justify-between gap-4">
      <Reveal>
        <p className="eyebrow mb-3">{eyebrow}</p>
        <h2 className="font-display text-4xl font-semibold md:text-5xl">{title}</h2>
      </Reveal>
      {link && (
        <Reveal x={30} y={0}>
          <Link to={link.to} className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-saddle">
            {link.label} <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
          </Link>
        </Reveal>
      )}
    </div>
  )
}

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (t) => {
        const p = Math.min((t - start) / 1600, 1)
        setN(Math.floor((1 - Math.pow(1 - p, 3)) * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{n.toLocaleString('en-IN')}{suffix}</span>
}

export default function Home() {
  const featured = products.filter((p) => p.badge === 'Bestseller' || p.badge === 'New')
  const newArrivals = products.slice().reverse()
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const [tIndex, setTIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <HeroSlider />

      {/* USP strip */}
      <section className="border-b border-tan/30 bg-sand/60">
        <div className="container-x grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            [Award, 'Full-grain leather', 'Ethically sourced hides'],
            [Truck, 'Free shipping', 'On orders over ₹5,000'],
            [RotateCcw, '30-day returns', 'No questions asked'],
            [Leaf, 'Lifetime repairs', 'Stitching guaranteed'],
          ].map(([Icon, t, s], i) => (
            <Reveal key={t} delay={i * 0.1} y={20}>
              <div className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-espresso text-gold transition-transform hover:rotate-12"><Icon size={20} /></div>
                <div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-leather/60">{s}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <SectionTitle eyebrow="Collections" title="Shop by category" />
        <div className="container-x grid gap-5 md:grid-cols-6">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08} className={i < 2 ? 'md:col-span-3' : 'md:col-span-2'}>
              <Link to={`/shop?category=${c.id}`} className={`group relative block overflow-hidden rounded-3xl ${i < 2 ? 'aspect-[16/10]' : 'aspect-[4/5]'}`}>
                <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out group-hover:scale-110"><SafeImg src={img(c.image, 1000)} alt={c.name} /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent transition-opacity group-hover:from-espresso/90" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold">{c.blurb}</p>
                  <div className="mt-1 flex items-center justify-between">
                    <h3 className="font-display text-2xl md:text-3xl">{c.name}</h3>
                    <span className="grid h-10 w-10 -translate-x-3 place-items-center rounded-full bg-gold text-espresso opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"><ArrowRight size={18} /></span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Auto carousel: bestsellers */}
      <section className="overflow-hidden pb-24">
        <SectionTitle eyebrow="Customer favourites" title="Bestsellers & new arrivals" link={{ to: '/shop', label: 'View all' }} />
        <ProductCarousel items={featured} />
      </section>

      {/* Parallax banner */}
      <section ref={parallaxRef} className="relative flex h-[75vh] min-h-[480px] items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-[-15%]">
          <SafeImg src={img(PHOTOS.manJacketBW, 1800)} alt="" className="object-top" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/60 to-espresso/20" />
        <div className="container-x relative z-10 text-cream">
          <Reveal><p className="eyebrow mb-4 text-gold">The Vanguard Biker</p></Reveal>
          <Reveal delay={0.1}><h2 className="max-w-xl font-display text-5xl font-semibold leading-tight md:text-7xl">Wear it once.<br />Own it forever.</h2></Reveal>
          <Reveal delay={0.2}><p className="mt-5 max-w-md text-cream/75">Premium lambskin that moulds to you and tells your story with every year.</p></Reveal>
          <Reveal delay={0.3}><Link to="/product/10" className="btn-gold mt-8">Discover the jacket <ArrowRight size={16} /></Link></Reveal>
        </div>
      </section>

      {/* New arrivals grid */}
      <section className="py-24">
        <SectionTitle eyebrow="Just landed" title="The new edit" link={{ to: '/shop', label: 'Shop everything' }} />
        <div className="container-x grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {newArrivals.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Craft split */}
      <section className="bg-espresso py-24 text-cream">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal x={-50} y={0} className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-[2rem]"><SafeImg src={img(PHOTOS.modelHoldingBag, 1000)} alt="Model holding a leather handbag" /></div>
            <motion.div animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-8 -right-4 hidden w-56 rounded-2xl bg-gold p-6 text-espresso shadow-2xl md:block">
              <p className="font-display text-5xl"><Counter to={25} suffix="+" /></p>
              <p className="text-sm font-medium">hours of hand-work in every bag</p>
            </motion.div>
          </Reveal>
          <div>
            <Reveal><p className="eyebrow mb-4 text-gold">Our craft</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-4xl font-semibold leading-tight md:text-6xl">Made slowly,<br />made to last.</h2></Reveal>
            <Reveal delay={0.2}><p className="mt-6 leading-relaxed text-cream/70">Every Poshfera piece begins with a single hide, vegetable-tanned for weeks and cut by hand. Our artisans saddle-stitch each seam so it will never unravel, then burnish every edge until it glows.</p></Reveal>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {[[12000, '+', 'Happy customers'], [38, '', 'Master artisans'], [100, '%', 'Full-grain leather']].map(([n, s, l], i) => (
                <Reveal key={l} delay={0.2 + i * 0.1}>
                  <p className="font-display text-4xl text-gold md:text-5xl"><Counter to={n} suffix={s} /></p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-cream/60">{l}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.5}><Link to="/about" className="btn-gold mt-10">Read our story <ArrowRight size={16} /></Link></Reveal>
          </div>
        </div>
      </section>

      {/* Second auto carousel: all products reverse */}
      <section className="overflow-hidden py-24">
        <SectionTitle eyebrow="Complete range" title="Explore the collection" />
        <ProductCarousel items={products.slice(6)} speed={0.9} />
      </section>

      {/* Testimonials */}
      <section className="bg-sand/60 py-24">
        <div className="container-x">
          <div className="mb-12 text-center">
            <Reveal><p className="eyebrow mb-3">Loved worldwide</p></Reveal>
            <Reveal delay={0.1}><h2 className="font-display text-4xl font-semibold md:text-5xl">Words from our customers</h2></Reveal>
          </div>
          <div className="relative mx-auto max-w-3xl">
            <Quote className="absolute -top-6 left-0 text-gold/40" size={64} />
            <div className="relative h-72 sm:h-60">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={false}
                  animate={{ opacity: i === tIndex ? 1 : 0, y: i === tIndex ? 0 : 30, pointerEvents: i === tIndex ? 'auto' : 'none' }}
                  transition={{ duration: 0.7 }}
                  className="absolute inset-0 text-center"
                >
                  <div className="mb-4 flex justify-center gap-1">{Array.from({ length: 5 }).map((_, k) => <Star key={k} size={18} className="fill-gold text-gold" />)}</div>
                  <p className="font-display text-2xl italic leading-relaxed sm:text-3xl">“{t.text}”</p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <div className="h-12 w-12 overflow-hidden rounded-full"><SafeImg src={img(t.image, 120)} alt={t.name} /></div>
                    <div className="text-left"><p className="text-sm font-semibold">{t.name}</p><p className="text-xs text-leather/60">{t.city}</p></div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setTIndex(i)} aria-label={`Testimonial ${i + 1}`} className={`h-2 rounded-full transition-all duration-500 ${i === tIndex ? 'w-8 bg-saddle' : 'w-2 bg-tan/60'}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden bg-gold py-5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl text-espresso">
          {Array.from({ length: 12 }).map((_, i) => <span key={i}>Handcrafted ✦ Full-grain ✦ Timeless ✦</span>)}
        </div>
      </div>
    </>
  )
}
