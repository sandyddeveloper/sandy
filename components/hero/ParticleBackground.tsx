'use client'

import { motion, Variants } from 'framer-motion'
import { useEffect, useState, useMemo, useRef, useCallback } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedX: number
  speedY: number
  type: 'dot' | 'line' | 'ring'
}

// Animation variants with proper typing
const dotAnimation: Variants = {
  animate: {
    x: [0, 40, 0, -40, 0],
    y: [0, 40, 0, -40, 0],
    opacity: [0.6, 1, 0.8, 1, 0.6],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
    }
  }
}

const lineAnimation: Variants = {
  animate: {
    x: [0, 30, 0, -30, 0],
    y: [0, 30, 0, -30, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "linear" as const,
    }
  }
}

const ringAnimation: Variants = {
  animate: {
    rotate: [0, 360],
    scale: [1, 1.2, 1],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: "linear" as const,
    }
  }
}

// Pre-calculated particles to avoid recomputation
const createParticles = (isDark: boolean, particleColors: string[]) => {
  const particles: Particle[] = []

  // 🔹 DOTS (floating forever)
  for (let i = 0; i < 25; i++) { // Reduced from 35 for performance
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      speedX: (Math.random() - 0.5) * 40,
      speedY: (Math.random() - 0.5) * 40,
      type: 'dot',
    })
  }

  // 🔸 LINES (slow drifting) - Reduced count
  for (let i = 25; i < 32; i++) { // Reduced from 35-45
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      color: isDark
        ? 'rgba(255,255,255,0.12)'
        : 'rgba(0,0,0,0.12)',
      speedX: (Math.random() - 0.5) * 30,
      speedY: (Math.random() - 0.5) * 30,
      type: 'line',
    })
  }

  // 🔘 RINGS (infinite rotation) - Reduced count
  for (let i = 32; i < 37; i++) { // Reduced from 45-52
    particles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 6,
      color: isDark
        ? 'rgba(255,255,255,0.06)'
        : 'rgba(0,0,0,0.06)',
      speedX: 0,
      speedY: 0,
      type: 'ring',
    })
  }

  return particles
}

export default function ParticleBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Track if component is visible for performance
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setMounted(true)

    // IntersectionObserver to pause animations when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [])

  const isDark = resolvedTheme === 'dark'

  // Memoize colors to prevent recalculation
  const particleColors = useMemo(() => {
    return isDark
      ? [
        'rgba(52, 211, 153, 0.7)',  // Reduced opacity for performance
        'rgba(34, 197, 94, 0.7)',
        'rgba(163, 230, 53, 0.7)',
      ]
      : [
        'rgba(52, 211, 153, 0.4)',
        'rgba(34, 197, 94, 0.4)',
        'rgba(163, 230, 53, 0.4)',
      ]
  }, [isDark])

  // Initialize particles once
  useEffect(() => {
    if (!mounted) return

    const newParticles = createParticles(isDark, particleColors)
    setParticles(newParticles)
  }, [mounted, isDark, particleColors])

  // Get animation variant for particle type
  const getAnimationVariant = useCallback((type: Particle['type']): Variants => {
    switch (type) {
      case 'ring': return ringAnimation
      case 'line': return lineAnimation
      default: return dotAnimation
    }
  }, [])

  // Conditional rendering based on visibility
  if (!mounted || !isVisible) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
        aria-hidden="true"
      />
    )
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10"
      aria-hidden="true"
    >
      {particles.map((particle) => {
        const animationVariant = getAnimationVariant(particle.type)

        // Use CSS transforms for better performance
        const transformStyle = particle.type === 'line'
          ? `rotate(${Math.random() * 360}deg)`
          : undefined

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.type === 'line'
                ? `${particle.size * 18}px`
                : `${particle.size}px`,
              height: particle.type === 'line'
                ? '1px'
                : `${particle.size}px`,
              backgroundColor: particle.type === 'ring'
                ? 'transparent'
                : particle.color,
              border: particle.type === 'ring'
                ? `1px solid ${particle.color}`
                : 'none',
              borderRadius: particle.type === 'dot'
                ? '50%'
                : particle.type === 'line'
                  ? '2px'
                  : '50%',
              opacity: particle.type === 'ring' ? 0.35 : 0.85,
              transform: transformStyle,
              willChange: 'transform, opacity', // Hint to browser for optimization
            }}
            variants={animationVariant}
            animate={isVisible ? "animate" : {}}
            initial={false}
          />
        )
      })}
    </div>
  )
}