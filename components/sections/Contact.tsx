"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"
import { sendMail } from "@/app/actions/sendMail"
import {
    User,
    Mail,
    Phone,
    MessageSquare,
    Send,
} from "lucide-react"
import ThankYouModal from "../shared/ThankYouModal"

/* ================= COMPONENT ================= */

export default function ContactSection() {
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    /* ---------- KEYBOARD SHORTCUTS ---------- */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.altKey) {
                if (e.key === "n") focus("firstName")
                if (e.key === "l") focus("lastName")
                if (e.key === "e") focus("email")
                if (e.key === "p") focus("phone")
                if (e.key === "m") focus("message")
            }
            if (e.ctrlKey && e.key === "Enter") {
                document.querySelector<HTMLButtonElement>('button[type="submit"]')?.click()
            }
        }

        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [])

    const focus = (name: string) =>
        document.querySelector<HTMLInputElement | HTMLTextAreaElement>(
            `[name="${name}"]`
        )?.focus()

    /* ---------- SUBMIT ---------- */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const form = e.currentTarget

        // 🛡️ Honeypot
        if ((form as any).company?.value) {
            setLoading(false)
            return
        }

        const data = {
            firstName: (form as any).firstName.value,
            lastName: (form as any).lastName.value,
            email: (form as any).email.value,
            phone: (form as any).phone.value,
            subject: (form as any).subject.value,
            message: (form as any).message.value,
        }

        const res = await sendMail(data)
        setLoading(false)

        if (res.success) {
            toast.success("Message sent successfully 🚀")
            form.reset()
            setTimeout(() => setShowModal(true), 600)
        } else {
            toast.error("Failed to send message ❌")
        }
    }

    return (
        <section id="contact" className="relative mt-28 border-t border-emerald-500/15 bg-black overflow-hidden">
            <Toaster 
                position="top-right"
                toastOptions={{
                    className: "text-sm sm:text-base",
                }}
            />
            <ThankYouModal open={showModal} onClose={() => setShowModal(false)} />

            {/* 🌿 GREEN FLASH BACKGROUND */}
            <BackgroundGlow />

            <div className="relative mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 z-10">
                {/* HEADER */}
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Contact
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm sm:text-base">
                        Let's connect — send me a message
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6
          "
                >
                    {/* HONEYPOT */}
                    <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                        className="hidden"
                    />

                    {/* NAMES - Responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <FloatingInput
                            name="firstName"
                            label="First Name"
                            icon={User}
                            shortcut="Alt + N"
                        />
                        <FloatingInput
                            name="lastName"
                            label="Last Name"
                            icon={User}
                            shortcut="Alt + L"
                        />
                    </div>

                    <FloatingInput
                        name="email"
                        type="email"
                        label="Email"
                        icon={Mail}
                        shortcut="Alt + E"
                    />

                    <FloatingInput
                        name="phone"
                        label="Phone Number"
                        icon={Phone}
                        shortcut="Alt + P"
                    />

                    <select
                        name="subject"
                        required
                        className="
              w-full px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base md:text-lg bg-black
              border border-white/10 rounded-lg sm:rounded-xl
              text-white focus:border-emerald-400 outline-none
              transition-all duration-200
            "
                    >
                        <option>Job Opportunity</option>
                        <option>Project Collaboration</option>
                        <option>Technical Discussion</option>
                        <option>General Inquiry</option>
                    </select>

                    <FloatingTextarea
                        name="message"
                        label="Message"
                        icon={MessageSquare}
                        shortcut="Alt + M"
                    />

                    {/* Responsive Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
              w-full flex items-center justify-center gap-2 sm:gap-3
              bg-emerald-500 text-black 
              py-3 sm:py-4 
              rounded-lg sm:rounded-xl
              text-sm sm:text-base font-medium 
              hover:bg-emerald-400 transition-all duration-200
              disabled:opacity-60 disabled:cursor-not-allowed
              active:scale-95
              shadow-lg shadow-emerald-500/20
              hover:shadow-emerald-500/40
            "
                    >
                        <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {loading ? "Sending..." : "Send Message"}
                        <span className="hidden sm:inline text-xs opacity-70">(Ctrl + Enter)</span>
                    </button>

                    {/* Mobile shortcut hint */}
                    <div className="sm:hidden text-center">
                        <p className="text-xs text-gray-500">
                            Use <kbd className="px-1.5 py-0.5 mx-1 rounded bg-gray-800 border border-gray-700 text-xs">Alt + key</kbd> shortcuts
                        </p>
                    </div>
                </form>
            </div>
        </section>
    )
}

/* ================= GREEN FLASH BACKGROUND ================= */

function BackgroundGlow() {
    return (
        <>
            {/* MAIN GLOW - Responsive sizing */}
            <motion.div
                animate={{
                    x: [-80, 80, -80],
                    y: [-40, 40, -40],
                    opacity: [0.15, 0.35, 0.15],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
          absolute -top-20 sm:-top-40 left-1/2 -translate-x-1/2
          w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px]
          bg-emerald-500/25
          rounded-full blur-[80px] sm:blur-[120px] md:blur-[140px]
        "
            />

            {/* SOFT FLASH */}
            <motion.div
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
                className="
          absolute inset-0
          bg-gradient-to-t
          from-emerald-500/10
          via-transparent
          to-transparent
        "
            />
        </>
    )
}

/* ================= FLOATING INPUT ================= */

function FloatingInput({ label, icon: Icon, shortcut, ...props }: any) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="relative">
            <Icon className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />

            <input
                {...props}
                required
                onFocus={() => setFocused(true)}
                onBlur={(e) => setFocused(!!e.target.value)}
                className="
          w-full pl-9 sm:pl-12 pr-12 sm:pr-16 
          py-2.5 sm:py-3 md:py-4 
          text-sm sm:text-base md:text-lg 
          bg-black
          border border-white/10 
          rounded-lg sm:rounded-xl
          text-white focus:border-emerald-400 outline-none
          transition-all duration-200
        "
            />

            <motion.label
                animate={{
                    top: focused ? "6px" : "50%",
                    fontSize: focused ? "10px" : "inherit",
                    color: focused ? "#34d399" : "#9ca3af",
                }}
                className="
          absolute left-9 sm:left-12 -translate-y-1/2
          pointer-events-none bg-black px-1
          text-xs sm:text-sm md:text-base
        "
            >
                {label}
            </motion.label>

            {shortcut && (
                <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[10px] sm:text-xs text-gray-500">
                    {shortcut}
                </span>
            )}
        </div>
    )
}

/* ================= FLOATING TEXTAREA ================= */

function FloatingTextarea({ label, icon: Icon, shortcut, ...props }: any) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="relative">
            <Icon className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />

            <textarea
                {...props}
                rows={4}
                required
                onFocus={() => setFocused(true)}
                onBlur={(e) => setFocused(!!e.target.value)}
                className="
          w-full pl-9 sm:pl-12 pr-12 sm:pr-16 
          py-2.5 sm:py-3 md:py-4 
          text-sm sm:text-base md:text-lg
          bg-black/70
          border border-white/10 
          rounded-lg sm:rounded-xl
          text-white outline-none
          transition-all duration-200
          hover:border-emerald-400/40
          focus:border-emerald-400
          focus:shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_0_15px_rgba(52,211,153,0.15)]
          sm:focus:shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_0_25px_rgba(52,211,153,0.15)]
        "
            />

            <motion.label
                animate={{
                    top: focused ? "6px" : "16px",
                    fontSize: focused ? "10px" : "inherit",
                    color: focused ? "#34d399" : "#9ca3af",
                }}
                className="
          absolute left-9 sm:left-12 pointer-events-none
          bg-black px-1
          text-xs sm:text-sm md:text-base
        "
            >
                {label}
            </motion.label>

            {shortcut && (
                <span className="absolute right-3 sm:right-4 top-3 sm:top-4 text-[10px] sm:text-xs text-gray-500">
                    {shortcut}
                </span>
            )}
        </div>
    )
}