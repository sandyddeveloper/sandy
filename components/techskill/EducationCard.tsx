"use client"

import React, { useMemo } from "react"
import Card3D from "../shared/Card3D"

const EducationCard = React.memo(function EducationCard({
  edu,
  onClick,
  isDark = true
}: {
  edu: any
  onClick: (data: any) => void
  isDark?: boolean
}) {
  const modalPayload = useMemo(
    () => ({
      title: edu.degree,
      description: edu.description,
      tag: edu.year,
      isDark
    }),
    [edu, isDark]
  )

  // Theme-based styles
  const getCardBackground = () => {
    return isDark
      ? "bg-white/5 backdrop-blur-xl border border-emerald-500/20"
      : "bg-white/80 backdrop-blur-xl border border-emerald-500/30"
  }

  const getDegreeColor = () => {
    return isDark ? "text-white" : "text-gray-900"
  }

  const getInstitutionColor = () => {
    return isDark ? "text-emerald-400" : "text-emerald-600"
  }

  const getYearColor = () => {
    return isDark ? "text-gray-400" : "text-gray-500"
  }

  const getCardHoverEffect = () => {
    return isDark
      ? "hover:border-emerald-400 hover:bg-white/10"
      : "hover:border-emerald-600 hover:bg-white"
  }

  return (
    <Card3D onClick={() => onClick(modalPayload)}>
      <div className={`rounded-2xl p-6 transition-all duration-300 cursor-pointer ${getCardBackground()} ${getCardHoverEffect()}`}>
        <h3 className={`font-semibold text-lg ${getDegreeColor()}`}>
          {edu.degree}
        </h3>
        <p className={`text-sm mt-2 ${getInstitutionColor()}`}>
          {edu.institution}
        </p>
        <p className={`text-xs mt-1 ${getYearColor()}`}>
          {edu.year}
        </p>
        
        {/* Optional: Add a subtle gradient indicator */}
        <div className={`h-1 w-12 mt-4 rounded-full ${isDark ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-500'}`} />
      </div>
    </Card3D>
  )
})

export default EducationCard