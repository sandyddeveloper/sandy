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
}

/* ================= COUNTER ================= */

function AnimatedCounter({ value, label }: { value: number; label: string }) {
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

    return (
        <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                {count}+
            </div>
            <div className="text-xs text-gray-400 mt-1">
                {label}
            </div>
        </div>
    )
}

/* ================= MODAL ================= */

export default function AboutMeModal({ open, onClose }: Props) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70 backdrop-blur-sm
            px-4 z-999
          "
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: 40, scale: 0.96 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 40, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        onClick={e => e.stopPropagation()}
                        className="
              relative
              w-full max-w-6xl
              max-h-[90vh]
              overflow-y-auto
              bg-[#041b13]
              border border-white/10
              rounded-[32px]
              p-6 sm:p-10 lg:p-14 
            "
                    >
                        {/* CLOSE */}
                        <button
                            onClick={onClose}
                            className="absolute top-5 right-5 text-gray-400 hover:text-white"
                        >
                            <X />
                        </button>

                        {/* HEADER */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-14">

                            {/* PROFILE */}
                            <div className="flex flex-col items-center text-center lg:text-left lg:items-start">
                                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden
                  border-4 border-emerald-500/30 shadow-lg shadow-emerald-500/30">
                                    <Image
                                        src="/images/avatar/profile.png" // <-- add your photo here
                                        alt="Santhoshraj"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>

                                <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-white">
                                    Santhoshraj
                                </h2>

                                <p className="mt-2 text-sm text-gray-400">
                                    Full Stack Developer
                                </p>

                                {/* RESUME */}
                                <a
                                    href="/resume/Santhoshraj-Resume.pdf"
                                    download
                                    className="
                    mt-6 inline-flex items-center gap-2
                    px-5 py-2.5
                    rounded-xl
                    bg-emerald-500/15 text-emerald-300
                    border border-emerald-500/25
                    hover:bg-emerald-500/25
                    transition
                  "
                                >
                                    <Download size={16} />
                                    Download Resume
                                </a>
                            </div>

                            {/* SUMMARY */}
                            <div className="lg:col-span-2">
                                <p className="text-gray-300 leading-relaxed max-w-3xl">
                                    Full Stack Developer with strong experience in building scalable,
                                    performance-driven web applications using modern frontend and backend technologies.
                                </p>

                                <p className="mt-4 text-gray-400 max-w-3xl">
                                    BCA graduate (2024) from Agurchand Manmull Jain College, trained at QSpiders
                                    in SQL & Web Technologies. Completed a 6-month internship at Shiash as a
                                    Python Full Stack / Django Developer, followed by 1 year of freelancing
                                    delivering 6+ live projects. Currently working at{" "}
                                    <a
                                        href="https://datamoo.ai/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-emerald-400 hover:underline"
                                    >
                                        DataMoo.ai <ExternalLink size={14} />
                                    </a>.
                                </p>
                            </div>
                        </div>

                        {/* COUNTERS */}
                        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto mb-16">
                            <AnimatedCounter value={1} label="Years Experience" />
                            <AnimatedCounter value={4} label="Live Projects" />
                            <AnimatedCounter value={1} label="Years Freelancing" />
                        </div>

                        {/* TIMELINE */}
                        <Section title="Journey">
                            <TimelineItem
                                icon={GraduationCap}
                                title="Education"
                                content="BCA completed in 2024 from Agurchand Manmull Jain College."
                            />
                            <TimelineItem
                                icon={Code2}
                                title="Training"
                                content="SQL & Web Technologies course at QSpiders."
                            />
                            <TimelineItem
                                icon={Briefcase}
                                title="Internship"
                                content="6-month internship at Shiash as Python Full Stack / Django Developer."
                            />
                            <TimelineItem
                                icon={Code2}
                                title="Major Project"
                                content="Developed 'Aluminium Pro' — a manufacturing application for aluminium material tracking, wastage, loss, and profiling."
                            />
                            <TimelineItem
                                icon={Briefcase}
                                title="Current Role"
                                content="Working at DataMoo.ai on scalable, data-driven applications."
                            />
                        </Section>

                        {/* SKILLS */}
                        <Section title="Skills & Tools">
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
                                        className="
                      text-sm px-4 py-1.5 rounded-full
                      bg-emerald-500/10 text-emerald-300
                      border border-emerald-500/20
                    "
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </Section>

                        {/* FOOTER */}
                        <div className="mt-16 pt-8 border-t border-white/10 text-center">
                            <p className="text-sm text-gray-400 max-w-3xl mx-auto">
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-14">
            <h3 className="mb-6 text-sm font-semibold tracking-wider text-emerald-400 uppercase">
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
}: {
    icon: any
    title: string
    content: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="flex gap-4 mb-6"
        >
            <div className="w-10 h-10 flex items-center justify-center
        rounded-full bg-emerald-500/10 text-emerald-400">
                <Icon size={18} />
            </div>
            <div>
                <h4 className="text-sm font-semibold text-white">
                    {title}
                </h4>
                <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                    {content}
                </p>
            </div>
        </motion.div>
    )
}
