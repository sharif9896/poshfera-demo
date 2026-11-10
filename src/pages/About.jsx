import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Hammer, Leaf, Sparkles } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import SafeImg from '../components/SafeImg'
import { img, PHOTOS } from '../data/products'

const timeline = [
  ['2012', 'A small workshop', 'Three artisans, one bench and a stack of vegetable-tanned hides.'],
  ['2016', 'The first collection', 'Our satchel sold out in nine days and the waitlist began.'],
  ['2020', 'Jackets join the line', 'Lambskin biker and bomber silhouettes, cut and stitched by hand.'],
  ['2026', 'Thirty-eight artisans', 'Still hand-finished. Still guaranteed for life.'],
]

export default function About() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="Crafted with patience" text="Leather goods made the slow way, for people who’d rather own less, but better." image={PHOTOS.manJacketForest} />

      <section className="container-x grid items-center gap-14 py-24 lg:grid-cols-2">
        <div>
          <Reveal><p className="eyebrow mb-4">Since 2012</p></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-4xl font-semibold leading-tight md:text-5xl">We believe a bag should get better with age.</h2></Reveal>
          <Reveal delay={0.2}><p className="mt-6 leading-relaxed text-leather/80">Poshfera started with a simple idea: make fewer things, make them properly, and stand behind them forever. We choose full-grain hides from tanneries that value traceability, and every seam is saddle-stitched with waxed thread.</p></Reveal>
          <Reveal delay={0.3}><p className="mt-4 leading-relaxed text-leather/80">The result is leather that softens, deepens and develops a patina unique to its owner. Nothing about it is rushed, and nothing is thrown away.</p></Reveal>
          <Reveal delay={0.4}><Link to="/shop" className="btn-primary mt-8">Shop the collection <ArrowRight size={16} /></Link></Reveal>
        </div>
        <Reveal x={50} y={0} className="relative">
          <div className="aspect-[4/5] overflow-hidden rounded-[2rem]"><SafeImg src={img(PHOTOS.womanHandbag, 1000)} alt="Model with a leather handbag" /></div>
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute -left-6 bottom-10 hidden h-40 w-32 overflow-hidden rounded-2xl border-4 border-cream shadow-2xl md:block"><SafeImg src={img(PHOTOS.walletBrown, 400)} alt="" /></motion.div>
        </Reveal>
      </section>

      <section className="bg-espresso py-24 text-cream">
        <div className="container-x">
          <Reveal><p className="eyebrow mb-3 text-gold">What we stand for</p><h2 className="font-display text-4xl font-semibold md:text-5xl">Three promises</h2></Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[[Hammer, 'Handmade', 'Every piece is cut, stitched and burnished by a named artisan.'], [Leaf, 'Responsible', 'Full-grain hides from audited tanneries. Vegetable tanning wherever possible.'], [Sparkles, 'Guaranteed', 'Free stitching repairs for life. If it fails, we fix it.']].map(([Icon, t, d], i) => (
              <Reveal key={t} delay={i * 0.12}>
                <div className="group h-full rounded-3xl border border-cream/10 bg-cream/5 p-8 transition duration-500 hover:-translate-y-2 hover:border-gold/50 hover:bg-cream/10">
                  <div className="mb-6 grid h-14 w-14 place-items-center rounded-full bg-gold text-espresso transition-transform duration-500 group-hover:rotate-[360deg]"><Icon /></div>
                  <h3 className="font-display text-2xl">{t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/70">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24">
        <Reveal><p className="eyebrow mb-3">Timeline</p><h2 className="font-display text-4xl font-semibold md:text-5xl">How we got here</h2></Reveal>
        <div className="relative mt-14 border-l-2 border-tan/40 pl-8 md:ml-10">
          {timeline.map(([y, t, d], i) => (
            <Reveal key={y} delay={i * 0.1} x={-30} y={0} className="relative pb-12 last:pb-0">
              <span className="absolute -left-[2.65rem] top-1 h-5 w-5 rounded-full border-4 border-cream bg-gold" />
              <p className="font-display text-3xl text-saddle">{y}</p>
              <h3 className="mt-1 text-lg font-semibold">{t}</h3>
              <p className="mt-1 max-w-lg text-leather/70">{d}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
