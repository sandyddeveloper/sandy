'use client'

import { motion, useScroll, useTransform, useReducedMotion, Variants } from 'framer-motion'
import { useEffect, useState, useRef, useCallback, useMemo, startTransition } from 'react'
import {
    ArrowDown,
    Sparkles,
    Code2,
    Terminal,
    MousePointer2,
    User
} from 'lucide-react'
import ParticleBackground from '../hero/ParticleBackground'
import { useTheme } from 'next-themes'

const ROLES = [
    'Django Backend Developer',
    'React Frontend Engineer',
    'Python Application Developer',
    'Full-Stack Web Developer',
    'Scalable System Builder',
]

// Animation variants with proper typing
const orbRingVariants = (index: number): Variants => ({
  animate: {
    rotate: 360,
    transition: {
      duration: 25 + index * 5,
      repeat: Infinity,
      ease: "linear" as const,
    }
  }
})

const glowVariants: Variants = {
  animate: {
    boxShadow: [
      '0 0 70px rgba(16,185,129,0.4)',
      '0 0 100px rgba(34,197,94,0.5)',
      '0 0 70px rgba(16,185,129,0.4)',
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
    }
  }
}

// Move stats array outside component or memoize at top level
const STATS_DATA = [
    { value: '1+', label: 'Years Experience' },
    { value: '100%', label: 'Backend Focus' },
]

export default function HeroSection() {
    const { resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [typedText, setTypedText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const shouldReduceMotion = useReducedMotion()
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])

    // Memoize stats at top level (before any conditionals)
    const stats = useMemo(() => STATS_DATA, [])

    useEffect(() => {
        setMounted(true)
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
                typingTimeoutRef.current = null
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
            }
        }
    }, [])

    // Optimized typing effect
    useEffect(() => {
        if (!mounted || shouldReduceMotion) {
            setTypedText(ROLES[textIndex])
            return
        }

        const currentRole = ROLES[textIndex]
        let charIndex = 0
        let isCancelled = false

        const type = () => {
            if (isCancelled) return
            
            if (charIndex <= currentRole.length) {
                setTypedText(currentRole.substring(0, charIndex))
                charIndex++
                typingTimeoutRef.current = setTimeout(type, 70)
            } else {
                typingTimeoutRef.current = setTimeout(() => {
                    if (isCancelled) return
                    
                    let removeIndex = currentRole.length
                    const remove = () => {
                        if (isCancelled) return
                        
                        if (removeIndex >= 0) {
                            setTypedText(currentRole.substring(0, removeIndex))
                            removeIndex--
                            typingTimeoutRef.current = setTimeout(remove, 40)
                        } else {
                            startTransition(() => {
                                setTextIndex((prev) => (prev + 1) % ROLES.length)
                            })
                        }
                    }
                    remove()
                }, 1200)
            }
        }
        
        type()
        
        return () => {
            isCancelled = true
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current)
                typingTimeoutRef.current = null
            }
        }
    }, [textIndex, mounted, shouldReduceMotion])

    const handleScrollDown = useCallback(() => {
        const nextSection = document.getElementById('skills')
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [])

    if (!mounted) return null

    const isDark = resolvedTheme === 'dark'

    return (
        <section
            ref={containerRef}
            id="hero"
            className="
        relative min-h-screen overflow-hidden pt-16
        bg-gradient-to-br
        from-emerald-50 via-green-50/40 to-lime-50/10
        dark:from-gray-950 dark:via-emerald-950/20 dark:to-green-950/10
      "
        >
            {/* HERO INDICATOR */}
            <div className="absolute top-6 left-4 sm:left-8 z-50">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-effect">
                    <div className="w-2 h-2 bg-emerald-500 animate-pulse rounded-full" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        HERO 1 / 3
                    </span>
                </div>
            </div>

            {/* NAME BADGE - Top Right */}
            <div className="absolute top-6 right-4 sm:right-8 z-50">
                <div className="flex items-center gap-2 px-4 py-2 mt-4 rounded-full bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 backdrop-blur-sm">
                    <User className="w-3 h-3 text-emerald-400" />
                    <span className="text-sm font-bold text-gray-800 dark:text-emerald-300">
                        SanthoshRaj K
                    </span>
                </div>
            </div>

            {/* BACKGROUND - Optimized gradients */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-10 dark:opacity-5"
                    style={{
                        backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(16,185,129,0.35) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(34,197,94,0.25) 0%, transparent 50%)
            `,
                    }}
                />
            </div>

            <ParticleBackground />

            {/* MAIN CONTENT */}
            <div
                className="
          relative z-10 max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          min-h-screen
          flex flex-col lg:flex-row
          items-center justify-center
        "
            >
                {/* LEFT */}
                <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start relative">

                    {/* SIDE TEXT - Only show on larger screens */}
                    <div className="
              absolute -top-6 lg:top-0 lg:-left-24
              transform -rotate-90 origin-left
              hidden lg:block 
            "
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xs tracking-widest font-bold text-emerald-600">
                                SANTHOSHRAJ K
                            </span>
                            <div className="w-8 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                ACTIVE
                            </span>
                        </div>
                    </div>

                    {/* ORB with Name - Optimized animations */}
                    <div className="relative mb-12 flex justify-center w-full">
                        {[0, 1, 2].map(ring => (
                            <motion.div
                                key={ring}
                                className="absolute border-2 border-dashed rounded-full max-sm:scale-75"
                                variants={orbRingVariants(ring)}
                                animate={shouldReduceMotion ? {} : "animate"}
                                style={{
                                    width: `${160 + ring * 70}px`,
                                    height: `${160 + ring * 70}px`,
                                    borderColor: `rgba(16,185,129,${0.3 - ring * 0.08})`,
                                }}
                            />
                        ))}

                        <motion.div
                            className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden"
                            variants={glowVariants}
                            animate={shouldReduceMotion ? {} : "animate"}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-green-600 to-lime-500" />
                            <div className="absolute inset-6 bg-white dark:bg-gray-900 rounded-full flex flex-col items-center justify-center">
                                <Code2 
                                    size={60} 
                                    className="text-emerald-600 mb-2" 
                                    aria-hidden="true"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* STATS - Use the memoized stats */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        {stats.map(stat => (
                            <div 
                                key={stat.label} 
                                className="glass-effect p-4 rounded-xl text-center"
                                role="listitem"
                            >
                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT */}
                <div className="w-full lg:w-3/5 lg:pl-16 mt-12 lg:mt-0">

                    {/* HEADING with Name */}
                    <div className="mb-8">
                        <div className="mb-4 mt-2">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                                <Sparkles className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-300">
                                    SanthoshRaj K
                                </span>
                            </div>
                        </div>

                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                            <span 
                                className="block bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 bg-clip-text text-transparent"
                                aria-label="Build scalable systems"
                            >
                                BUILD
                            </span>
                            <span className="block text-gray-800 dark:text-gray-200">
                                SCALABLE
                            </span>
                            <span className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
                                SYSTEMS
                                <MousePointer2 
                                    className="text-emerald-500" 
                                    size={42} 
                                    aria-hidden="true"
                                />
                            </span>
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                            Hi, I'm <span className="font-bold text-emerald-600">SanthoshRaj K</span>, specializing in designing secure, scalable and maintainable web applications using
                            <span className="font-semibold text-emerald-600"> Django</span>,
                            crafting modern interfaces with
                            <span className="font-semibold text-green-600"> React</span>, and
                            solving real-world problems through
                            <span className="font-semibold text-lime-600"> Python</span>.
                        </p>
                    </div>

                    {/* ROLE */}
                    <div 
                        className="glass-effect p-4 rounded-2xl inline-flex items-center gap-4"
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <Terminal className="text-emerald-500" size={28} aria-hidden="true" />
                        <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                CURRENT ROLE
                            </div>
                            <div className="font-mono text-xl text-gray-800 dark:text-gray-200">
                                {typedText}
                                <span 
                                    className="ml-1 inline-block w-[2px] h-6 bg-emerald-500 animate-pulse"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personal Signature */}
                    <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
                        <div className="w-4 h-px bg-gradient-to-r from-emerald-500 to-transparent" />
                        <span className="font-mono">crafted by SanthoshRaj K</span>
                        <div className="w-4 h-px bg-gradient-to-r from-transparent to-emerald-500" />
                    </div>
                </div>
            </div>

            {/* SCROLL */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 scale-90 sm:scale-100">
                <button 
                    onClick={handleScrollDown} 
                    className="flex flex-col items-center gap-2"
                    aria-label="Scroll to next section"
                >
                    <span className="text-xs tracking-widest text-gray-500">SCROLL</span>
                    <ArrowDown className="text-gray-500 animate-bounce" aria-hidden="true" />
                </button>
            </div>
        </section>
    )
}