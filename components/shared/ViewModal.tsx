"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface ViewModalProps {
  open: boolean
  onClose: () => void
  title: string
  description: string
  icon?: React.ReactNode
  tag?: string
  isDark?: boolean
}

export default function ViewModal({
  open,
  onClose,
  title,
  description,
  icon,
  tag,
  isDark = true
}: ViewModalProps) {
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
  const getBackdropBackground = () => {
    return mountedIsDark
      ? "bg-black/70 backdrop-blur-md"
      : "bg-black/40 backdrop-blur-md"
  }

  const getModalBackground = () => {
    return mountedIsDark
      ? "bg-[#041b13] border border-emerald-500/30"
      : "bg-white border border-emerald-500/30"
  }

  const getIconContainerStyle = () => {
    return mountedIsDark
      ? "p-3 bg-black/40 rounded-xl text-emerald-400"
      : "p-3 bg-gray-100 rounded-xl text-emerald-600"
  }

  const getTitleColor = () => {
    return mountedIsDark ? "text-white" : "text-gray-900"
  }

  const getTagStyle = () => {
    return mountedIsDark
      ? "text-xs text-emerald-300 bg-emerald-500/20"
      : "text-xs text-emerald-700 bg-emerald-500/10"
  }

  const getDescriptionColor = () => {
    return mountedIsDark ? "text-gray-300" : "text-gray-700"
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
          onClick={onClose}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${getBackdropBackground()}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`rounded-2xl p-8 max-w-md w-full ${getModalBackground()}`}
          >
            <div className="flex items-center gap-4 mb-6">
              {icon && (
                <div className={`rounded-xl ${getIconContainerStyle()}`}>
                  {icon}
                </div>
              )}
              <div>
                <h3 className={`text-2xl font-bold ${getTitleColor()}`}>{title}</h3>
                {tag && (
                  <span className={`px-3 py-1 rounded-full ${getTagStyle()}`}>
                    {tag}
                  </span>
                )}
              </div>
            </div>

            <p className={getDescriptionColor()}>{description}</p>

            <button
              onClick={onClose}
              className={`mt-6 w-full py-3 rounded-lg font-semibold transition ${getButtonStyle()}`}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}