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
import { useState } from "react"
import AboutMeModal from "../shared/AboutMeModal"

export default function Footer() {
  const [openAbout, setOpenAbout] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <footer className="relative bg-gradient-to-b from-black via-[#041b13] to-black border-t border-emerald-500/20 -z-10">

        {/* TOP GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

        <div className="relative mx-auto max-w-[1100px] px-4 py-14">

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* BRAND */}
            <div>
              <h3 className="text-xl font-semibold text-white tracking-wide">
                Santhoshraj’s Portfolio
              </h3>

              <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                I build modern, scalable, and performance-focused web applications
                using clean architecture and thoughtful UI design.
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
                <Zap className="w-4 h-4" />
                Open to opportunities & collaborations
              </div>

              {/* ABOUT ME BUTTON */}
              <button
                onClick={() => setOpenAbout(true)}
                className="
                  mt-5 inline-flex items-center gap-2
                  px-4 py-2
                  rounded-xl
                  bg-emerald-500/10
                  text-emerald-300
                  border border-emerald-500/20
                  hover:bg-emerald-500/20
                  transition
                "
              >
                <User className="w-4 h-4" />
                About Me
              </button>
            </div>

            {/* PRINCIPLES */}
            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Work Principles
              </h4>

              <ul className="mt-3 space-y-2 text-gray-400">
                {[
                  "Performance-first approach",
                  "Clean & readable code",
                  "Scalable architecture",
                  "Long-term maintainability",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CONNECT */}
            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Connect
              </h4>

              <div className="mt-4 flex flex-col gap-3 text-sm">
                <a
                  href="mailto:santhoshrajk1812@gmail.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition"
                >
                  <Mail className="w-4 h-4" />
                  santhoshrajk1812@gmail.com
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-gray-400 hover:text-emerald-400 transition"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>

                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  India · Remote Friendly
                </div>
              </div>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-10 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

          {/* BOTTOM */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p className="flex items-center gap-1">
              © {new Date().getFullYear()} Built with
              <Heart className="w-4 h-4 text-emerald-400 mx-1" />
              by Santhoshraj K
            </p>
          </div>

          {/* BACK TO TOP */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="
              absolute bottom-6 right-4 sm:right-6
              w-11 h-11
              rounded-full
              bg-white/5 backdrop-blur
              border border-white/10
              text-gray-300
              hover:text-emerald-300
              hover:border-emerald-400/40
              hover:bg-emerald-500/10
              transition
              flex items-center justify-center
            "
          >
            <ArrowUp className="w-5 h-5" />
          </button>

        </div>
      </footer>

      {/* ABOUT MODAL */}
      <AboutMeModal
        open={openAbout}
        onClose={() => setOpenAbout(false)}
      />
    </>
  )
}
