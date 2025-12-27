"use client"

import { CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ThankYouModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-[#041b13] border border-emerald-500/20 rounded-2xl p-8 max-w-sm w-full text-center"
          >
            <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />

            <h3 className="text-xl font-semibold text-white mt-4">
              Thank You!
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              Your message has been sent successfully.  
              I’ll get back to you soon.
            </p>

            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-emerald-500 text-black rounded-lg font-medium hover:bg-emerald-400 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
