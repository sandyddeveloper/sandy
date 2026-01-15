"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"


const projects = [
    {
        id: 1,
        title: "Employee Attendance System",
        description:
            "An in-progress employee attendance management system with role-based access and reporting.",
        longDescription:
            "Currently developing a scalable employee attendance system focused on real-time tracking, shift management, role-based access control, and reporting. The platform is being designed to handle large datasets efficiently while maintaining performance, security, and a clean administrative experience.",
        image: "/images/projects/project2.png",
        tech: ["React", "Django", "PostgreSQL"],
        metrics: {
            users: "In progress",
            load: "Optimizing",
            impact: "Operational efficiency",
        },
        live: "https://comming-soon-seven-ivory.vercel.app/coming-soon",
        github: "https://github.com/sandyddeveloper/Noventra-Dynamic-Tech-Solutions",
    },
    {
        id: 2,
        title: "Mesmerizing Moments Website",
        description:
            "A visually rich event showcase website highlighting wedding and celebration decorations.",
        longDescription:
            "Designed and developed a modern event showcase website for Mesmerizing Moments, featuring elegant layouts, smooth animations, and responsive design to present wedding, reception, and celebration decorations. The site focuses on visual storytelling, fast performance, and an engaging user experience for potential clients.",
        image: "/images/projects/project1.png",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        metrics: {
            users: "1k+",
            load: "1.5s",
            impact: "High client engagement",
        },
        live: "https://mmevents.vercel.app/",
        github: "https://github.com/sandyddeveloper/Decoration_Freelancing-12",
    },
    {
        id: 3,
        title: "Developer Portfolio",
        description:
            "A personal developer portfolio showcasing projects, skills, and experience with smooth animations.",
        longDescription:
            "Designed and developed a high-performance personal portfolio to highlight projects, technical skills, and professional experience. Built with a strong focus on clean UI/UX, accessibility, responsive design, and smooth motion effects to create a memorable personal brand presence.",
        image: "/images/projects/project3.png",
        tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
        metrics: {
            users: "Public",
            load: "0.8s",
            impact: "Personal branding",
        },
        live: "https://example.com",
        github: "https://github.com/sandyddeveloper/sandy",
    }

]


export default function ProjectsSection() {
    const [activeProject, setActiveProject] = useState<any | null>(null)
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
            ? "bg-gradient-to-b from-black via-[#041b13] to-black"
            : "bg-gradient-to-b from-gray-50 via-emerald-50/20 to-gray-50"
    }

    const getHeaderTextColor = () => {
        return isDark ? "text-white" : "text-gray-900"
    }

    const getSubtitleColor = () => {
        return isDark ? "text-gray-400" : "text-gray-600"
    }

    const getCardBackground = () => {
        return isDark
            ? "bg-white/5 backdrop-blur-xl border border-white/10"
            : "bg-white/80 backdrop-blur-xl border border-gray-200"
    }

    const getCardHoverEffect = () => {
        return isDark
            ? "hover:border-emerald-400/40"
            : "hover:border-emerald-600/40"
    }

    const getCardTitleColor = () => {
        return isDark ? "text-white" : "text-gray-900"
    }

    const getCardDescriptionColor = () => {
        return isDark ? "text-gray-400" : "text-gray-600"
    }

    const getTechTagStyle = () => {
        return isDark
            ? "bg-emerald-500/10 text-emerald-300"
            : "bg-emerald-500/10 text-emerald-700"
    }

    const getHoverGlow = () => {
        return isDark
            ? "bg-emerald-500/5 opacity-0 group-hover:opacity-100"
            : "bg-emerald-500/10 opacity-0 group-hover:opacity-50"
    }

    const getImageOverlay = () => {
        return isDark
            ? "bg-black/40 opacity-0 group-hover:opacity-100"
            : "bg-black/20 opacity-0 group-hover:opacity-100"
    }

    const getModalBackground = () => {
        return isDark
            ? "bg-black/70 backdrop-blur-sm"
            : "bg-black/40 backdrop-blur-sm"
    }

    const getModalCardBackground = () => {
        return isDark
            ? "bg-[#041b13] border border-white/10"
            : "bg-white border border-gray-200"
    }

    const getModalTitleColor = () => {
        return isDark ? "text-white" : "text-gray-900"
    }

    const getModalDescriptionColor = () => {
        return isDark ? "text-gray-300" : "text-gray-700"
    }

    const getModalTechTagStyle = () => {
        return isDark
            ? "bg-emerald-500/15 text-emerald-300"
            : "bg-emerald-500/10 text-emerald-600"
    }

    const getLiveLinkColor = () => {
        return isDark ? "text-emerald-400" : "text-emerald-600"
    }

    const getGithubLinkColor = () => {
        return isDark ? "text-gray-300" : "text-gray-600"
    }

    const getCloseButtonColor = () => {
        return isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
    }

    return (
        <section
            id="projects"
            className={`relative mt-28 ${getSectionBackground()}`}
        >
            <div className="mx-auto max-w-[1100px] px-4 py-20">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h2 className={`text-3xl sm:text-4xl font-bold ${getHeaderTextColor()}`}>
                        Projects
                    </h2>
                    <p className={`mt-3 max-w-xl mx-auto text-sm sm:text-base ${getSubtitleColor()}`}>
                        Selected work focused on performance, scalability, and impact.
                    </p>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.35, delay: i * 0.05 }}
                            onClick={() => setActiveProject(project)}
                            className={`group relative cursor-pointer rounded-2xl p-6 transition ${getCardBackground()} ${getCardHoverEffect()}`}
                        >
                            {/* IMAGE PREVIEW (HOVER) */}
                            <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className={`absolute inset-0 transition ${getImageOverlay()}`} />
                            </div>

                            {/* CONTENT */}
                            <h3 className={`text-lg font-semibold ${getCardTitleColor()}`}>
                                {project.title}
                            </h3>

                            <p className={`mt-2 text-sm ${getCardDescriptionColor()}`}>
                                {project.description}
                            </p>

                            {/* METRICS */}
                            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                                <Metric
                                    label="Users"
                                    value={project.metrics.users}
                                    isDark={isDark}
                                />
                                <Metric
                                    label="Load"
                                    value={project.metrics.load}
                                    isDark={isDark}
                                />
                                <Metric
                                    label="Impact"
                                    value={project.metrics.impact}
                                    isDark={isDark}
                                />
                            </div>

                            {/* TECH */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span
                                        key={t}
                                        className={`text-xs px-3 py-1 rounded-full ${getTechTagStyle()}`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* HOVER GLOW */}
                            <div className={`pointer-events-none absolute inset-0 rounded-2xl transition ${getHoverGlow()}`} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* PROJECT MODAL */}
            <AnimatePresence>
                {activeProject && (
                    <ProjectModal
                        project={activeProject}
                        onClose={() => setActiveProject(null)}
                        isDark={isDark}
                        getModalBackground={getModalBackground}
                        getModalCardBackground={getModalCardBackground}
                        getModalTitleColor={getModalTitleColor}
                        getModalDescriptionColor={getModalDescriptionColor}
                        getModalTechTagStyle={getModalTechTagStyle}
                        getLiveLinkColor={getLiveLinkColor}
                        getGithubLinkColor={getGithubLinkColor}
                        getCloseButtonColor={getCloseButtonColor}
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

/* ================= HELPERS ================= */

function Metric({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
    const getBackground = () => {
        return isDark ? "bg-black/30" : "bg-gray-100"
    }

    const getValueColor = () => {
        return isDark ? "text-emerald-300" : "text-emerald-600"
    }

    const getLabelColor = () => {
        return isDark ? "text-gray-400" : "text-gray-500"
    }

    return (
        <div className={`rounded-lg p-2 text-center ${getBackground()}`}>
            <div className={`font-semibold ${getValueColor()}`}>{value}</div>
            <div className={`text-[10px] ${getLabelColor()}`}>{label}</div>
        </div>
    )
}

/* ================= MODAL ================= */

function ProjectModal({
    project,
    onClose,
    isDark,
    getModalBackground,
    getModalCardBackground,
    getModalTitleColor,
    getModalDescriptionColor,
    getModalTechTagStyle,
    getLiveLinkColor,
    getGithubLinkColor,
    getCloseButtonColor
}: {
    project: any
    onClose: () => void
    isDark: boolean
    getModalBackground: () => string
    getModalCardBackground: () => string
    getModalTitleColor: () => string
    getModalDescriptionColor: () => string
    getModalTechTagStyle: () => string
    getLiveLinkColor: () => string
    getGithubLinkColor: () => string
    getCloseButtonColor: () => string
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center px-4 ${getModalBackground()}`}
        >
            <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ duration: 0.3 }}
                className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 ${getModalCardBackground()}`}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 ${getCloseButtonColor()}`}
                >
                    <X />
                </button>

                <h3 className={`text-2xl font-bold ${getModalTitleColor()}`}>
                    {project.title}
                </h3>

                <p className={`mt-4 text-sm ${getModalDescriptionColor()}`}>
                    {project.longDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    {project.tech.map((t: string) => (
                        <span
                            key={t}
                            className={`text-xs px-3 py-1 rounded-full ${getModalTechTagStyle()}`}
                        >
                            {t}
                        </span>
                    ))}
                </div>

                <div className="mt-8 flex items-center gap-6">
                    {project.live && (
                        <a
                            href={project.live}
                            target="_blank"
                            className={`inline-flex items-center gap-2 ${getLiveLinkColor()}`}
                        >
                            <ExternalLink size={18} />
                            Live
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            className={`inline-flex items-center gap-2 ${getGithubLinkColor()}`}
                        >
                            <Github size={18} />
                            Code
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}