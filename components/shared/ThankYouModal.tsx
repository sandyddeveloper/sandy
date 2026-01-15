"use client"

import { CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export default function ThankYouModal({
  open,
  onClose,
  isDark = true
}: {
  open: boolean
  onClose: () => void
  isDark?: boolean
}) {
  const [mountedIsDark, setMountedIsDark] = useState(isDark)

  useEffect(() => {
    // Check initial theme if isDark prop is not provided
    if (isDark === undefined) {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setMountedIsDark(isDarkMode)
    } else {
      setMountedIsDark(isDark)
    }
    
    // Listen for theme changes if isDark prop is not provided
    if (isDark === undefined) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isDarkMode = document.documentElement.classList.contains('dark')
            setMountedIsDark(isDarkMode)
          }
        })
      })
      
      observer.observe(document.documentElement, { attributes: true })
      return () => observer.disconnect()
    }
  }, [isDark])

  // Theme-based styles
  const getModalBackground = () => {
    return mountedIsDark
      ? "bg-black/70"
      : "bg-black/40"
  }

  const getModalCardBackground = () => {
    return mountedIsDark
      ? "bg-[#041b13] border border-emerald-500/20"
      : "bg-white border border-emerald-500/30"
  }

  const getIconColor = () => {
    return mountedIsDark
      ? "text-emerald-400"
      : "text-emerald-600"
  }

  const getTitleColor = () => {
    return mountedIsDark
      ? "text-white"
      : "text-gray-900"
  }

  const getDescriptionColor = () => {
    return mountedIsDark
      ? "text-gray-400"
      : "text-gray-600"
  }

  const getButtonStyle = () => {
    return mountedIsDark
      ? "!bg-emerald-500 text-black hover:!bg-emerald-400"
      : "!bg-emerald-600 text-white hover:!bg-emerald-700"
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${getModalBackground()}`}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl p-8 max-w-sm w-full text-center ${getModalCardBackground()}`}
          >
            <CheckCircle className={`w-10 h-10 mx-auto ${getIconColor()}`} />

            <h3 className={`text-xl font-semibold mt-4 ${getTitleColor()}`}>
              Thank You!
            </h3>

            <p className={`text-sm mt-2 ${getDescriptionColor()}`}>
              Your message has been sent successfully.  
              I'll get back to you soon.
            </p>

            <button
              onClick={onClose}
              className={`mt-6 px-6 py-2 rounded-lg font-medium transition ${getButtonStyle()}`}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}