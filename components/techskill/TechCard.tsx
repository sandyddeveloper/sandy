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
}: {
  tech: any
  onClick: (data: any) => void
}) {
  const Icon = tech.icon

  const modalPayload = useMemo(
    () => ({
      title: tech.name,
      description: tech.description,
      icon: <Icon className="w-6 h-6" />,
      tag: tech.category,
    }),
    [tech, Icon]
  )

  return (
    <Card3D onClick={() => onClick(modalPayload)}>
      <motion.div
        variants={itemVariants}
        style={{
          willChange: "transform, opacity",
          transform: "translateZ(0)",
        }}
        className="bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-4 hover:border-emerald-400 transition z-50"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 rounded-xl bg-black/40">
            <Icon className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold">{tech.name}</h3>
        </div>

        <p className="text-gray-300 text-sm">{tech.description}</p>

        <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300">
          {tech.category}
        </span>
      </motion.div>
    </Card3D>
  )
})

export default TechCard
