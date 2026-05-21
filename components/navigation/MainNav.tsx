'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Menu, X, Code2, Sparkles, Zap, Globe, Book } from 'lucide-react'
import NavItem from './NavItem'
import Tooltip from './Tooltip'
import VerticalSlider from './VerticalSlider'
import ThemeToggle from '../shared/ThemeToggle'

const NAV_ITEMS = [
    {
        label: 'Skills',
        href: '#skills',
        icon: Zap,
        color: 'from-emerald-500 to-green-500',
        darkColor: 'from-emerald-400 to-green-400'
    },
    {
        label: 'Work',
        href: '#work',
        icon: Code2,
        color: 'from-blue-500 to-cyan-500',
        darkColor: 'from-blue-400 to-cyan-400'
    },
    {
        label: 'Projects',
        href: '#projects',
        icon: Sparkles,
        color: 'from-purple-500 to-pink-500',
        darkColor: 'from-purple-400 to-pink-400'
    },
    // {
    //     label: 'Blogs',
    //     href: '#blog',
    //     icon: Book,
    //     color: 'from-emerald-500 to-teal-500',
    //     darkColor: 'from-purple-400 to-pink-400'
    // },
    {
        label: 'Contact',
        href: '#contact',
        icon: Globe,
        color: 'from-orange-500 to-yellow-500',
        darkColor: 'from-orange-400 to-yellow-400'
    },
]

export default function MainNav() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showVerticalSlider, setShowVerticalSlider] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [activeHover, setActiveHover] = useState<string | null>(null)
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    useEffect(() => {
        setShowVerticalSlider(true)

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

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navItems = useMemo(() => NAV_ITEMS, [])

    const handleMenuToggle = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (isOpen && !target.closest('.mobile-menu-container')) {
                setIsOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isOpen])

    const getNavItemColor = useCallback((color: string, darkColor: string) => {
        return isDark ? darkColor : color
    }, [isDark])

    return (
        <>
            <LazyMotion features={domAnimation}>
                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled
                        ? `${isDark ? 'bg-transparent' : 'bg-transparent'} backdrop-blur-lg shadow-lg ${isDark ? 'shadow-emerald-500/20' : 'shadow-emerald-200/50'}
 rounded-lg`
                        : 'bg-transparent'
                        }`}
                    style={{ zIndex: 999 }}
                >
                    <div className="container-custom">
                        <div className="flex items-center justify-between">
                            <div className="relative group">
                                <motion.a
                                    href="/"
                                    aria-label="Homepage"
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-4 cursor-pointer pr-10 mt-[24px] lg:mt-14"
                                >
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity" />

                                        <div className={`relative ${isDark ? 'bg-gray-900' : 'bg-white'} rounded-full p-2 border ${isDark ? 'border-emerald-500/20' : 'border-emerald-500/30'}`}>
                                            <Code2 className={isDark ? "text-emerald-300" : "text-emerald-600"} size={24} />
                                        </div>
                                    </div>

                                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 bg-clip-text text-transparent dark:from-emerald-400 dark:via-green-400 dark:to-lime-400">
                                        SanthoshRajk
                                    </span>
                                </motion.a>

                                <Tooltip
                                    position="bottom"
                                    text="Crafted with Django, Next.js 15 & Framer Motion"
                                />
                            </div>

                            <div className="hidden md:flex items-center gap-2 mobile-menu-container">
                                {navItems.map((item) => (
                                    <NavItem
                                        key={item.label}
                                        {...item}
                                        isActive={activeHover === item.label}
                                        onHover={setActiveHover}
                                        isDark={isDark}
                                    />
                                ))}

                                <div className="ml-4">
                                    <ThemeToggle />
                                </div>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleMenuToggle}
                                className={`md:hidden p-3 rounded-xl relative overflow-hidden group backdrop-blur-sm border ${isDark
                                    ? 'bg-gray-900/50 border-gray-800'
                                    : 'bg-white/50 border-gray-200'
                                    }`}
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isOpen}
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            className={isDark ? "text-gray-200" : "text-gray-800"}
                                        >
                                            <X size={24} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            className={isDark ? "text-gray-200" : "text-gray-800"}
                                        >
                                            <Menu size={24} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </motion.button>
                        </div>
                    </div>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className={`md:hidden ${isDark ? 'bg-transparent' : 'bg-transparent'} backdrop-blur-lg border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} overflow-hidden`}
                                style={{ zIndex: 1000 }}
                            >
                                <div className="container-custom py-4 space-y-2">
                                    {navItems.map((item) => (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            whileHover={{ x: 10 }}
                                            className={`flex items-center gap-3 p-3 rounded-lg transition-all group ${isDark
                                                ? 'hover:bg-gray-800 text-white'
                                                : 'hover:bg-gray-100 text-gray-800'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${getNavItemColor(item.color, item.darkColor)}`}>
                                                <item.icon size={18} className="text-white" />
                                            </div>
                                            <span className="font-medium">
                                                {item.label}
                                            </span>
                                            <div className={`ml-auto w-2 h-2 rounded-full bg-gradient-to-r ${getNavItemColor(item.color, item.darkColor)} opacity-0 group-hover:opacity-100 transition-opacity`} />
                                        </motion.a>
                                    ))}

                                    <div className={`h-px my-2 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`} />

                                    <div className="p-3">
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
                <motion.div
                    className="fixed top-24 left-0 right-0 h-px z-40"
                    animate={{
                        background: activeHover
                            ? `linear-gradient(90deg, transparent, ${isDark ? 'rgba(52, 211, 153, 0.3)' : 'rgba(16, 185, 129, 0.3)'}, transparent)`
                            : `linear-gradient(90deg, transparent, ${isDark ? 'rgba(52, 211, 153, 0.1)' : 'rgba(16, 185, 129, 0.1)'}, transparent)`
                    }}
                />
            </LazyMotion>

            {showVerticalSlider && (
                <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden md:block">
                    <VerticalSlider />
                </div>
            )}
        </>
    )
}