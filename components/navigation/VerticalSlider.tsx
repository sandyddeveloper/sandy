"use client"

import { motion, useMotionValue } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useEffect, useState, useCallback, useMemo, useRef } from "react"

const SECTIONS = ["Hero", "Skills", "Work", "Projects", "Contact"]

const activeLabelVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 }
}

const handleVariants = {
  pulse: {
    scale: [1, 1.08, 1],
    transition: { duration: 2, repeat: Infinity }
  }
}

export default function VerticalSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  
  const HEIGHT = 160
  const ITEM_HEIGHT = HEIGHT / SECTIONS.length
  const y = useMotionValue(0)
  
  const sectionsArray = useMemo(() => SECTIONS, [])

  useEffect(() => {
    setHasMounted(true)
    
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

  const scrollToSection = useCallback((index: number) => {
    if (!hasMounted) return
    
    const clampedIndex = Math.max(0, Math.min(index, sectionsArray.length - 1))
    
    setActiveIndex(clampedIndex)
    y.set(clampedIndex * ITEM_HEIGHT)
    
    const sectionId = sectionsArray[clampedIndex].toLowerCase()
    const element = document.getElementById(sectionId)
    
    if (element) {
      requestAnimationFrame(() => {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      })
    }
  }, [sectionsArray, ITEM_HEIGHT, y, hasMounted])

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    const raw = y.get()
    const index = Math.round(raw / ITEM_HEIGHT)
    scrollToSection(index)
  }, [y, ITEM_HEIGHT, scrollToSection])

  useEffect(() => {
    if (!hasMounted) return
    
    let timeoutId: NodeJS.Timeout
    
    observerRef.current = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        if (isDragging) return
        
        const mostVisible = entries.reduce<IntersectionObserverEntry | null>(
          (max, entry) => {
            if (!max) return entry
            return entry.intersectionRatio > max.intersectionRatio ? entry : max
          },
          null
        )
        
        if (mostVisible && mostVisible.isIntersecting && mostVisible.intersectionRatio > 0.5) {
          const index = sectionsArray.findIndex(
            s => s.toLowerCase() === (mostVisible.target as HTMLElement).id
          )
          
          if (index !== -1 && index !== activeIndex) {
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
              setActiveIndex(index)
              y.set(index * ITEM_HEIGHT)
            }, 50)
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -20% 0px',
        threshold: [0.4, 0.6, 0.8]
      }
    )

    sectionsArray.forEach(section => {
      const el = document.getElementById(section.toLowerCase())
      if (el) observerRef.current?.observe(el)
    })

    return () => {
      clearTimeout(timeoutId)
      observerRef.current?.disconnect()
    }
  }, [sectionsArray, activeIndex, isDragging, y, hasMounted])

  // Theme-based styles
  const getSliderBackground = () => {
    return isDark
      ? 'bg-gray-900/50 backdrop-blur-sm border border-emerald-500/20'
      : 'bg-white/80 backdrop-blur-sm border border-emerald-500/30'
  }

  const getGlowBackground = () => {
    return isDark
      ? 'bg-emerald-500/5 blur-sm'
      : 'bg-emerald-500/10 blur-sm'
  }

  const getDotColor = (isActive: boolean, isHover: boolean = false) => {
    if (isActive) {
      return isDark
        ? 'bg-emerald-400 scale-125 shadow shadow-emerald-400/60'
        : 'bg-emerald-500 scale-125 shadow shadow-emerald-500/60'
    }
    
    if (isHover) {
      return isDark
        ? 'bg-emerald-400/50'
        : 'bg-emerald-500/50'
    }
    
    return isDark
      ? 'bg-emerald-300/30'
      : 'bg-emerald-500/30'
  }

  const getTooltipBackground = () => {
    return isDark
      ? 'bg-emerald-900/90 text-emerald-100'
      : 'bg-emerald-100/90 text-emerald-900'
  }

  const getLabelColor = () => {
    return isDark
      ? 'text-emerald-300'
      : 'text-emerald-600'
  }

  const getSubLabelColor = () => {
    return isDark
      ? 'text-emerald-300/60'
      : 'text-emerald-600/60'
  }

  const getChevronColor = () => {
    return isDark
      ? 'text-emerald-400/70'
      : 'text-emerald-500/70'
  }

  const getHandleGradient = () => {
    return isDark
      ? 'bg-gradient-to-br from-emerald-500 via-green-600 to-lime-500 shadow-lg shadow-emerald-500/40'
      : 'bg-gradient-to-br from-emerald-400 via-green-500 to-lime-400 shadow-lg shadow-emerald-500/30'
  }

  if (!hasMounted) {
    return (
      <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden md:block">
        <div className="relative select-none">
          <div className="relative h-40 w-10 mx-auto">
            <div className={`absolute inset-0 rounded-full ${getGlowBackground()}`} />
            <div className={`absolute inset-0 rounded-full ${getSliderBackground()}`} />
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {sectionsArray.map((_, index) => (
                <div key={index} style={{ height: ITEM_HEIGHT }} className="flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${getDotColor(false)}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      suppressHydrationWarning
      className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden md:block" 
      role="navigation" 
      aria-label="Page navigation slider"
    >
      <div className="relative h-40 w-10 mx-auto">
        <div className={`absolute inset-0 rounded-full ${getGlowBackground()}`} />
        <div className={`absolute inset-0 rounded-full ${getSliderBackground()}`} />

        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: HEIGHT - ITEM_HEIGHT }}
          dragElastic={0.12}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          style={{ y }}
          className="absolute inset-x-0 z-10 cursor-grab active:cursor-grabbing"
          role="slider"
          aria-label="Navigate between sections"
          aria-valuemin={0}
          aria-valuemax={sectionsArray.length - 1}
          aria-valuenow={activeIndex}
          aria-valuetext={sectionsArray[activeIndex]}
          tabIndex={0}
          onKeyDown={(e) => {
            if (!hasMounted) return
            switch(e.key) {
              case 'ArrowUp':
                e.preventDefault()
                scrollToSection(activeIndex - 1)
                break
              case 'ArrowDown':
                e.preventDefault()
                scrollToSection(activeIndex + 1)
                break
              case 'Home':
                e.preventDefault()
                scrollToSection(0)
                break
              case 'End':
                e.preventDefault()
                scrollToSection(sectionsArray.length - 1)
                break
            }
          }}
        >
          <div className="relative">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2" aria-hidden="true">
              <ChevronUp size={16} className={getChevronColor()} />
            </div>

            <motion.div
              variants={handleVariants}
              animate="pulse"
              className={`
                w-8 h-8 mx-auto
                rounded-full flex items-center justify-center
                ${getHandleGradient()}
              `}
              aria-hidden="true"
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
              <ChevronDown size={16} className={getChevronColor()} />
            </div>
          </div>
        </motion.div>

        <div 
          suppressHydrationWarning
          className="absolute inset-0 flex flex-col justify-between py-2"
        >
          {sectionsArray.map((section, index) => (
            <button
              key={section}
              suppressHydrationWarning
              onClick={() => scrollToSection(index)}
              style={{ height: ITEM_HEIGHT }}
              className="relative flex items-center justify-center group"
              aria-label={`Go to ${section} section`}
              aria-current={index === activeIndex ? 'true' : 'false'}
            >
              <div
                suppressHydrationWarning
                className={`w-2 h-2 rounded-full transition-all duration-300 ${getDotColor(index === activeIndex)}`}
                aria-hidden="true"
              />

              <div 
                suppressHydrationWarning
                className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-opacity"
                role="tooltip"
              >
                <span className={`text-xs font-medium whitespace-nowrap px-2 py-1 rounded ${getTooltipBackground()}`}>
                  {section}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <motion.div
          key={activeIndex}
          variants={activeLabelVariants}
          initial="hidden"
          animate="visible"
          className={`text-xs font-semibold tracking-wider ${getLabelColor()}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {sectionsArray[activeIndex].toUpperCase()}
        </motion.div>

        <div className={`text-[10px] mt-1 ${getSubLabelColor()}`}>
          {activeIndex + 1} / {sectionsArray.length}
        </div>
      </div>
    </div>
  )
}