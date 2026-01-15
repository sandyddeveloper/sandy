"use client"

import {
  Github,
  Linkedin,
  Mail,
  CheckCircle,
  Zap,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Heart,
  User,
} from "lucide-react"
import { useState, useEffect } from "react"
import AboutMeModal from "../shared/AboutMeModal"

export default function Footer() {
  const [openAbout, setOpenAbout] = useState(false)
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Theme-based styles
  const getFooterBackground = () => {
    return isDark
      ? "bg-gradient-to-b from-black via-[#041b13] to-black border-t border-emerald-500/20"
      : "bg-gradient-to-b from-gray-50 via-emerald-50/20 to-gray-50 border-t border-emerald-500/30"
  }

  const getGradientLine = () => {
    return isDark
      ? "bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
      : "bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
  }

  const getTitleColor = () => {
    return isDark ? "text-white" : "text-gray-900"
  }

  const getTextColor = () => {
    return isDark ? "text-gray-400" : "text-gray-600"
  }

  const getSubtitleColor = () => {
    return isDark ? "text-emerald-400" : "text-emerald-600"
  }

  const getAboutButtonStyle = () => {
    return isDark
      ? "!bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:!bg-emerald-500/20"
      : "!bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 hover:!bg-emerald-500/20"
  }

  const getSectionTitleColor = () => {
    return isDark ? "text-gray-300" : "text-gray-700"
  }

  const getListIconColor = () => {
    return isDark ? "text-emerald-400" : "text-emerald-600"
  }

  const getLinkColor = () => {
    return isDark
      ? "text-gray-400 hover:text-emerald-400"
      : "text-gray-600 hover:text-emerald-600"
  }

  const getExternalIconColor = () => {
    return isDark ? "opacity-60" : "opacity-70"
  }

  const getDividerColor = () => {
    return isDark
      ? "bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"
      : "bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"
  }

  const getCopyrightColor = () => {
    return isDark ? "text-gray-400" : "text-gray-600"
  }

  const getHeartColor = () => {
    return isDark ? "text-emerald-400" : "text-emerald-600"
  }

  const getScrollButtonStyle = () => {
    return isDark
      ? "bg-white/5 backdrop-blur border border-white/10 text-gray-300 hover:text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/10"
      : "bg-white/80 backdrop-blur border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-500/40 hover:bg-emerald-500/10"
  }

  const getLocationColor = () => {
    return isDark ? "text-gray-400" : "text-gray-600"
  }

  return (
    <>
      <footer className={`relative ${getFooterBackground()}`}>

        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px ${getGradientLine()}`} />

        <div className="relative mx-auto max-w-[1100px] px-4 py-14">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div>
              <h3 className={`text-xl font-semibold tracking-wide ${getTitleColor()}`}>
                Santhoshraj's Portfolio
              </h3>

              <p className={`mt-3 text-sm leading-relaxed ${getTextColor()}`}>
                I build modern, scalable, and performance-focused web applications
                using clean architecture and thoughtful UI design.
              </p>

              <div className={`mt-4 flex items-center gap-2 text-sm ${getSubtitleColor()}`}>
                <Zap className="w-4 h-4" />
                Open to opportunities & collaborations
              </div>

              <button
                onClick={() => setOpenAbout(true)}
                className={`
                  mt-5 inline-flex items-center gap-2
                  px-4 py-2
                  rounded-xl
                  transition 
                  ${getAboutButtonStyle()}
                `}
              >
                <User className="w-4 h-4" />
                About Me
              </button>
            </div>

            {/* PRINCIPLES */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider ${getSectionTitleColor()}`}>
                Work Principles
              </h4>

              <ul className={`mt-3 space-y-2 ${getTextColor()}`}>
                {[
                  "Performance-first approach",
                  "Clean & readable code",
                  "Scalable architecture",
                  "Long-term maintainability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${getListIconColor()}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CONNECT */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider ${getSectionTitleColor()}`}>
                Connect
              </h4>

              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a
                  href="mailto:santhoshrajk1812@gmail.com"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <Mail className="w-4 h-4" />
                  santhoshrajk1812@gmail.com
                </a>

                <a
                  href="https://github.com/sandyddeveloper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ArrowUpRight className={`w-3 h-3 ${getExternalIconColor()}`} />
                </a>

                <a
                  href="www.linkedin.com/in/santhoshraj-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ArrowUpRight className={`w-3 h-3 ${getExternalIconColor()}`} />
                </a>

                <div className={`flex items-center gap-3 ${getLocationColor()}`}>
                  <MapPin className="w-4 h-4" />
                  India · Remote Friendly
                </div>
              </div>
            </div>
          </div>

          <div className={`my-10 h-px ${getDividerColor()}`} />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className={`flex items-center gap-1 ${getCopyrightColor()}`}>
              © {new Date().getFullYear()} Built with
              <Heart className={`w-4 h-4 mx-1 ${getHeartColor()}`} />
              by Santhoshraj K
            </p>
          </div>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
              absolute bottom-6 right-4 sm:right-6
              w-11 h-11
              rounded-full
              transition
              flex items-center justify-center
              ${getScrollButtonStyle()}
            `}
          >
            <ArrowUp className="w-5 h-5" />
          </button>

        </div>
      </footer>

      <AboutMeModal
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        isDark={isDark}
      />
    </>
  )
}