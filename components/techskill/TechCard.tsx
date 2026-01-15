"use client"

import React, { useMemo } from "react"
import { motion } from "framer-motion"
import Card3D from "../shared/Card3D"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const TechCard = React.memo(function TechCard({
  tech,
  onClick,
  isDark = true
}: {
  tech: any
  onClick: (data: any) => void
  isDark?: boolean
}) {
  const Icon = tech.icon

  const modalPayload = useMemo(
    () => ({
      title: tech.name,
      description: tech.description,
      icon: <Icon className="w-6 h-6" />,
      tag: tech.category,
      isDark
    }),
    [tech, Icon, isDark]
  )

  const getCardBackground = () => {
    return isDark
      ? "bg-white/5 backdrop-blur-xl border border-emerald-500/20 hover:border-emerald-400"
      : "bg-white/80 backdrop-blur-xl border border-emerald-500/30 hover:border-emerald-600"
  }

  const getIconBackground = () => {
    return isDark
      ? "bg-black/40"
      : "bg-white/60"
  }

  const getIconColor = () => {
    return isDark
      ? "text-emerald-400"
      : "text-emerald-600"
  }

  const getTitleColor = () => {
    return isDark ? "text-white" : "text-gray-900"
  }

  const getDescriptionColor = () => {
    return isDark ? "text-gray-300" : "text-gray-700"
  }

  const getTagBackground = () => {
    return isDark
      ? "bg-emerald-500/20 text-emerald-300"
      : "bg-emerald-500/10 text-emerald-700"
  }

  return (
    <Card3D onClick={() => onClick(modalPayload)}>
      <motion.div
        variants={itemVariants}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
        className={`rounded-2xl p-4 transition z-50 cursor-pointer ${getCardBackground()}`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl ${getIconBackground()}`}>
            <Icon className={`w-6 h-6 ${getIconColor()}`} />
          </div>
          <h3 className={`text-lg font-semibold ${getTitleColor()}`}>{tech.name}</h3>
        </div>

        <p className={`text-sm ${getDescriptionColor()}`}>{tech.description}</p>

        <span className={`inline-block mt-4 text-xs px-3 py-1 rounded-full ${getTagBackground()}`}>
          {tech.category}
        </span>
      </motion.div>
    </Card3D>
  )
})

export default TechCard