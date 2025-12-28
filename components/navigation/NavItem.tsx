'use client'

import { memo, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Tooltip from './Tooltip'
import { LucideIcon } from 'lucide-react'

interface Props {
  label: string
  href: string
  icon: LucideIcon
  color: string
  isActive?: boolean // Add this
  onHover?: (label: string | null) => void // Add this
}

// Pre-define animation variants for better performance
const underlineVariants = {
  hover: { scaleX: 1 },
  initial: { scaleX: 0 }
}

const dotVariants = {
  hover: { scale: 1 },
  initial: { scale: 0 }
}

const NavItem = memo(({ label, href, icon: Icon, color, isActive, onHover }: Props) => {
  const [hover, setHover] = useState(false)

  const handleHoverStart = useCallback(() => {
    setHover(true)
    if (onHover) onHover(label)
  }, [label, onHover])

  const handleHoverEnd = useCallback(() => {
    setHover(false)
    if (onHover) onHover(null)
  }, [onHover])

  const isHovered = hover || isActive

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ y: -2 }}
      className="relative"
    >
      <Tooltip text={`Navigate to ${label}`} delay={0.3} />

      <a
        href={href}
        className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl group"
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {/* Background effect - replace with CSS animation for better performance */}
        <div 
          className={`absolute inset-0 ${color} rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
          aria-hidden="true"
        />
        
        <div className={`absolute inset-0 border rounded-xl transition-colors duration-300 ${
          isHovered ? 'border-white/40' : 'border-transparent'
        }`} 
          aria-hidden="true"
        />

        {/* Icon container */}
        <div className={`relative p-1.5 rounded-lg bg-gradient-to-br ${color}`} aria-hidden="true">
          <Icon size={18} className="text-white" />
        </div>

        {/* Text with animated underline */}
        <span className="text-sm font-medium relative min-w-[4rem]">
          {label}
          <motion.span
            className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
            variants={underlineVariants}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          />
        </span>

        {/* Animated dot */}
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-white"
          variants={dotVariants}
          animate={isHovered ? "hover" : "initial"}
          aria-hidden="true"
        />
      </a>
    </motion.div>
  )
})

NavItem.displayName = 'NavItem'
export default NavItem