
"use client"

import { motion, AnimatePresence } from "framer-motion"

interface ViewModalProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  icon?: React.ReactNode
  tag?: string
}

export default function ViewModal({
  open,
  onClose,
  title,
  description,
  icon,
  tag,
}: ViewModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#041b13] border border-emerald-500/30 rounded-2xl p-8 max-w-md w-full"
          >
            <div className="flex items-center gap-4 mb-6">
              {icon && (
                <div className="p-3 bg-black/40 rounded-xl text-emerald-400">
                  {icon}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold">{title}</h3>
                {tag && (
                  <span className="text-xs text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-300">{description}</p>

            <button
              onClick={onClose}
              className="mt-6 w-full py-3 rounded-lg !bg-emerald-500 text-black font-semibold hover:!bg-emerald-400 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
