"use client"

import { 
  Leaf, 
  Heart, 
  Github, 
  Twitter, 
  Mail, 
  CheckCircle, 
  Zap, 
  ArrowUp, 
  ArrowUpRight, 
  MapPin, 
  User,
  BookOpen,
  FileCode,
  Braces,
  Terminal
} from 'lucide-react';
import Link from "next/link"
import { useState, useEffect } from "react"
import AboutMeModal from "@/components/shared/AboutMeModal"

export default function BlogFooter() {
  const [openAbout, setOpenAbout] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [showScrollButton, setShowScrollButton] = useState(false)

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

    // Show scroll button when scrolling down
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
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

  const getSocialButtonStyle = () => {
    return isDark
      ? "bg-white/5 backdrop-blur border border-white/10 text-gray-300 hover:text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/10"
      : "bg-white/80 backdrop-blur border border-gray-200 text-gray-600 hover:text-emerald-600 hover:border-emerald-500/40 hover:bg-emerald-500/10"
  }

  return (
    <>
      <footer className={`relative ${getFooterBackground()}`}>
        {/* Gradient Line */}
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px ${getGradientLine()}`} />

        <div className="relative mx-auto max-w-[1100px] px-4 py-14">
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                
                <div>
                  <h3 className={`text-xl font-semibold tracking-wide ${getTitleColor()}`}>
                    NDTS Blog
                  </h3>
                 
                </div>
              </div>

              <p className={`mt-3 text-sm leading-relaxed ${getTextColor()}`}>
                Exploring the art of web development with Django. 
                Tips, tutorials, and best practices for Python developers.
              </p>

              <div className={`mt-4 flex items-center gap-2 text-sm ${getSubtitleColor()}`}>
                <Zap className="w-4 h-4" />
                Updated weekly with fresh content
              </div>

              {/* Social Links */}
              <div className="mt-6 flex items-center gap-3">
                <a 
                  href="https://github.com/sandyddeveloper"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl transition ${getSocialButtonStyle()}`}
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className={`p-3 rounded-xl transition ${getSocialButtonStyle()}`}
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:santhoshrajk1812@gmail.com"
                  className={`p-3 rounded-xl transition ${getSocialButtonStyle()}`}
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Development Principles */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider ${getSectionTitleColor()}`}>
                Django Development Principles
              </h4>

              <ul className={`mt-4 space-y-3 ${getTextColor()}`}>
                {[
                  "Batteries-included philosophy",
                  "DRY & Clean Code",
                  "Security first approach",
                  "Performance optimization",
        
                  "Maintainable solutions"
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className={`w-3.5 h-3.5 ${getListIconColor()}`} />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect & Resources */}
            <div>
              <h4 className={`text-xs font-semibold uppercase tracking-wider ${getSectionTitleColor()}`}>
                Quick Resources
              </h4>

              <div className="mt-4 flex flex-col gap-3 text-sm">
                <Link
                  href="/blog"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <BookOpen className="w-4 h-4" />
                  All Articles
                  <ArrowUpRight className={`w-3 h-3 ${getExternalIconColor()}`} />
                </Link>

                <Link
                  href="/blog?category=Backend"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <FileCode className="w-4 h-4" />
                  Backend Tutorials
                  <ArrowUpRight className={`w-3 h-3 ${getExternalIconColor()}`} />
                </Link>

                <Link
                  href="/blog?category=Python"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <Braces className="w-4 h-4" />
                  Python Guides
                  <ArrowUpRight className={`w-3 h-3 ${getExternalIconColor()}`} />
                </Link>

                <a
                  href="mailto:santhoshrajk1812@gmail.com"
                  className={`flex items-center gap-3 transition ${getLinkColor()}`}
                >
                  <Mail className="w-4 h-4" />
                  Contact for Collaboration
                  <ArrowUpRight className={`w-3 h-3 ${getExternalIconColor()}`} />
                </a>

                <div className={`flex items-center gap-3 ${getLocationColor()}`}>
                  <MapPin className="w-4 h-4" />
                  Remote & Open Source Friendly
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`my-10 h-px ${getDividerColor()}`} />

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p className={`flex items-center gap-1 ${getCopyrightColor()}`}>
              © {new Date().getFullYear()} NDTS Blog. Made with
              <Heart className={`w-4 h-4 mx-1 ${getHeartColor()}`} />
              by Santhoshraj K
            </p>
            
            <div className="flex items-center gap-4">
              <Link href="/privacy" className={`transition ${getLinkColor()}`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`transition ${getLinkColor()}`}>
                Terms of Use
              </Link>
              <Link href="/sitemap" className={`transition ${getLinkColor()}`}>
                Sitemap
              </Link>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`
              fixed bottom-6 right-6
              w-11 h-11
              rounded-full
              transition-all duration-300
              flex items-center justify-center
              z-50
              ${getScrollButtonStyle()}
              ${showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
            `}
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* About Me Modal */}
      <AboutMeModal
        open={openAbout}
        onClose={() => setOpenAbout(false)}
        isDark={isDark}
      />
    </>
  )
}