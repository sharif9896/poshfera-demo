import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { heroSlides, img } from '../data/products'

const INTERVAL = 5500

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progressKey, setProgressKey] = useState(0)
  const timer = useRef(null)

  const go = useCallback((next) => {
    setIndex((i) => (next + heroSlides.length) % heroSlides.length)
    setProgressKey((k) => k + 1)
  }, [])

  useEffect(() => {
    if (paused) return
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
      setProgressKey((k) => k + 1)
    }, INTERVAL)
    return () => clearInterval(timer.current)
  }, [paused])

  const slide = heroSlides[index]

  return (
    <section
      className="relative h-[92vh] min-h-[600px] w-full overflow-hidden bg-espresso"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <img
            src={img(slide.image, 1800)}
            alt=""
            className="h-full w-full animate-kenburns object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-espresso/85 via-espresso/45 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/20" />

      <div className="container-x relative z-10 flex h-full items-center">
        <div className="max-w-2xl text-cream">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{ show: { transition: { staggerChildren: 0.14 } }, exit: { transition: { staggerChildren: 0.05 } } }}
            >
              <motion.p
                variants={{ hidden: { opacity: 0, x: -30 }, show: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -20 } }}
                className="mb-5 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.4em] text-gold"
              >
                <span className="h-px w-12 bg-gold" /> {slide.eyebrow}
              </motion.p>
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 50 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -30 } }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-pre-line font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-8xl"
              >
                {slide.title}
              </motion.h1>
              <motion.p
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0 } }}
                className="mt-6 max-w-md text-base text-cream/80 sm:text-lg"
              >
                {slide.text}
              </motion.p>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 }, exit: { opacity: 0 } }}
                className="mt-9 flex flex-wrap gap-4"
              >
                <Link to={slide.cta.to} className="btn-gold group">
                  {slide.cta.label}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/shop" className="inline-flex items-center rounded-full border border-cream/50 px-8 py-3.5 text-sm font-medium tracking-wide text-cream transition hover:bg-cream hover:text-espresso">
                  View All
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/30 bg-espresso/30 text-cream backdrop-blur transition hover:bg-cream hover:text-espresso md:grid"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-cream/30 bg-espresso/30 text-cream backdrop-blur transition hover:bg-cream hover:text-espresso md:grid"
      >
        <ChevronRight />
      </button>

      {/* Indicators with progress */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-1 w-14 overflow-hidden rounded-full bg-cream/30"
          >
            {i === index && (
              <motion.span
                key={progressKey}
                className="absolute inset-y-0 left-0 bg-gold"
                initial={{ width: '0%' }}
                animate={{ width: paused ? undefined : '100%' }}
                transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
              />
            )}
            {i < index && <span className="absolute inset-0 bg-gold/70" />}
          </button>
        ))}
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden font-display text-cream/80 md:block">
        <span className="text-3xl text-gold">0{index + 1}</span>
        <span className="mx-1 text-cream/40">/</span>
        <span>0{heroSlides.length}</span>
      </div>
    </section>
  )
}
