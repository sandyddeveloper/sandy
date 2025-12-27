'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface TooltipProps {
  text: string
  children?: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export default function Tooltip({ text, children, position = 'top', delay = 0.5 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: '-top-2 left-1/2 -translate-x-1/2 -translate-y-full',
    bottom: '-bottom-2 left-1/2 -translate-x-1/2 translate-y-full',
    left: '-left-2 top-1/2 -translate-x-full -translate-y-1/2',
    right: '-right-2 top-1/2 translate-x-full -translate-y-1/2',
  }

  const arrowClasses = {
    top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2',
    bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
    left: 'right-0 top-1/2 translate-x-1/2 -translate-y-1/2',
    right: 'left-0 top-1/2 -translate-x-1/2 -translate-y-1/2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, delay }}
            className={`absolute ${positions[position]} z-50`}
          >
            {/* Tooltip content */}
            <div className="relative">
              {/* Main tooltip */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-lg px-3 py-2 shadow-2xl shadow-black/50">
                <span className="text-xs font-medium text-white whitespace-nowrap">
                  {text}
                </span>
              </div>
              
              {/* Arrow */}
              <div className={`absolute ${arrowClasses[position]}`}>
                <div className="w-2 h-2 bg-gray-900 border-l border-t border-white/10 rotate-45" />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-md -z-10" />
            </div>
            
            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${20 + i * 30}%`,
                  top: '50%',
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}