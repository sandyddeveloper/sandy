"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"

/* ================= DATA ================= */

const projects = [
    {
        id: 1,
        title: "Employee Attendance System",
        description:
            "A scalable attendance management platform with role-based access, analytics, and reporting.",
        longDescription:
            "Designed and built a full-stack attendance system handling real-time tracking, shift rules, reporting, and admin controls. Optimized for performance and large datasets.",
        image: "/images/projects/project2.png",
        tech: ["React", "TypeScript", "Tailwind", "Django", "PostgreSQL"],
        metrics: {
            users: "5k+",
            load: "1.2s",
            impact: "40% faster ops",
        },
        live: "https://example.com",
        github: "https://github.com/sandyddeveloper/Noventra-Dynamic-Tech-Solutions",
    },
    {
        id: 2,
        title: "Mesmerizing Moments Website",
        description:
            "AI-powered monitoring dashboard with analytics and alerts.",
        longDescription:
            "Built a real-time dashboard integrating AI inference results, alerts, and analytics for surveillance systems.",
        image: "/images/projects/project1.png",
        tech: ["Next.js", "tailwindcss", "framemotion"],
        metrics: {
            users: "1k+",
            load: "1.5s",
            impact: "Realtime connection",
        },
        live: "https://mmevents.vercel.app/",
        github: "https://github.com/sandyddeveloper/Decoration_Freelancing-12",
    },
    {
        id: 3,
        title: "Developer Portfolio",
        description:
            "High-performance portfolio with custom animations and optimized rendering.",
        longDescription:
            "Built a modern portfolio focusing on performance, accessibility, and clean UI/UX with optimized animations.",
        image: "/images/projects/project3.png",
        tech: ["Next.js", "Tailwind", "Framer Motion"],
        metrics: {
            users: "Public",
            load: "0.8s",
            impact: "Personal brand",
        },
        live: "https://example.com",
        github: "https://github.com/sandyddeveloper/sandy",
    },
]

/* ================= COMPONENT ================= */

export default function ProjectsSection() {
    const [activeProject, setActiveProject] = useState<any | null>(null)

    return (
        <section
            id="projects"
            className="relative mt-28 bg-gradient-to-b from-black via-[#041b13] to-black"
        >
            <div className="mx-auto max-w-[1100px] px-4 py-20">

                {/* HEADER */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">
                        Projects
                    </h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
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
                            className="group relative cursor-pointer bg-white/5 backdrop-blur-xl
                border border-white/10 rounded-2xl p-6
                hover:border-emerald-400/40 transition"
                        >
                            {/* IMAGE PREVIEW (HOVER) */}
                            <div className="relative h-40 w-full rounded-xl overflow-hidden mb-4">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500
                    group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0
                  group-hover:opacity-100 transition" />
                            </div>

                            {/* CONTENT */}
                            <h3 className="text-lg font-semibold text-white">
                                {project.title}
                            </h3>

                            <p className="mt-2 text-sm text-gray-400">
                                {project.description}
                            </p>

                            {/* METRICS */}
                            <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-gray-300">
                                <Metric label="Users" value={project.metrics.users} />
                                <Metric label="Load" value={project.metrics.load} />
                                <Metric label="Impact" value={project.metrics.impact} />
                            </div>

                            {/* TECH */}
                            <div className="mt-4 flex flex-wrap gap-2">
                                {project.tech.map(t => (
                                    <span
                                        key={t}
                                        className="text-xs px-3 py-1 rounded-full
                      bg-emerald-500/10 text-emerald-300"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>

                            {/* HOVER GLOW */}
                            <div className="pointer-events-none absolute inset-0 rounded-2xl
                bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition" />
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
                    />
                )}
            </AnimatePresence>
        </section>
    )
}

/* ================= HELPERS ================= */

function Metric({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-black/30 rounded-lg p-2 text-center">
            <div className="text-emerald-300 font-semibold">{value}</div>
            <div className="text-[10px] text-gray-400">{label}</div>
        </div>
    )
}

/* ================= MODAL ================= */

function ProjectModal({
    project,
    onClose,
}: {
    project: any
    onClose: () => void
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center
        bg-black/70 backdrop-blur-sm px-4"
        >
            <motion.div
                initial={{ scale: 0.95, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 30 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-2xl bg-[#041b13]
          border border-white/10 rounded-3xl p-6 sm:p-8"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                    <X />
                </button>

                <h3 className="text-2xl font-bold text-white">
                    {project.title}
                </h3>

                <p className="mt-4 text-sm text-gray-300">
                    {project.longDescription}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                    {project.tech.map((t: string) => (
                        <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-full
                bg-emerald-500/15 text-emerald-300"
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
                            className="inline-flex items-center gap-2 text-emerald-400"
                        >
                            <ExternalLink size={18} />
                            Live
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            className="inline-flex items-center gap-2 text-gray-300"
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
