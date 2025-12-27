"use client"

import React, {
  useState,
  useMemo,
  useCallback,
} from "react"
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

  /* -------- MODAL -------- */
  const openModal = useCallback((data: any) => {
    setModalData(data)
    setIsModalOpen(true)
  }, [])

  /* -------- FILTERING -------- */
  const filteredTech = useMemo(() => {
    if (category === "all") return techStackData
    return techStackData.filter(t => t.category === category)
  }, [category, techStackData])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#041b13] via-[#052e1d] to-black text-white px-4 py-12">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
          Tech Stack & Education
        </h1>
        <p className="text-gray-300 mt-3 text-sm sm:text-base">
          Django-green inspired modern frontend
        </p>
      </motion.div>

      {/* ================= FILTERS ================= */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
        {["all", "frontend", "backend", "database", "tooling"].map(c => (
          <button
            key={c}
            onClick={() => {
              if (category !== c) {
                setCategory(c as any)
              }
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition
              ${
                category === c
                  ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/30"
                  : "bg-white/10 hover:bg-white/20"
              }`}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= TECH GRID ================= */}
      <div className="mx-auto max-w-[1000px] px-2 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredTech.map(tech => (
            <TechCard
              key={tech.id}
              tech={tech}
              onClick={openModal}
            />
          ))}
        </div>
        
        {/* Empty state */}
        {filteredTech.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No technologies found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category
            </p>
          </div>
        )}
      </div>

      {/* ================= EDUCATION ================= */}
      <div className="mt-20">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <GraduationCap className="text-emerald-400 w-7 h-7 sm:w-8 sm:h-8" />
          <h2 className="text-2xl sm:text-3xl font-bold">
            Education
          </h2>
        </div>

        <div className="mx-auto max-w-[1000px] px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationData.map(edu => (
              <EducationCard
                key={edu.id}
                edu={edu}
                onClick={openModal}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <ViewModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        {...modalData}
      />
    </div>
  )
}