"use client"

import React, { useState, useMemo, useCallback, useEffect } from "react"
import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"
import TechCard from "./TechCard"
import EducationCard from "./EducationCard"
import ViewModal from "../shared/ViewModal"
import type { EducationItem, TechItem } from "@/types/tech"

export default function TechGrid({
  techStackData,
  educationData,
}: {
  techStackData: readonly TechItem[]
  educationData: readonly EducationItem[]
}) {
  const [category, setCategory] = useState<"all" | TechItem["category"]>("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<any>({})
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const openModal = useCallback((data: any) => {
    setModalData(data)
    setIsModalOpen(true)
  }, [])

  const filteredTech = useMemo(() => {
    if (category === "all") return techStackData
    return techStackData.filter(t => t.category === category)
  }, [category, techStackData])

  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#041b13] via-[#052e1d] to-black text-white px-4 py-12">
        {/* Skeleton loader */}
        <div className="text-center mb-10">
          <div className="h-12 bg-emerald-500/20 rounded-lg w-48 mx-auto mb-4 animate-pulse" />
          <div className="h-4 bg-gray-700/20 rounded w-32 mx-auto animate-pulse" />
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {["all", "frontend", "backend", "database", "tooling"].map(c => (
            <div key={c} className="h-9 w-20 bg-gray-700/20 rounded-full animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-700/10 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div suppressHydrationWarning className="min-h-screen bg-gradient-to-br from-[#041b13] via-[#052e1d] to-black text-white px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          Tech Stack & Education
        </h1>
        <p className="text-gray-300 mt-3 text-sm sm:text-base">
          Django-green inspired modern frontend
        </p>
      </motion.div>

      <div suppressHydrationWarning className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {["all", "frontend", "backend", "database", "tooling"].map(c => (
          <button
            key={c}
            suppressHydrationWarning
            onClick={() => category !== c && setCategory(c as any)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200
              ${category === c
                ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105"
                : "bg-white/10 hover:bg-white/20 hover:scale-105"
              }`}
            aria-label={`Filter by ${c} category`}
            aria-pressed={category === c}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-[1000px] px-2 mb-20 min-h-[400px]">
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {filteredTech.map((tech, index) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <TechCard
                tech={tech}
                onClick={openModal}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredTech.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No technologies found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category
            </p>
          </motion.div>
        )}
      </div>

      <div className="mt-20">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <GraduationCap className="text-emerald-400 w-7 h-7 sm:w-8 sm:h-8" />
          <h2 className="text-2xl sm:text-3xl font-bold">
            Education
          </h2>
        </div>

        <div className="mx-auto max-w-[1000px] px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <EducationCard
                  edu={edu}
                  onClick={openModal}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ViewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalData}
      />
    </div>
  )
}