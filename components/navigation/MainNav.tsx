'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { Menu, X, Code2, Sparkles, Zap, Globe } from 'lucide-react'
import NavItem from './NavItem'
import Tooltip from './Tooltip'
import VerticalSlider from './VerticalSlider'
import ThemeToggle from '../shared/ThemeToggle'

const NAV_ITEMS = [
    { label: 'Skills', href: '#skills', icon: Zap, color: 'from-purple-500 to-pink-500' },
    { label: 'Work', href: '#work', icon: Code2, color: 'from-blue-500 to-cyan-400' },
    { label: 'Projects', href: '#projects', icon: Sparkles, color: 'from-orange-500 to-yellow-500' },
    { label: 'Contact', href: '#contact', icon: Globe, color: 'from-green-500 to-emerald-400' },
]

export default function MainNav() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [showVerticalSlider, setShowVerticalSlider] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [activeHover, setActiveHover] = useState<string | null>(null)

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Initialize VerticalSlider only on client
    useEffect(() => {
        setShowVerticalSlider(true)
    }, [])

    // Scroll handler
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

    // Close menu when clicking outside
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

    return (
        <>
            <LazyMotion features={domAnimation}>
                {/* Navigation Container */}
                <motion.nav
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled
                            ? 'shadow-black/20 backdrop-blur-lg rounded-lg'
                            : 'bg-transparent'
                        }`}
                    style={{ zIndex: 999 }}
                >
                    <div className="container-custom">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <div className="relative group">
                                <motion.a
                                    href="/"
                                    aria-label="Homepage"
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-4 cursor-pointer pr-10 mt-[24px] lg:mt-14"
                                >
                                    <div className="relative">
                                        {/* Glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 rounded-full blur opacity-70 group-hover:opacity-100 transition-opacity" />

                                        {/* Icon Container */}
                                        <div className="relative bg-emerald-950 dark:bg-gray-900 rounded-full p-2 border border-emerald-500/20">
                                            <Code2 className="text-emerald-300" size={24} />
                                        </div>
                                    </div>

                                    {/* Brand Text */}
                                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-700 via-green-600 to-lime-500 bg-clip-text text-transparent">
                                        SanthoshRajk
                                    </span>
                                </motion.a>

                                {/* Tooltip */}
                                <Tooltip
                                    position="bottom"
                                    text="Crafted with Django, Next.js 15 & Framer Motion"
                                />
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-2 mobile-menu-container">
                                {navItems.map((item) => (
                                    <NavItem
                                        key={item.label}
                                        {...item}
                                        isActive={activeHover === item.label}
                                        onHover={setActiveHover}
                                    />
                                ))}

                                {/* Theme Toggle */}
                                <div className="ml-4">
                                    <ThemeToggle />
                                </div>
                            </div>

                            {/* Mobile Menu Button - Enhanced with animation */}
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={handleMenuToggle}
                                className="md:hidden glass-effect p-3 rounded-xl relative overflow-hidden group"
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
                                        >
                                            <X size={24} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                        >
                                            <Menu size={24} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown - Enhanced with design from example */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="md:hidden glass-effect border-t border-gray-200 dark:border-white/10 overflow-hidden"
                                style={{ zIndex: 1000 }}
                            >
                                <div className="container-custom py-4 space-y-2">
                                    {navItems.map((item) => (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            whileHover={{ x: 10 }}
                                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-all group"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                                                <item.icon size={18} className="text-white" />
                                            </div>
                                            <span className="font-medium text-gray-800 dark:text-white">
                                                {item.label}
                                            </span>
                                            <div className="ml-auto w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </motion.a>
                                    ))}

                                    {/* Separator */}
                                    <div className="h-px bg-gray-200 dark:bg-white/10 my-2" />

                                    {/* Theme Toggle - WRAP IT IN A DIV TO PREVENT UNMOUNTING
                                    <div className="pt-4">
                                        <ThemeToggle />
                                    </div> */}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>

                {/* Active Indicator Line - From design example */}
                <motion.div
                    className="fixed top-24 left-0 right-0 h-px z-40"
                    animate={{
                        background: activeHover
                            ? `linear-gradient(90deg, transparent, var(--hover-color), transparent)`
                            : 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)'
                    }}
                    style={{
                        '--hover-color': activeHover
                            ? NAV_ITEMS.find(item => item.label === activeHover)?.color
                                .split(' ')[1]
                                .replace('from-', '#')
                                .replace('500', '300')
                            : '#3b82f6'
                    } as React.CSSProperties}
                />
            </LazyMotion>

            {/* Vertical Slider - Desktop only */}
            {showVerticalSlider && (
                <div className="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden md:block">
                    <VerticalSlider />
                </div>
            )}
        </>
    )
}