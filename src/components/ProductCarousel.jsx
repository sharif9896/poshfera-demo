import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import ProductCard from './ProductCard'

// Auto-scrolling product carousel. Pauses on hover/touch, supports arrows and drag-scroll.
export default function ProductCarousel({ items, speed = 0.6 }) {
  const ref = useRef(null)
  const [paused, setPaused] = useState(false)
  const [userPaused, setUserPaused] = useState(false)
  const raf = useRef(0)
  const drag = useRef({ down: false, x: 0, left: 0 })

  // Triple the list so it can loop seamlessly
  const loop = [...items, ...items, ...items]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const third = () => el.scrollWidth / 3
    el.scrollLeft = third()
    const step = () => {
      if (!paused && !userPaused && !drag.current.down) {
        el.scrollLeft += speed
      }
      const w = third()
      if (el.scrollLeft >= w * 2) el.scrollLeft -= w
      if (el.scrollLeft <= 0) el.scrollLeft += w
      raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [paused, userPaused, speed, items.length])

  const scrollBy = (dir) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * (el.clientWidth * 0.7), behavior: 'smooth' })
  }

  const onDown = (e) => {
    drag.current = { down: true, x: e.pageX, left: ref.current.scrollLeft }
  }
  const onMove = (e) => {
    if (!drag.current.down) return
    ref.current.scrollLeft = drag.current.left - (e.pageX - drag.current.x)
  }
  const onUp = () => (drag.current.down = false)

  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => { setPaused(false); onUp() }}>
      <div className="mb-6 flex justify-end gap-3 container-x">
        <button
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? 'Play carousel' : 'Pause carousel'}
          className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 transition hover:bg-espresso hover:text-cream"
        >
          {userPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button onClick={() => scrollBy(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 transition hover:bg-espresso hover:text-cream">
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => scrollBy(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-espresso/20 transition hover:bg-espresso hover:text-cream">
          <ChevronRight size={18} />
        </button>
      </div>

      <div
        ref={ref}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        className="no-scrollbar flex cursor-grab gap-6 overflow-x-auto px-5 pb-6 active:cursor-grabbing"
      >
        {loop.map((p, i) => (
          <div key={`${p.id}-${i}`} className="w-[72vw] shrink-0 select-none sm:w-[44vw] md:w-[30vw] lg:w-[22vw] xl:w-[19vw]">
            <ProductCard product={p} index={0} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
    </div>
  )
}
