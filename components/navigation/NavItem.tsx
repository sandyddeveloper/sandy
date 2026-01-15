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
  darkColor?: string
  isActive?: boolean 
  onHover?: (label: string | null) => void
  isDark?: boolean
}

const underlineVariants = {
  hover: { scaleX: 1 },
  initial: { scaleX: 0 }
}

const dotVariants = {
  hover: { scale: 1 },
  initial: { scale: 0 }
}

const NavItem = memo(({ 
  label, 
  href, 
  icon: Icon, 
  color, 
  darkColor, 
  isActive, 
  onHover, 
  isDark = false 
}: Props) => {
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
  const currentColor = isDark && darkColor ? darkColor : color

  // Get gradient colors for different effects
  const getGradientColor = () => {
    return currentColor
  }

  const getBorderColor = () => {
    if (isHovered) {
      return isDark 
        ? 'border-white/30' 
        : 'border-gray-800/30'
    }
    return 'border-transparent'
  }

  const getTextColor = () => {
    return isDark 
      ? 'text-gray-200' 
      : 'text-gray-800'
  }

  const getDotColor = () => {
    return isDark 
      ? 'bg-white' 
      : 'bg-gray-800'
  }

  const getUnderlineColor = () => {
    return isDark 
      ? 'bg-gradient-to-r from-transparent via-white/80 to-transparent' 
      : 'bg-gradient-to-r from-transparent via-gray-800/80 to-transparent'
  }

  const getGlassBackground = () => {
    if (isHovered) {
      return isDark
        ? 'bg-white/5'
        : 'bg-gray-100'
    }
    return 'transparent'
  }

  return (
    <motion.div
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Tooltip text={`Navigate to ${label}`} delay={0.3} />

      <a
        href={href}
        className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl group transition-colors duration-300 ${getGlassBackground()}`}
        aria-label={label}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        {/* Gradient Background on Hover */}
        <div 
          className={`absolute inset-0 ${getGradientColor()} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
          aria-hidden="true"
        />
        
        {/* Border */}
        <div className={`absolute inset-0 border rounded-xl transition-colors duration-300 ${getBorderColor()}`} 
          aria-hidden="true"
        />

        {/* Icon with Gradient */}
        <div className={`relative p-1.5 rounded-lg bg-gradient-to-br ${getGradientColor()}`} aria-hidden="true">
          <Icon size={18} className="text-white" />
        </div>

        {/* Label with Underline Animation */}
        <span className={`text-sm font-medium relative min-w-[4rem] ${getTextColor()}`}>
          {label}
          <motion.span
            className={`absolute left-0 right-0 -bottom-0.5 h-0.5 ${getUnderlineColor()}`}
            variants={underlineVariants}
            animate={isHovered ? "hover" : "initial"}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          />
        </span>

        {/* Dot Indicator */}
        <motion.div
          className={`w-1.5 h-1.5 rounded-full ${getDotColor()}`}
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