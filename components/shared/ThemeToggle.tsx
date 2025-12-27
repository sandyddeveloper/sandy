// components/navigation/ThemeToggle.tsx
'use client'

import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const themes = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ]

  if (!mounted) return null

  return (
    <div className="relative flex items-center gap-2 p-2 rounded-2xl glass-effect border border-emerald-500/20">
      
      {/* Background Indicator (Django Green) */}
      <motion.div
        layoutId="theme-bg"
        className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-r from-emerald-500/30 via-green-500/30 to-lime-500/30
        "
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
            ${
              theme === value
                ? 'text-emerald-100'
                : 'text-emerald-400/70 hover:text-emerald-300'
            }
          `}
        >
          <Icon size={20} />

          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-emerald-900 text-emerald-100 text-xs py-1 px-3 rounded-lg whitespace-nowrap shadow-lg">
              {label} mode
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}
