'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
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

type AnimationProps = {
  x?: number[]
  y?: number[]
  scale?: number[]
  rotate?: number[]
  opacity?: number[]
}

type TransitionProps = {
  duration: number
  repeat: number
  ease: 'linear'
}

export default function ParticleBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  /* 🌿 Django Green Palette */
  const particleColors = useMemo(() => {
    return isDark
      ? [
          'rgba(52, 211, 153, 0.9)',  // emerald
          'rgba(34, 197, 94, 0.9)',   // green
          'rgba(163, 230, 53, 0.9)',  // lime
        ]
      : [
          'rgba(52, 211, 153, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(163, 230, 53, 0.5)',
        ]
  }, [isDark])

  useEffect(() => {
    if (!mounted) return

    const newParticles: Particle[] = []

    /* 🔹 DOTS (floating forever) */
    for (let i = 0; i < 35; i++) {
      newParticles.push({
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

    /* 🔸 LINES (slow drifting) */
    for (let i = 35; i < 45; i++) {
      newParticles.push({
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

    /* 🔘 RINGS (infinite rotation) */
    for (let i = 45; i < 52; i++) {
      newParticles.push({
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

    setParticles(newParticles)
  }, [mounted, isDark, particleColors])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((particle) => {
        /* ∞ INFINITE MOTION */
        const animation: AnimationProps =
          particle.type === 'ring'
            ? {
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }
            : {
                x: [0, particle.speedX],
                y: [0, particle.speedY],
                opacity: particle.type === 'dot' ? [0.6, 1, 0.6] : undefined,
              }

        const transition: TransitionProps = {
          duration:
            particle.type === 'ring'
              ? 18 + Math.random() * 10
              : 20 + Math.random() * 20,
          repeat: Infinity,
          ease: 'linear',
        }

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width:
                particle.type === 'line'
                  ? `${particle.size * 18}px`
                  : `${particle.size}px`,
              height:
                particle.type === 'line'
                  ? '1px'
                  : `${particle.size}px`,
              backgroundColor:
                particle.type === 'ring' ? 'transparent' : particle.color,
              border:
                particle.type === 'ring'
                  ? `1px solid ${particle.color}`
                  : 'none',
              borderRadius:
                particle.type === 'dot'
                  ? '50%'
                  : particle.type === 'line'
                  ? '2px'
                  : '50%',
              opacity: particle.type === 'ring' ? 0.35 : 0.85,
            }}
            animate={animation}
            transition={transition}
          />
        )
      })}
    </div>
  )
}
