// components/shared/ThemeToggle.tsx - UPDATED FOR MOBILE
'use client'

import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check initial theme
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    checkTheme()

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme()
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ]

  if (!mounted) return null

  // Theme-based styles
  const getContainerBackground = () => {
    return isDark
      ? "glass-effect border border-emerald-500/20"
      : "bg-white/80 backdrop-blur-sm border border-emerald-500/30"
  }

  const getIndicatorGradient = () => {
    return isDark
      ? "bg-gradient-to-r from-emerald-500/30 via-green-500/30 to-lime-500/30"
      : "bg-gradient-to-r from-emerald-500/20 via-green-500/20 to-lime-500/20"
  }

  const getMobileIndicatorGradient = () => {
    return isDark
      ? "bg-gradient-to-r from-emerald-500/40 to-green-500/40"
      : "bg-gradient-to-r from-emerald-500/30 to-green-500/30"
  }

  const getActiveIconColor = () => {
    return isDark ? "text-emerald-100" : "text-emerald-700"
  }

  const getInactiveIconColor = () => {
    return isDark ? "text-emerald-400/70 hover:text-emerald-300" : "text-emerald-500/70 hover:text-emerald-600"
  }

  const getTooltipBackground = () => {
    return isDark
      ? "bg-emerald-900 text-emerald-100"
      : "bg-emerald-100 text-emerald-900"
  }

  const getMobileLabelColor = () => {
    return isDark ? "text-emerald-400/70" : "text-emerald-600/70"
  }

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:block relative">
        <div className={`relative flex items-center gap-2 p-2 rounded-2xl ${getContainerBackground()}`}>

          {/* Background Indicator (Django Green) */}
          <motion.div
            layoutId="theme-bg"
            className={`absolute inset-0 rounded-2xl ${getIndicatorGradient()}`}
            style={{
              left: `${themes.findIndex(t => t.value === theme) * (100 / themes.length)}%`,
              width: `${100 / themes.length}%`,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />

          {themes.map(({ value, icon: Icon, label }) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTheme(value)}
              className={`
                relative z-10 p-3 rounded-xl transition-all
                ${theme === value
                  ? getActiveIconColor()
                  : getInactiveIconColor()
                }
              `}
              aria-label={`Set ${value} theme`}
            >
              <Icon size={20} />

              {/* Tooltip - Desktop only */}
              <div className="hidden lg:block absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                <div className={`text-xs py-1 px-3 rounded-lg whitespace-nowrap shadow-lg ${getTooltipBackground()}`}>
                  {label} mode
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

  
      <div className="md:hidden w-full">
        <div className="relative flex flex-col items-center justify-center">
          <div className={`flex items-center justify-center gap-1 p-1 rounded-xl ${getContainerBackground()} w-fit mx-auto`}>

            {/* Background Indicator - Mobile */}
            <motion.div
              layoutId="theme-bg-mobile"
              className={`absolute inset-0 rounded-xl ${getMobileIndicatorGradient()}`}
              style={{
                left: `${themes.findIndex(t => t.value === theme) * (100 / themes.length)}%`,
                width: `${100 / themes.length}%`,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            />

            {themes.map(({ value, icon: Icon }) => (
              <motion.button
                key={value}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTheme(value)}
                className={`
            relative z-10 p-2 rounded-lg transition-all
            ${theme === value
                    ? getActiveIconColor()
                    : getInactiveIconColor()
                  }
          `}
                aria-label={`Set ${value} theme`}
              >
                <Icon size={18} />
              </motion.button>
            ))}
          </div>

          {/* Current theme label for mobile - with better positioning */}
          <div className="mt-1.5">
            <span className={`text-xs font-medium ${getMobileLabelColor()}`}>
              {themes.find(t => t.value === theme)?.label} Mode
            </span>
          </div>
        </div>
      </div>
    </>
  )
}