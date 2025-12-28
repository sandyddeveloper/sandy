// hooks/useMobileOptimization.ts
import { useState, useEffect } from 'react'

export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false)
  const [isResizing, setIsResizing] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let resizeTimer: NodeJS.Timeout
    let lastWidth = window.innerWidth

    const handleResize = () => {
      const currentWidth = window.innerWidth
      const widthChanged = Math.abs(currentWidth - lastWidth) > 50
      
      if (widthChanged) {
        setIsResizing(true)
        
        // Clear existing timer
        if (resizeTimer) clearTimeout(resizeTimer)
        
        // Fast detection for mobile
        setIsMobile(currentWidth < 768)
        
        // Reset resizing flag quickly
        resizeTimer = setTimeout(() => {
          setIsResizing(false)
        }, 100)
        
        lastWidth = currentWidth
      }
    }

    // Initial check
    setIsMobile(window.innerWidth < 768)
    
    // Use passive event listener for better performance
    window.addEventListener('resize', handleResize, { passive: true })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeTimer) clearTimeout(resizeTimer)
    }
  }, [])

  return { isMobile, isResizing }
}