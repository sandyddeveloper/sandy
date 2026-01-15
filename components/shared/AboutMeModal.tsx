"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
    X,
    GraduationCap,
    Briefcase,
    Code2,
    ExternalLink,
    Download,
} from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

interface Props {
    open: boolean
    onClose: () => void
    isDark?: boolean
}

/* ================= COUNTER ================= */

function AnimatedCounter({ value, label, isDark = true }: { value: number; label: string; isDark?: boolean }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let start = 0
        const duration = 800
        const step = Math.ceil(value / (duration / 16))

        const interval = setInterval(() => {
            start += step
            if (start >= value) {
                setCount(value)
                clearInterval(interval)
            } else {
                setCount(start)
            }
        }, 16)

        return () => clearInterval(interval)
    }, [value])

    const getCounterColor = () => {
        return isDark ? "text-emerald-400" : "text-emerald-600"
    }

    const getLabelColor = () => {
        return isDark ? "text-gray-400" : "text-gray-600"
    }

    return (
        <div className="text-center">
            <div className={`text-2xl sm:text-3xl font-bold ${getCounterColor()}`}>
                {count}+
            </div>
            <div className={`text-xs mt-1 ${getLabelColor()}`}>
                {label}
            </div>
        </div>
    )
}

/* ================= MODAL ================= */

export default function AboutMeModal({ open, onClose, isDark = true }: Props) {
    const [mountedIsDark, setMountedIsDark] = useState(isDark)

    useEffect(() => {
        // Check initial theme if isDark prop is not provided
        if (isDark === undefined) {
            const isDarkMode = document.documentElement.classList.contains('dark')
            setMountedIsDark(isDarkMode)
        } else {
            setMountedIsDark(isDark)
        }
        
        // Listen for theme changes if isDark prop is not provided
        if (isDark === undefined) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'class') {
                        const isDarkMode = document.documentElement.classList.contains('dark')
                        setMountedIsDark(isDarkMode)
                    }
                })
            })
            
            observer.observe(document.documentElement, { attributes: true })
            return () => observer.disconnect()
        }
    }, [isDark])

    // Theme-based styles
    const getBackdropBackground = () => {
        return mountedIsDark
            ? "bg-black/70 backdrop-blur-sm"
            : "bg-black/40 backdrop-blur-sm"
    }

    const getModalBackground = () => {
        return mountedIsDark
            ? "bg-[#041b13] border border-white/10"
            : "bg-white border border-gray-200"
    }

    const getProfileBorder = () => {
        return mountedIsDark
            ? "border-4 border-emerald-500/30 shadow-lg shadow-emerald-500/30"
            : "border-4 border-emerald-500/20 shadow-lg shadow-emerald-500/20"
    }

    const getTitleColor = () => {
        return mountedIsDark ? "text-white" : "text-gray-900"
    }

    const getSubtitleColor = () => {
        return mountedIsDark ? "text-gray-400" : "text-gray-600"
    }

    const getResumeButtonStyle = () => {
        return mountedIsDark
            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/25"
            : "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 hover:bg-emerald-500/20"
    }

    const getTextColor = () => {
        return mountedIsDark ? "text-gray-300" : "text-gray-700"
    }

    const getTextLightColor = () => {
        return mountedIsDark ? "text-gray-400" : "text-gray-600"
    }

    const getLinkColor = () => {
        return mountedIsDark ? "text-emerald-400 hover:text-emerald-300" : "text-emerald-600 hover:text-emerald-700"
    }

    const getSectionTitleColor = () => {
        return mountedIsDark ? "text-emerald-400" : "text-emerald-600"
    }

    const getSkillStyle = () => {
        return mountedIsDark
            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
            : "bg-emerald-500/10 text-emerald-700 border border-emerald-500/20"
    }

    const getTimelineIconStyle = () => {
        return mountedIsDark
            ? "bg-emerald-500/10 text-emerald-400"
            : "bg-emerald-500/10 text-emerald-600"
    }

    const getTimelineTitleColor = () => {
        return mountedIsDark ? "text-white" : "text-gray-900"
    }

    const getTimelineContentColor = () => {
        return mountedIsDark ? "text-gray-400" : "text-gray-600"
    }

    const getBorderColor = () => {
        return mountedIsDark ? "border-white/10" : "border-gray-200"
    }

    const getCloseButtonColor = () => {
        return mountedIsDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`
                        fixed inset-0 z-50
                        flex items-center justify-center
                        px-4 z-999
                        ${getBackdropBackground()}
                    `}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 40, scale: 0.96 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 40, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={e => e.stopPropagation()}
                        className={`
                            relative
                            w-full max-w-6xl
                            max-h-[90vh]
                            overflow-y-auto
                            rounded-[32px]
                            p-6 sm:p-10 lg:p-14 
                            ${getModalBackground()}
                        `}
                    >
                        {/* CLOSE */}
                        <button
                            onClick={onClose}
                            className={`absolute top-5 right-5 ${getCloseButtonColor()}`}
                        >
                            <X />
                        </button>

                        {/* HEADER */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">

                            {/* PROFILE */}
                            <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
                                <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden ${getProfileBorder()}`}>
                                    <Image
                                        src="/images/avatar/profile.png"
                                        alt="Santhoshraj"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <h2 className={`mt-6 text-3xl sm:text-4xl font-bold ${getTitleColor()}`}>
                                    Santhoshraj
                                </h2>

                                <p className={`mt-2 text-sm ${getSubtitleColor()}`}>
                                    Full Stack Developer
                                </p>

                                {/* RESUME */}
                                <a
                                    href="/resume/Santhoshraj-Resume.pdf"
                                    download
                                    className={`
                                        mt-6 inline-flex items-center gap-2
                                        px-5 py-2.5
                                        rounded-xl
                                        transition
                                        ${getResumeButtonStyle()}
                                    `}
                                >
                                    <Download size={16} />
                                    Download Resume
                                </a>
                            </div>

                            {/* SUMMARY */}
                            <div className="lg:col-span-2">
                                <p className={`leading-relaxed max-w-3xl ${getTextColor()}`}>
                                    Full Stack Developer with strong experience in building scalable,
                                    performance-driven web applications using modern frontend and backend technologies.
                                </p>

                                <p className={`mt-4 max-w-3xl ${getTextLightColor()}`}>
                                    BCA graduate (2024) from Agurchand Manmull Jain College, trained at QSpiders
                                    in SQL & Web Technologies. Completed a 6-month internship at Shiash as a
                                    Python Full Stack / Django Developer, followed by 1 year of freelancing
                                    delivering 6+ live projects. Currently working at{" "}
                                    <a
                                        href="https://datamoo.ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1 hover:underline ${getLinkColor()}`}
                                    >
                                        DataMoo.ai <ExternalLink size={14} />
                                    </a>.
                                </p>
                            </div>
                        </div>

                        {/* COUNTERS */}
                        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-16">
                            <AnimatedCounter value={1} label="Years Experience" isDark={mountedIsDark} />
                            <AnimatedCounter value={4} label="Live Projects" isDark={mountedIsDark} />
                            <AnimatedCounter value={1} label="Years Freelancing" isDark={mountedIsDark} />
                        </div>

                        {/* TIMELINE */}
                        <Section title="Journey" isDark={mountedIsDark}>
                            <TimelineItem
                                icon={GraduationCap}
                                title="Education"
                                content="BCA completed in 2024 from Agurchand Manmull Jain College."
                                isDark={mountedIsDark}
                                getTimelineIconStyle={getTimelineIconStyle}
                                getTimelineTitleColor={getTimelineTitleColor}
                                getTimelineContentColor={getTimelineContentColor}
                            />
                            <TimelineItem
                                icon={Code2}
                                title="Training"
                                content="SQL & Web Technologies course at QSpiders."
                                isDark={mountedIsDark}
                                getTimelineIconStyle={getTimelineIconStyle}
                                getTimelineTitleColor={getTimelineTitleColor}
                                getTimelineContentColor={getTimelineContentColor}
                            />
                            <TimelineItem
                                icon={Briefcase}
                                title="Internship"
                                content="6-month internship at Shiash as Python Full Stack / Django Developer."
                                isDark={mountedIsDark}
                                getTimelineIconStyle={getTimelineIconStyle}
                                getTimelineTitleColor={getTimelineTitleColor}
                                getTimelineContentColor={getTimelineContentColor}
                            />
                            <TimelineItem
                                icon={Code2}
                                title="Major Project"
                                content="Developed 'Aluminium Pro' — a manufacturing application for aluminium material tracking, wastage, loss, and profiling."
                                isDark={mountedIsDark}
                                getTimelineIconStyle={getTimelineIconStyle}
                                getTimelineTitleColor={getTimelineTitleColor}
                                getTimelineContentColor={getTimelineContentColor}
                            />
                            <TimelineItem
                                icon={Briefcase}
                                title="Current Role"
                                content="Working at DataMoo.ai on scalable, data-driven applications."
                                isDark={mountedIsDark}
                                getTimelineIconStyle={getTimelineIconStyle}
                                getTimelineTitleColor={getTimelineTitleColor}
                                getTimelineContentColor={getTimelineContentColor}
                            />
                        </Section>

                        {/* SKILLS */}
                        <Section title="Skills & Tools" isDark={mountedIsDark}>
                            <div className="flex flex-wrap gap-3">
                                {[
                                    "React",
                                    "Next.js",
                                    "Tailwind CSS",
                                    "Bootstrap",
                                    "Python",
                                    "Django",
                                    "Flask",
                                    "SQL",
                                    "MySQL",
                                    "PostgreSQL",
                                    "Git",
                                    "Figma",
                                    "Canva",
                                ].map(skill => (
                                    <motion.span
                                        key={skill}
                                        whileHover={{ scale: 1.05 }}
                                        className={`
                                            text-sm px-4 py-1.5 rounded-full
                                            ${getSkillStyle()}
                                        `}
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </Section>

                        {/* FOOTER */}
                        <div className={`mt-16 pt-8 border-t ${getBorderColor()} text-center`}>
                            <p className={`text-sm max-w-3xl mx-auto ${getTextLightColor()}`}>
                                I focus on clean code, performance optimization, and building systems
                                that scale reliably in real production environments.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

/* ================= HELPERS ================= */

function Section({ title, children, isDark = true }: { title: string; children: React.ReactNode; isDark?: boolean }) {
    const getSectionTitleColor = () => {
        return isDark ? "text-emerald-400" : "text-emerald-600"
    }

    return (
        <div className="mb-14">
            <h3 className={`mb-6 text-sm font-semibold tracking-wider uppercase ${getSectionTitleColor()}`}>
                {title}
            </h3>
            {children}
        </div>
    )
}

function TimelineItem({
    icon: Icon,
    title,
    content,
    isDark = true,
    getTimelineIconStyle,
    getTimelineTitleColor,
    getTimelineContentColor
}: {
    icon: any
    title: string
    content: string
    isDark?: boolean
    getTimelineIconStyle?: () => string
    getTimelineTitleColor?: () => string
    getTimelineContentColor?: () => string
}) {
    const iconStyle = getTimelineIconStyle ? getTimelineIconStyle() : (isDark 
        ? "bg-emerald-500/10 text-emerald-400" 
        : "bg-emerald-500/10 text-emerald-600")
    
    const titleColor = getTimelineTitleColor ? getTimelineTitleColor() : (isDark ? "text-white" : "text-gray-900")
    const contentColor = getTimelineContentColor ? getTimelineContentColor() : (isDark ? "text-gray-400" : "text-gray-600")

    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 mb-6"
        >
            <div className={`w-10 h-10 flex items-center justify-center rounded-full ${iconStyle}`}>
                <Icon size={18} />
            </div>
            <div>
                <h4 className={`text-sm font-semibold ${titleColor}`}>
                    {title}
                </h4>
                <p className={`mt-1 text-sm leading-relaxed ${contentColor}`}>
                    {content}
                </p>
            </div>
        </motion.div>
    )
}