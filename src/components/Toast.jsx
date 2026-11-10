import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { useStore } from '../context/StoreContext'

export default function Toast() {
  const { toast } = useStore()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 22, stiffness: 300 }}
            className="flex items-center gap-3 rounded-full bg-espresso px-6 py-3.5 text-sm text-cream shadow-2xl"
          >
            <CheckCircle2 size={18} className="text-gold" /> {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
