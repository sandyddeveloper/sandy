"use client"

import { motion, useMotionValue } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"

const sections = ["Hero", "Work", "Skills", "Projects", "Contact"]

export default function VerticalSlider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const height = 160
  const itemHeight = height / sections.length

  const y = useMotionValue(0)

  const scrollToSection = (index: number) => {
    setActiveIndex(index)
    y.set(index * itemHeight)

    document
      .getElementById(sections[index].toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" })
  }

  const handleDragEnd = () => {
    const raw = y.get()
    const index = Math.round(raw / itemHeight)
    const clamped = Math.max(0, Math.min(index, sections.length - 1))

    scrollToSection(clamped)
  }

  return (
    <div className="relative select-none">

      {/* SLIDER */}
      <div className="relative h-40 w-10 mx-auto">

        {/* TRACK */}
        <div className="absolute inset-0 rounded-full
          bg-gradient-to-b from-emerald-500/25 via-green-500/20 to-lime-500/20 blur-sm"
        />
        <div className="absolute inset-0 rounded-full
          bg-white/5 backdrop-blur-sm border border-emerald-500/20"
        />

        {/* DRAG HANDLE */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: height - itemHeight }}
          dragElastic={0.12}
          onDragEnd={handleDragEnd}
          style={{ y }}
          className="absolute inset-x-0 z-10 cursor-grab active:cursor-grabbing"
        >
          <div className="relative">

            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <ChevronUp size={16} className="text-emerald-400/70" />
            </div>

            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="
                w-8 h-8 mx-auto
                bg-gradient-to-br from-emerald-500 via-green-600 to-lime-500
                rounded-full flex items-center justify-center
                shadow-lg shadow-emerald-500/40
              "
            >
              <div className="w-2 h-2 bg-white rounded-full" />
            </motion.div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
              <ChevronDown size={16} className="text-emerald-400/70" />
            </div>
          </div>
        </motion.div>

        {/* INDICATORS */}
        <div className="absolute inset-0 flex flex-col justify-between py-2">
          {sections.map((section, index) => (
            <button
              key={section}
              onClick={() => scrollToSection(index)}
              style={{ height: itemHeight }}
              className="relative flex items-center justify-center group"
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-emerald-400 scale-125 shadow shadow-emerald-400/60"
                    : "bg-emerald-300/30 group-hover:bg-emerald-400/50"
                }`}
              />

              <div className="absolute left-full ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-medium whitespace-nowrap
                  bg-emerald-900/90 text-emerald-100 px-2 py-1 rounded">
                  {section}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE LABEL */}
      <div className="mt-4 text-center">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-semibold text-emerald-300 tracking-wider"
        >
          {sections[activeIndex].toUpperCase()}
        </motion.div>

        <div className="text-[10px] text-emerald-300/60 mt-1">
          {activeIndex + 1} / {sections.length}
        </div>
      </div>
    </div>
  )
}
