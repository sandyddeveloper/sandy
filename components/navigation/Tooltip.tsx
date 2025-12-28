'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState, useCallback, memo, useId } from 'react'

interface TooltipProps {
  text: string
  children?: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

// Predefined positions for better performance
const POSITIONS = {
  top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
  bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
  left: '-left-2 top-1/2 -translate-x-full -translate-y-1/2',
  right: '-right-2 top-1/2 translate-x-full -translate-y-1/2',
}

const ARROW_CLASSES = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
  left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
  right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
}

// Animation variants for better performance
const tooltipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.8 }
}

const particleVariants = (index: number) => ({
  animate: {
    y: [-5, 5, -5],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      delay: index * 0.3,
    }
  }
})

const Tooltip = memo(({ text, children, position = 'top', delay = 0.5 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipId = useId()
  
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  
  // Use event listeners for keyboard navigation
  const handleFocus = useCallback(() => setIsVisible(true), [])
  const handleBlur = useCallback(() => setIsVisible(false), [])

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tooltipVariants}
            transition={{ duration: 0.2, delay }}
            className={`absolute ${POSITIONS[position]} z-50`}
            aria-live="polite"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg px-3 py-2 shadow-2xl shadow-black/50">
                <span className="text-xs font-medium text-white whitespace-nowrap">
                  {text}
                </span>
              </div>
              
              <div className={`absolute ${ARROW_CLASSES[position]}`} aria-hidden="true">
                <div className="w-2 h-2 bg-gray-900 border-l border-t border-white/10 rotate-45" />
              </div>
              
              {/* Replace glow with static version - same appearance, less GPU load */}
              <div className="absolute inset-0 rounded-lg -z-10 opacity-30" 
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)',
                  filter: 'blur(8px)'
                }}
              />
            </div>
            
            {/* Reduce particle count and optimize */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                variants={particleVariants(i)}
                animate="animate"
                style={{
                  left: `${30 + i * 40}%`,
                  top: '50%',
                }}
                aria-hidden="true"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

Tooltip.displayName = 'Tooltip'
export default Tooltip