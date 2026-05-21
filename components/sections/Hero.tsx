'use client'

import { motion, useScroll, useTransform, useReducedMotion, Variants } from 'framer-motion'
import { useEffect, useState, useRef, useCallback, useMemo, startTransition } from 'react'
import {
    ArrowDown,
    Sparkles,
    Code2,
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

const STATS_DATA = [
    { value: '1+', label: 'Years Experience' },
    { value: '100%', label: 'Backend Focus' },
]

export default function HeroSection() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [typedText, setTypedText] = useState('')
    const [textIndex, setTextIndex] = useState(0)
    const [isDarkMode, setIsDarkMode] = useState(true)
    const shouldReduceMotion = useReducedMotion()
    const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const animationFrameRef = useRef<number | null>(null)

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
    const y = useTransform(scrollYProgress, [0, 0.5], [0, 60])

    const stats = useMemo(() => STATS_DATA, [])

    useEffect(() => {
        setMounted(true)
        // Check initial theme
        const isDark = resolvedTheme === 'dark'
        setIsDarkMode(isDark)
        
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
    }, [resolvedTheme])

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

    // Theme-based styles
    const getBackgroundGradient = () => {
        return isDarkMode
            ? "from-gray-950 via-emerald-950/20 to-green-950/10"
            : "from-emerald-50 via-green-50/80 to-lime-50/60"
    }

    const getBackgroundColor = () => {
        return isDarkMode ? '#060f0b' : '#f0fdf4'
    }

    const getPrimaryTextColor = () => {
        return isDarkMode ? "text-gray-200" : "text-gray-800"
    }

    const getSecondaryTextColor = () => {
        return isDarkMode ? "text-gray-400" : "text-gray-600"
    }

    const getAccentColor = () => {
        return isDarkMode ? "text-green-400" : "text-emerald-600"
    }

    const getMutedAccentColor = () => {
        return isDarkMode ? "text-green-300" : "text-emerald-500"
    }

    const getBorderColor = () => {
        return isDarkMode ? "border-gray-800" : "border-emerald-200"
    }

    const getBorderAccentColor = () => {
        return isDarkMode ? "border-green-800/30" : "border-emerald-400/30"
    }

    const getBgAccentColor = () => {
        return isDarkMode ? "bg-green-900/20" : "bg-emerald-100/80"
    }

    const getCardBg = () => {
        return isDarkMode 
            ? "bg-black/20 backdrop-blur-md border border-gray-800"
            : "bg-white/70 backdrop-blur-sm border border-emerald-200/50"
    }

    const getGlowVariants = (): Variants => ({
        animate: {
            boxShadow: isDarkMode
                ? [
                    '0 0 70px rgba(68, 183, 139, 0.4)',
                    '0 0 100px rgba(52, 211, 153, 0.5)',
                    '0 0 70px rgba(68, 183, 139, 0.4)',
                ]
                : [
                    '0 0 70px rgba(68, 183, 139, 0.2)',
                    '0 0 100px rgba(52, 211, 153, 0.3)',
                    '0 0 70px rgba(68, 183, 139, 0.2)',
                ],
            transition: {
                duration: 4,
                repeat: Infinity,
            }
        }
    })

    const getTerminalBg = () => {
        return isDarkMode
            ? "bg-[#0F2319] border-green-800/30 shadow-[0_0_30px_rgba(68,183,139,0.15)]"
            : "bg-emerald-50/90 border-emerald-400/20 shadow-[0_0_30px_rgba(68,183,139,0.1)]"
    }

    const getTerminalHeaderBg = () => {
        return isDarkMode
            ? "bg-[#092B1A] border-green-800/20"
            : "bg-emerald-100/80 border-emerald-400/20"
    }

    const getRingBorderColor = (ring: number) => {
        if (isDarkMode) {
            return `rgba(68, 183, 139, ${0.3 - ring * 0.08})`
        } else {
            return `rgba(16, 185, 129, ${0.2 - ring * 0.05})`
        }
    }

    if (!mounted) return null

    return (
        <section
            ref={containerRef}
            id="hero"
            className={`
                relative min-h-screen overflow-hidden 
                pt-24 md:pt-20 lg:pt-16  
                px-4 md:px-6 lg:px-8     
                bg-gradient-to-br ${getBackgroundGradient()}
                mt-14 lg:mt-0
                transition-colors duration-300
            `}
            style={{
                backgroundColor: getBackgroundColor()
            }}
        >
            {/* Status Badge */}
            <div className="absolute top-6 left-4 sm:left-8 z-50">
                <div className={`
                    flex items-center gap-2 px-3 py-1 rounded-full 
                    backdrop-blur-md ${getBorderColor()} 
                    ${isDarkMode ? "bg-black/20" : "bg-white/60"}
                    transition-colors duration-300
                `}>
                    <div className={`w-2 h-2 ${isDarkMode ? "bg-green-500" : "bg-emerald-500"} animate-pulse rounded-full`} />
                    <span className={`text-xs font-semibold ${getSecondaryTextColor()}`}>
                        HERO 1 / 3
                    </span>
                </div>
            </div>

            {/* Name Badge */}
            <div className="absolute top-6 right-4 sm:right-8 z-50">
                <div className={`
                    flex items-center gap-2 px-4 py-2 rounded-full 
                    ${getBgAccentColor()} ${getBorderAccentColor()} 
                    backdrop-blur-sm transition-colors duration-300
                `}>
                    <User className={`w-3 h-3 ${getAccentColor()}`} />
                    <span className={`text-sm font-bold ${getMutedAccentColor()}`}>
                        SanthoshRaj K
                    </span>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: isDarkMode
                            ? `radial-gradient(circle at 20% 80%, rgba(68, 183, 139, 0.35) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(9, 43, 26, 0.25) 0%, transparent 50%)`
                            : `radial-gradient(circle at 20% 80%, rgba(68, 183, 139, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Particle Background with theme */}
            <ParticleBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col lg:flex-row items-center justify-center">
                {/* Left Column */}
                <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start relative">
                    {/* Vertical Name Label */}
                    <div className="absolute -top-6 lg:top-0 lg:-left-24 transform -rotate-90 origin-left hidden lg:block">
                        <div className="flex items-center gap-2">
                            <span className={`text-xs tracking-widest font-bold ${getAccentColor()}`}>
                                SANTHOSHRAJ K
                            </span>
                            <div className={`w-8 h-px bg-gradient-to-r ${isDarkMode ? "from-green-400" : "from-emerald-500"} to-transparent`} />
                            <span className={`text-xs ${getSecondaryTextColor()}`}>
                                ACTIVE
                            </span>
                        </div>
                    </div>

                    {/* Orb Rings & Profile */}
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
                                    borderColor: getRingBorderColor(ring),
                                }}
                            />
                        ))}

                        <motion.div
                            className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden"
                            variants={getGlowVariants()}
                            animate={shouldReduceMotion ? {} : "animate"}
                        >
                            <div className={`absolute inset-0 ${isDarkMode ? "bg-gradient-to-br from-green-600 via-emerald-700 to-teal-600" : "bg-gradient-to-br from-emerald-500 via-green-500 to-teal-400"}`} />
                            <div className={`absolute inset-6 rounded-full flex flex-col items-center justify-center ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
                                <Code2
                                    size={60}
                                    className={getAccentColor()}
                                    aria-hidden="true"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                        {stats.map(stat => (
                            <div
                                key={stat.label}
                                className={`p-4 rounded-xl text-center ${getCardBg()} transition-colors duration-300`}
                                role="listitem"
                            >
                                <div className={`text-2xl font-bold ${getPrimaryTextColor()}`}>
                                    {stat.value}
                                </div>
                                <div className={`text-sm ${getSecondaryTextColor()}`}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-3/5 lg:pl-16 mt-12 lg:mt-0">
                    {/* Header with Name Badge */}
                    <div className="mb-8">
                        <div className="mb-4 mt-2">
                            <div className={`
                                inline-flex items-center gap-2 px-4 py-2 rounded-full 
                                ${getBgAccentColor()} ${getBorderAccentColor()} 
                                backdrop-blur-sm transition-colors duration-300
                            `}>
                                <Sparkles className={`w-4 h-4 ${getAccentColor()}`} />
                                <span className={`text-sm font-bold ${getMutedAccentColor()}`}>
                                    SanthoshRaj K
                                </span>
                            </div>
                        </div>

                        {/* Main Headline */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                            <span
                                className={`
                                    block bg-gradient-to-r 
                                    ${isDarkMode 
                                        ? "from-green-400 via-emerald-400 to-teal-400" 
                                        : "from-emerald-600 via-green-600 to-teal-600"
                                    } 
                                    bg-clip-text text-transparent
                                `}
                                aria-label="Build scalable systems"
                            >
                                BUILD
                            </span>
                            <span className={`block ${getPrimaryTextColor()}`}>
                                SCALABLE
                            </span>
                            <span className={`flex items-center gap-4 ${getPrimaryTextColor()}`}>
                                SYSTEMS
                                <MousePointer2
                                    className={getAccentColor()}
                                    size={42}
                                    aria-hidden="true"
                                />
                            </span>
                        </h1>

                        {/* Description */}
                        <p className={`mt-6 text-lg md:text-xl ${getSecondaryTextColor()} max-w-2xl`}>
                            Hi, I'm <span className={`font-bold ${getAccentColor()}`}>SanthoshRaj K</span>, specializing in designing secure, scalable and maintainable web applications using
                            <span className={`font-semibold ${getAccentColor()}`}> Django</span>,
                            crafting modern interfaces with
                            <span className={`font-semibold ${getAccentColor()}`}> React</span>, and
                            solving real-world problems through
                            <span className={`font-semibold ${isDarkMode ? "text-teal-400" : "text-teal-600"}`}> Python</span>.
                        </p>
                    </div>

                    {/* Terminal Component */}
                    <div
                        role="status"
                        aria-live="polite"
                        aria-atomic="true"
                        className={`
                            relative
                            w-full sm:w-fit
                            max-w-full
                            rounded-xl
                            ${getTerminalBg()}
                            overflow-hidden
                            font-mono
                            transition-colors duration-300
                            shadow-2xl
                        `}
                    >
                        {/* Terminal Header */}
                        <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-3 ${getTerminalHeaderBg()} border-b ${getBorderAccentColor()}`}>
                            <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isDarkMode ? "bg-red-500/80" : "bg-red-400/80"}`} />
                            <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isDarkMode ? "bg-yellow-500/80" : "bg-yellow-400/80"}`} />
                            <span className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${isDarkMode ? "bg-green-500/80" : "bg-emerald-500/80"}`} />
                            <span className={`ml-2 sm:ml-3 text-[10px] sm:text-xs md:text-sm font-medium ${getSecondaryTextColor()}`}>terminal</span>
                        </div>

                        {/* Terminal Content */}
                        <div className="p-4 sm:p-5 md:p-6 lg:p-8 w-full min-w-0 sm:min-w-[320px] md:min-w-[400px] lg:min-w-[450px] xl:min-w-[500px]">
                            <div className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold ${getSecondaryTextColor()} mb-2 sm:mb-3`}>
                                CURRENT ROLE
                            </div>

                            <div className={`flex items-start gap-2 sm:gap-3 ${isDarkMode ? "text-green-300" : "text-emerald-600"} text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl tracking-wide`}>
                                <span className={`${getAccentColor()} shrink-0`}>$</span>
                                <span className={`break-words flex-1 ${isDarkMode ? "drop-shadow-[0_0_8px_rgba(68,183,139,0.6)]" : "drop-shadow-[0_0_8px_rgba(68,183,139,0.3)]"}`}>
                                    {typedText}
                                    <span
                                        aria-hidden="true"
                                        className={`
                                            inline-block
                                            w-[1.5px] sm:w-[2px] md:w-[3px]
                                            h-[1em]
                                            ml-1 sm:ml-2 align-middle
                                            ${isDarkMode ? "bg-green-300" : "bg-emerald-500"}
                                            animate-[blink_1s_steps(2,start)_infinite]
                                        `}
                                    />
                                </span>
                            </div>
                        </div>

                        {/* Terminal Scanlines Effect */}
                        <div
                            aria-hidden="true"
                            className={`
                                pointer-events-none
                                absolute inset-0
                                bg-[linear-gradient(
                                    to_bottom,
                                    ${isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)"}_1px,
                                    transparent_1px
                                )]
                                bg-[length:100%_4px]
                                opacity-10
                            `}
                        />
                    </div>

                    {/* Footer Note */}
                    <div className={`mt-8 flex items-center gap-3 text-sm ${getSecondaryTextColor()}`}>
                        <div className={`w-4 h-px bg-gradient-to-r ${isDarkMode ? "from-green-400" : "from-emerald-500"} to-transparent`} />
                        <span className="font-mono">crafted by SanthoshRaj K</span>
                        <div className={`w-4 h-px bg-gradient-to-r from-transparent ${isDarkMode ? "to-green-400" : "to-emerald-500"}`} />
                    </div>
                </div>
            </div>
        </section>
    )
}