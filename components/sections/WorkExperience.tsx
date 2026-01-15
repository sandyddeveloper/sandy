"use client"

import Image from "next/image"
import { Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

import datamooLogo from "@/public/images/logos/datamoo.png"
import freelanceLogo from "@/public/images/logos/freelance.png"
import internshipLogo from "@/public/images/logos/shiash.png"

const experiences = [
    {
        role: "Software Developer",
        company: "DataMoo.ai",
        logo: datamooLogo,
        period: "Dec 2025 – Present",
        current: true,
        description:
            "Building fast, scalable, and accessible applications with a strong focus on performance, clean architecture, and long-term maintainability.",
        points: [
            "Optimized rendering and reduced page load time",
            "Designed reusable UI systems",
            "Collaborated with designers and backend teams",
        ],
    },
    {
        role: "Full Stack Developer",
        company: "Freelancing",
        logo: freelanceLogo,
        period: "Nov 2024 – Oct 2025",
        description:
            "Delivered end-to-end solutions for multiple clients, focusing on scalability, security, and clean user experiences.",
        points: [
            "Built full-stack web applications",
            "Integrated REST APIs and authentication",
            "Handled deployment and production support",
        ],
    },
    {
        role: "Full Stack Developer Intern",
        company: "Internship",
        logo: internshipLogo,
        period: "Apr 2024 – Oct 2024",
        description:
            "Worked across frontend and backend, contributing to production features and API development.",
        points: [
            "Developed REST APIs using Django & Flask",
            "Implemented JWT authentication",
            "Worked with relational databases",
        ],
    },
]

export default function WorkExperienceTimeline() {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
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

    // Theme-based styles
    const getSectionBackground = () => {
        return isDark
            ? "relative mt-28"
            : "relative mt-28"
    }

    const getHeaderTextColor = () => {
        return isDark ? "text-white" : "text-gray-900"
    }

    const getIconColor = () => {
        return isDark ? "text-emerald-400" : "text-emerald-600"
    }

    const getTimelineSpineColor = () => {
        return isDark
            ? "bg-gradient-to-b from-emerald-500/40 via-emerald-500/20 to-transparent"
            : "bg-gradient-to-b from-emerald-600/40 via-emerald-600/20 to-transparent"
    }

    const getNodeColor = (isCurrent?: boolean) => {
        if (isCurrent) {
            return isDark ? "bg-emerald-400" : "bg-emerald-500"
        }
        return isDark ? "bg-emerald-300" : "bg-emerald-400"
    }

    const getNodeGlow = () => {
        return isDark
            ? "shadow-[0_0_0_6px_rgba(16,185,129,0.15)]"
            : "shadow-[0_0_0_6px_rgba(16,185,129,0.1)]"
    }

    const getCurrentBadgeStyle = () => {
        return isDark
            ? "bg-emerald-500/15 text-emerald-300"
            : "bg-emerald-500/10 text-emerald-600"
    }

    const getCardBackground = () => {
        return isDark
            ? "bg-white/5 backdrop-blur-xl border border-white/10"
            : "bg-white/80 backdrop-blur-xl border border-gray-200"
    }

    const getCardHoverEffect = () => {
        return isDark
            ? "hover:border-emerald-400/40 hover:shadow-[0_10px_40px_rgba(16,185,129,0.12)]"
            : "hover:border-emerald-600/40 hover:shadow-[0_10px_40px_rgba(16,185,129,0.15)]"
    }

    const getRoleColor = () => {
        return isDark ? "text-white" : "text-gray-900"
    }

    const getCompanyColor = () => {
        return isDark ? "text-gray-400" : "text-gray-600"
    }

    const getPeriodBadgeStyle = () => {
        return isDark
            ? "text-emerald-300 bg-emerald-500/10"
            : "text-emerald-600 bg-emerald-500/10"
    }

    const getDescriptionColor = () => {
        return isDark ? "text-gray-300" : "text-gray-700"
    }

    const getListColor = () => {
        return isDark ? "text-gray-400" : "text-gray-600"
    }

    const getListItemDotColor = () => {
        return isDark ? "bg-emerald-400" : "bg-emerald-500"
    }

    const getLogoBackground = () => {
        return isDark
            ? "bg-white/90 ring-1 ring-black/10"
            : "bg-white ring-1 ring-gray-200"
    }

    return (
        <section id="work" className={getSectionBackground()}>

            {/* HEADER */}
            <div className="flex items-center gap-3 mb-20 justify-center">
                <Briefcase className={`w-7 h-7 ${getIconColor()}`} />
                <h2 className={`text-2xl sm:text-3xl font-bold ${getHeaderTextColor()}`}>
                    Work Experience
                </h2>
            </div>

            {/* TIMELINE */}
            <div className="relative mx-auto max-w-[900px] px-4">

                {/* TIMELINE SPINE */}
                <div
                    className={`absolute left-4 sm:left-1/2 top-0 bottom-0 w-px ${getTimelineSpineColor()} sm:-translate-x-1/2`}
                />

                <div className="space-y-20">
                    {experiences.map((exp, index) => {
                        const isLeft = index % 2 === 0

                        return (
                            <motion.div
                                key={exp.role}
                                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: false, margin: "-140px" }}
                                transition={{ duration: 0.45, ease: "easeOut" }}
                                className={`relative flex flex-col sm:flex-row
                  ${isLeft ? "sm:justify-start" : "sm:justify-end"}`}
                            >

                                {/* NODE */}
                                <motion.div
                                    initial={{ scale: 0.6, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`absolute left-4 sm:left-1/2 top-6 w-3 h-3 rounded-full
                    ${getNodeColor(exp.current)} ${getNodeGlow()}
                    sm:-translate-x-1/2`}
                                >
                                    {exp.current && (
                                        <span className={`absolute -top-6 left-1/2 -translate-x-1/2
                      text-[10px] px-2 py-0.5 rounded-full ${getCurrentBadgeStyle()} z-50`}>
                                            CURRENT
                                        </span>
                                    )}
                                </motion.div>

                                {/* CARD */}
                                <div
                                    className={`mt-2 w-full sm:w-[440px]
                    ${isLeft ? "sm:pr-14" : "sm:pl-14"}`}
                                >
                                    <motion.div
                                        whileHover={{ y: -2 }}
                                        transition={{ duration: 0.2 }}
                                        className={`rounded-2xl p-6 transition ${getCardBackground()} ${getCardHoverEffect()}`}
                                    >
                                        {/* HEADER WITH LOGO */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-center gap-3">
                                                {exp.logo && (
                                                    <div
                                                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${getLogoBackground()}`}
                                                    >
                                                        <Image
                                                            src={exp.logo}
                                                            alt={`${exp.company} logo`}
                                                            width={36}
                                                            height={36}
                                                            className="object-contain"
                                                            priority={false}
                                                        />
                                                    </div>
                                                )}


                                                <div>
                                                    <h3 className={`text-lg font-semibold ${getRoleColor()}`}>
                                                        {exp.role}
                                                    </h3>
                                                    <p className={`text-sm ${getCompanyColor()}`}>
                                                        {exp.company}
                                                    </p>
                                                </div>
                                            </div>

                                            <span className={`text-xs px-3 py-1 rounded-full ${getPeriodBadgeStyle()}`}>
                                                {exp.period}
                                            </span>
                                        </div>

                                        {/* DESCRIPTION */}
                                        <p className={`mt-4 text-sm leading-relaxed ${getDescriptionColor()}`}>
                                            {exp.description}
                                        </p>

                                        {/* POINTS */}
                                        <ul className={`mt-5 space-y-2 text-sm z-50 ${getListColor()}`}>
                                            {exp.points.map(point => (
                                                <li key={point} className="flex items-start gap-2">
                                                    <span className={`mt-2 w-1.5 h-1.5 rounded-full ${getListItemDotColor()}`} />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                </div>

                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}