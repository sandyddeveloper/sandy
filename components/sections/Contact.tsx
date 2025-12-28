"use client"

import { useState, useEffect, useRef } from "react"
import toast, { Toaster } from "react-hot-toast"
import ReCAPTCHA from "react-google-recaptcha"
import { motion, Variants } from "framer-motion"
import {
    FaUser,
    FaPhoneAlt,
    FaPaperPlane,
    FaChevronDown,
    FaShieldAlt
} from "react-icons/fa"
import { IoMdPerson, IoMdMail } from "react-icons/io"
import { RiMessage2Fill } from "react-icons/ri"
import { MdOutlineSubject } from "react-icons/md"
import { sendMail } from "@/app/actions/sendMail"
import ThankYouModal from "../shared/ThankYouModal"
import { BiRefresh } from "react-icons/bi"

/* ================= ANIMATION VARIANTS ================= */

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
}

const buttonVariants: Variants = {
    initial: {
        scale: 1,
        backgroundColor: "#10B981"
    },
    hover: {
        scale: 1.02,
        backgroundColor: "#059669",
        transition: {
            duration: 0.2,
            ease: "easeInOut"
        }
    },
    tap: {
        scale: 0.98
    },
    loading: {
        backgroundColor: "#059669",
        transition: {
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse" as const
        }
    }
}

const errorVariants: Variants = {
    hidden: {
        opacity: 0,
        y: -5,
        height: 0
    },
    visible: {
        opacity: 1,
        y: 0,
        height: "auto",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
}

const captchaVariants: Variants = {
    initial: {
        rotate: 0
    },
    refresh: {
        rotate: 360,
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        }
    }
}

/* ================= VALIDATION ================= */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_REGEX = /^[6-9]\d{9}$/

const DOMAIN_FIXES: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gamil.com": "gmail.com",
    "hotmial.com": "hotmail.com",
    "yaho.com": "yahoo.com",
    "yahooo.com": "yahoo.com",
    "gmal.com": "gmail.com",
    "gmsil.com": "gmail.com",
    "outloock.com": "outlook.com",
    "yaho0.com": "yahoo.com",
}

const normalizeEmail = (email: string) => {
    const clean = email.toLowerCase().trim().replace(/\s+/g, "")
    const [name, domain] = clean.split("@")
    if (!domain) return clean
    return `${name}@${DOMAIN_FIXES[domain] ?? domain}`
}

const isValidEmail = (v: string) => EMAIL_REGEX.test(v)
const isValidPhone = (v: string) => PHONE_REGEX.test(v)

/* ================= ANALYTICS ================= */

const track = (event: string, metadata?: any) => {
    console.log(`[CONTACT_FORM] ${event}`, new Date().toISOString(), metadata)

    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', event, {
            event_category: 'Contact Form',
            ...metadata
        })
    }
}

/* ================= CAPTCHA UTILS ================= */

// FIXED: Moved random generation to client-side only
const createCaptcha = () => {
    // This will only run on client
    if (typeof window === 'undefined') {
        return { a: 5, b: 3, op: '+', answer: 8 } // Default static value for SSR
    }

    const operations = ['+', '-', '×']
    const op = operations[Math.floor(Math.random() * operations.length)]
    let a = Math.floor(Math.random() * 9) + 1
    let b = Math.floor(Math.random() * 9) + 1
    let answer: number

    switch (op) {
        case '+': answer = a + b; break
        case '-':
            if (a < b) [a, b] = [b, a]
            answer = a - b
            break
        case '×':
            a = Math.floor(Math.random() * 5) + 1
            b = Math.floor(Math.random() * 5) + 1
            answer = a * b
            break
        default: answer = a + b
    }

    return { a, b, op, answer }
}

/* ================= COMPONENT ================= */

export default function ContactSection() {
    const [hasMounted, setHasMounted] = useState(false) // ✅ Add this
    const [loading, setLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)

    const [emailError, setEmailError] = useState<string | null>(null)
    const [phoneError, setPhoneError] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "Job Opportunity",
        message: "",
    })

    const [focusedField, setFocusedField] = useState<string | null>(null)

    /* CAPTCHA */
    const [captcha, setCaptcha] = useState<{ a: number; b: number; op: string; answer: number } | null>(null)
    const [captchaInput, setCaptchaInput] = useState("")
    const [captchaError, setCaptchaError] = useState<string | null>(null)
    const [captchaFails, setCaptchaFails] = useState(0)
    const [isCaptchaReady, setIsCaptchaReady] = useState(false)

    /* reCAPTCHA */
    const [showRecaptcha, setShowRecaptcha] = useState(false)
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
    const recaptchaRef = useRef<ReCAPTCHA>(null)

    /* Form refs */
    const formRef = useRef<HTMLFormElement>(null)

    // ✅ Add this useEffect for client-only rendering
    useEffect(() => {
        setHasMounted(true)
    }, [])

    /* Initialize - CLIENT SIDE ONLY */
    useEffect(() => {
        if (!hasMounted) return // ✅ Only run on client

        setCaptcha(createCaptcha())
        setIsCaptchaReady(true)

        track("view")

        const saved = sessionStorage.getItem('contact_form_data')
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setFormData(parsed)
            } catch (e) {
                console.error("Failed to load saved form data:", e)
            }
        }
    }, [hasMounted])

    /* Save form data */
    const updateFormData = (field: string, value: string) => {
        if (!hasMounted) return // ✅ Guard client-only operations
        const newData = { ...formData, [field]: value }
        setFormData(newData)
        sessionStorage.setItem('contact_form_data', JSON.stringify(newData))
    }

    /* Keyboard shortcuts */
    useEffect(() => {
        if (!hasMounted) return // ✅ Only run on client

        const handler = (e: KeyboardEvent) => {
            if (e.altKey) {
                const map: Record<string, string> = {
                    n: "firstName",
                    l: "lastName",
                    e: "email",
                    p: "phone",
                    s: "subject",
                    m: "message",
                    c: "captcha"
                }
                if (map[e.key]) {
                    const element = document.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
                        `[name="${map[e.key]}"]`
                    )
                    if (element) {
                        element.focus()
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                        setFocusedField(map[e.key])
                    }
                }
            }
            if (e.ctrlKey && e.key === "Enter") {
                const submitBtn = document.querySelector<HTMLButtonElement>('button[type="submit"]')
                if (submitBtn) {
                    submitBtn.click()
                    toast("Submitting form...", {
                        duration: 1500
                    })
                }
            }
        }
        window.addEventListener("keydown", handler)
        return () => window.removeEventListener("keydown", handler)
    }, [hasMounted])

    /* Reset form completely */
    const resetForm = () => {
        if (!hasMounted) return // ✅ Guard client-only operations

        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            subject: "Job Opportunity",
            message: "",
        })

        setFocusedField(null)
        setEmailError(null)
        setPhoneError(null)
        setCaptcha(createCaptcha())
        setCaptchaInput("")
        setCaptchaError(null)
        setCaptchaFails(0)
        setShowRecaptcha(false)
        setRecaptchaToken(null)
        recaptchaRef.current?.reset()
        sessionStorage.removeItem('contact_form_data')

        if (formRef.current) {
            formRef.current.reset()
        }
    }

    /* Refresh captcha */
    const refreshCaptcha = () => {
        if (!hasMounted) return // ✅ Guard client-only operations

        setCaptcha(createCaptcha())
        setCaptchaInput("")
        setCaptchaError(null)

        toast.success("CAPTCHA refreshed!", {
            duration: 1500,
        })
    }

    /* Handle reCAPTCHA change */
    const handleRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token)
        if (token) {
            toast.success("reCAPTCHA verified!", {
                duration: 2000,
            })
        }
    }

    /* Show reCAPTCHA widget */
    const showRecaptchaWidget = () => {
        setShowRecaptcha(true)
        toast.error("Too many failed attempts. Please complete the reCAPTCHA verification.")
    }

    /* Submit */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!hasMounted) return // ✅ Guard client-only operations

        const loadingToast = toast.loading("Validating your information...", {
            duration: Infinity,
        })

        setLoading(true)
        track("submit_attempt")

        const form = e.currentTarget as HTMLFormElement
        const formDataObj = new FormData(form)

        /* Honeypot */
        if (formDataObj.get("company")) {
            toast.dismiss(loadingToast)
            toast.error("Submission blocked by security filter")
            setLoading(false)
            track("honeypot_triggered")
            return
        }

        const email = normalizeEmail(formDataObj.get("email") as string)
        const phone = (formDataObj.get("phone") as string).replace(/\D/g, "")

        /* Email validation */
        if (!isValidEmail(email)) {
            toast.dismiss(loadingToast)
            setEmailError("Please enter a valid email address")
            toast.error("Please enter a valid email address")
            document.querySelector<HTMLInputElement>('[name="email"]')?.focus()
            setFocusedField("email")
            setLoading(false)
            track("validation_failed", { field: "email", value: email })
            return
        }

        /* Phone validation */
        if (!isValidPhone(phone)) {
            toast.dismiss(loadingToast)
            setPhoneError("Please enter a valid 10-digit mobile number starting with 6-9")
            toast.error("Please enter a valid 10-digit mobile number starting with 6-9")
            document.querySelector<HTMLInputElement>('[name="phone"]')?.focus()
            setFocusedField("phone")
            setLoading(false)
            track("validation_failed", { field: "phone", value: phone })
            return
        }

        /* CAPTCHA validation */
        if (!captcha || Number(captchaInput) !== captcha.answer) {
            const newFails = captchaFails + 1
            setCaptchaFails(newFails)

            toast.dismiss(loadingToast)

            if (newFails < 3) {
                const attemptsLeft = 3 - newFails
                setCaptchaError(`Incorrect answer. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining.`)
                toast.error(`Incorrect CAPTCHA answer. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} remaining.`)

                setCaptcha(createCaptcha())
                setCaptchaInput("")
                document.querySelector<HTMLInputElement>('[name="captcha"]')?.focus()
                setFocusedField("captcha")
            } else {
                showRecaptchaWidget()
            }

            setLoading(false)
            track("captcha_failed", { attempts: newFails })
            return
        }

        /* reCAPTCHA validation - only if triggered */
        if (showRecaptcha && !recaptchaToken) {
            toast.dismiss(loadingToast)
            toast.error("Please complete the reCAPTCHA verification")
            setLoading(false)
            return
        }

        /* Prepare data */
        const data = {
            firstName: (formDataObj.get("firstName") as string).trim(),
            lastName: (formDataObj.get("lastName") as string).trim(),
            email,
            phone,
            subject: formDataObj.get("subject") as string,
            message: (formDataObj.get("message") as string).trim(),
            timestamp: new Date().toISOString(),
            captchaFails,
            requiresRecaptcha: showRecaptcha,
            recaptchaToken
        }

        /* Update loading toast */
        toast.loading("Sending your message...", {
            id: loadingToast,
            duration: Infinity,
        })

        /* Send email */
        try {
            const res = await sendMail(data)

            if (res.success) {
                toast.dismiss(loadingToast)
                toast.success("Message sent successfully! I'll get back to you within 24 hours.")

                track("submit_success", { ...data, recaptchaToken: !!recaptchaToken })

                /* Clean reset after submit */
                setTimeout(() => {
                    resetForm()
                    toast.success("Form has been reset", {
                        duration: 2000,
                    })
                }, 1000)

                /* Show thank you modal */
                setTimeout(() => {
                    setShowModal(true)
                }, 1500)
            } else {
                throw new Error("Failed to send message")
            }
        } catch (error) {
            toast.dismiss(loadingToast)
            toast.error("Failed to send message. Please try again or contact me directly.")

            track("submit_failed", { error: error instanceof Error ? error.message : "Unknown error" })

            /* Offer retry */
            setTimeout(() => {
                toast.custom(
                    (t) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-amber-400">Message not sent. Want to retry?</p>
                                </div>
                                <button
                                    onClick={() => {
                                        toast.dismiss(t.id)
                                        form.requestSubmit()
                                    }}
                                    className="px-3 py-1 bg-amber-500 text-white text-sm rounded-lg hover:bg-amber-600 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        </motion.div>
                    ),
                    { duration: 10000 }
                )
            }, 2000)
        } finally {
            setLoading(false)
        }
    }

    // ✅ Don't render the form until mounted
    if (!hasMounted) {
        return (
            <section id="contact" className="relative mt-28 bg-black border-t !border-emerald-500/15">
                <div className="mx-auto max-w-[900px] px-4 py-20">
                    {/* Skeleton loader */}
                    <div className="text-center mb-12">
                        <div className="h-12 bg-gray-800/20 rounded-lg w-48 mx-auto mb-4 animate-pulse" />
                        <div className="h-4 bg-gray-700/20 rounded w-32 mx-auto mb-12 animate-pulse" />
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
                        {/* Name row skeleton */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="h-16 bg-gray-800/20 rounded-xl animate-pulse" />
                            <div className="h-16 bg-gray-800/20 rounded-xl animate-pulse" />
                        </div>
                        {/* Other fields skeleton */}
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-16 bg-gray-800/20 rounded-xl animate-pulse" />
                        ))}
                        {/* Submit button skeleton */}
                        <div className="h-14 !bg-emerald-500/20 rounded-xl animate-pulse" />
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="contact" className="relative mt-28 bg-black border-t !border-emerald-500/15">
            <Toaster
                position="top-right"
                gutter={14}
                toastOptions={{
                    duration: 3800,
                    style: {
                        background: "rgba(0, 0, 0, 0.65)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(0, 255, 128, 0.25)",
                        color: "#d4ffd4",
                        padding: "14px 18px",
                        borderRadius: "14px",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
                    },

                    success: {
                        iconTheme: {
                            primary: "#10B981",
                            secondary: "#0D0D0D",
                        },
                        style: {
                            border: "1px solid rgba(16, 185, 129, 0.45)",
                            color: "#C8FFE0",
                        },
                    },

                    error: {
                        iconTheme: {
                            primary: "#EF4444",
                            secondary: "#0D0D0D",
                        },
                        style: {
                            border: "1px solid rgba(239, 68, 68, 0.4)",
                            color: "#FFD2D2",
                        },
                    },

                    loading: {
                        iconTheme: {
                            primary: "#FDE047",
                            secondary: "#0D0D0D",
                        },
                        style: {
                            border: "1px solid rgba(253, 224, 71, 0.4)",
                            color: "#FFF8C8",
                        },
                    },
                }}
            />

            <ThankYouModal open={showModal} onClose={() => setShowModal(false)} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto max-w-[900px] px-4 py-20"
            >
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-white">Contact</h2>
                    <motion.p
                        className="text-gray-400 mt-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Let's connect — send me a message
                    </motion.p>
                </motion.div>

                <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    suppressHydrationWarning // ✅ Add this to suppress hydration warnings
                    className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6"
                >
                    <input type="text" name="company" className="hidden" suppressHydrationWarning />

                    {/* Name Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <motion.div variants={itemVariants} className="relative">
                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onFocus={() => setFocusedField("firstName")}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(e) => updateFormData('firstName', e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                                    suppressHydrationWarning // ✅ Add this
                                />
                                <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${formData.firstName || focusedField === "firstName" ? 'top-2 text-xs text-emerald-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}`}>
                                    First Name
                                </label>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="relative">
                            <div className="relative">
                                <IoMdPerson className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onFocus={() => setFocusedField("lastName")}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(e) => updateFormData('lastName', e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20"
                                    suppressHydrationWarning // ✅ Add this
                                />
                                <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${formData.lastName || focusedField === "lastName" ? 'top-2 text-xs text-emerald-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}`}>
                                    Last Name
                                </label>
                            </div>
                        </motion.div>
                    </div>

                    {/* Email */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative">
                            <IoMdMail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onFocus={() => {
                                    setFocusedField("email")
                                    setEmailError(null)
                                }}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => {
                                    let v = normalizeEmail(e.target.value)
                                    updateFormData('email', v)
                                    if (v && !isValidEmail(v)) {
                                        setEmailError("Invalid email address")
                                    } else {
                                        setEmailError(null)
                                    }
                                }}
                                className={`w-full pl-12 pr-4 py-4 bg-black border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${emailError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-emerald-400'}`}
                                suppressHydrationWarning // ✅ Add this
                            />
                            <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${formData.email || focusedField === "email" ? 'top-2 text-xs text-emerald-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}`}>
                                Email
                            </label>
                        </div>
                        {emailError && (
                            <p className="mt-1 text-xs text-red-400">
                                {emailError}
                            </p>
                        )}
                    </motion.div>

                    {/* Phone */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative">
                            <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                name="phone"
                                type="text"
                                value={formData.phone}
                                onFocus={() => {
                                    setFocusedField("phone")
                                    setPhoneError(null)
                                }}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => {
                                    const v = e.target.value.replace(/\D/g, "")
                                    updateFormData('phone', v)
                                    if (v && !isValidPhone(v)) {
                                        setPhoneError("Invalid 10-digit mobile number")
                                    } else {
                                        setPhoneError(null)
                                    }
                                }}
                                className={`w-full pl-12 pr-4 py-4 bg-black border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${phoneError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-emerald-400'}`}
                                suppressHydrationWarning // ✅ Add this
                            />
                            <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${formData.phone || focusedField === "phone" ? 'top-2 text-xs text-emerald-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}`}>
                                Phone Number
                            </label>
                        </div>
                        {phoneError && (
                            <p className="mt-1 text-xs text-red-400">
                                {phoneError}
                            </p>
                        )}
                    </motion.div>

                    {/* Subject */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative">
                            <MdOutlineSubject className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                                name="subject"
                                value={formData.subject}
                                onFocus={() => setFocusedField("subject")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => updateFormData('subject', e.target.value)}
                                className="w-full pl-12 pr-10 py-4 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 appearance-none"
                                suppressHydrationWarning // ✅ Add this
                            >
                                <option value="Job Opportunity">Job Opportunity</option>
                                <option value="Project Collaboration">Project Collaboration</option>
                                <option value="Technical Discussion">Technical Discussion</option>
                                <option value="General Inquiry">General Inquiry</option>
                                <option value="Freelance Work">Freelance Work</option>
                                <option value="Feedback/Suggestion">Feedback/Suggestion</option>
                            </select>
                            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${formData.subject || focusedField === "subject" ? 'top-2 text-xs text-emerald-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}`}>
                                Subject
                            </label>
                        </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="relative">
                            <RiMessage2Fill className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                            <textarea
                                name="message"
                                rows={4}
                                value={formData.message}
                                onFocus={() => setFocusedField("message")}
                                onBlur={() => setFocusedField(null)}
                                onChange={(e) => updateFormData('message', e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-black border border-white/10 rounded-xl text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                                suppressHydrationWarning // ✅ Add this
                            />
                            <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${formData.message || focusedField === "message" ? 'top-2 text-xs text-emerald-400' : 'top-4 text-gray-400'}`}>
                                Message
                            </label>
                        </div>
                    </motion.div>

                    {/* CAPTCHA */}
                    <motion.div variants={itemVariants}>
                        <div className="flex items-center justify-between mb-1">
                            <label className="text-xs text-gray-400">
                                {isCaptchaReady && captcha ? (
                                    <>Human check: {captcha.a} {captcha.op || '+'} {captcha.b} = ?</>
                                ) : (
                                    <span className="inline-flex items-center gap-2">
                                        <span className="w-20 h-4 bg-white/10 rounded animate-pulse"></span>
                                    </span>
                                )}
                            </label>
                            {isCaptchaReady && captcha && (
                                <button
                                    type="button"
                                    onClick={refreshCaptcha}
                                    className="text-xs text-gray-500 hover:text-emerald-400 transition-colors flex items-center gap-1"
                                >
                                    <span>Refresh</span>
                                    <BiRefresh className="w-3 h-3" />
                                </button>
                            )}
                        </div>

                        {isCaptchaReady ? (
                            <div className="relative">
                                <FaShieldAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    name="captcha"
                                    type="text"
                                    value={captchaInput}
                                    onFocus={() => {
                                        setFocusedField("captcha")
                                        setCaptchaError(null)
                                    }}
                                    onBlur={() => setFocusedField(null)}
                                    onChange={(e) => {
                                        setCaptchaInput(e.target.value)
                                        setCaptchaError(null)
                                    }}
                                    className={`w-full pl-12 pr-4 py-4 bg-black border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${captchaError ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-emerald-400'}`}
                                    suppressHydrationWarning // ✅ Add this
                                />
                                <label className={`absolute left-12 transform transition-all duration-200 pointer-events-none ${captchaInput || focusedField === "captcha" ? 'top-2 text-xs text-emerald-400' : 'top-1/2 -translate-y-1/2 text-gray-400'}`}>
                                    CAPTCHA Answer
                                </label>
                            </div>
                        ) : (
                            <div className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl">
                                <div className="w-24 h-4 bg-white/10 rounded animate-pulse"></div>
                            </div>
                        )}

                        {captchaError && (
                            <p className="mt-1 text-xs text-red-400">
                                {captchaError}
                            </p>
                        )}
                        {captchaFails >= 3 && !showRecaptcha && (
                            <div className="mt-2">
                                <button
                                    type="button"
                                    onClick={showRecaptchaWidget}
                                    className="text-xs text-amber-400 hover:text-amber-300 underline transition-colors"
                                >
                                    Too many failed attempts. Click here to verify with reCAPTCHA.
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* Invisible reCAPTCHA */}
                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                        <div className="flex justify-center">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                                theme="dark"
                                size={showRecaptcha ? "normal" : "invisible"}
                                onChange={handleRecaptchaChange}
                                onErrored={() => {
                                    toast.error("reCAPTCHA verification failed. Please try again.")
                                }}
                                onExpired={() => {
                                    setRecaptchaToken(null)
                                    toast.error("reCAPTCHA verification expired. Please verify again.")
                                }}
                            />
                        </div>
                    )}

                    {/* Submit Button */}
                    <motion.div variants={itemVariants}>
                        <button
                            type="submit"
                            disabled={loading || !isCaptchaReady}
                            className="w-full flex items-center justify-center gap-2 !bg-emerald-500 hover:!bg-emerald-600 text-black py-4 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            suppressHydrationWarning // ✅ Add this
                        >
                            <FaPaperPlane className="w-4 h-4" />
                            {loading ? "Sending..." : "Send Message"}
                        </button>
                    </motion.div>

                    {/* Keyboard shortcuts hint */}
                    <div className="text-center pt-4 border-t border-white/10">
                        <p className="text-xs text-gray-500">
                            Press <kbd className="px-1 py-0.5 bg-black/50 border border-white/10 rounded text-xs">Alt</kbd> + <kbd className="px-1 py-0.5 bg-black/50 border border-white/10 rounded text-xs">Letter</kbd> to focus fields •{" "}
                            Press <kbd className="px-1 py-0.5 bg-black/50 border border-white/10 rounded text-xs">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-black/50 border border-white/10 rounded text-xs">Enter</kbd> to submit
                        </p>
                    </div>
                </motion.form>
            </motion.div>
        </section>
    )
}