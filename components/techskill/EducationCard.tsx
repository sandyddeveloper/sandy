"use client"

import React, { useMemo } from "react"
import Card3D from "../shared/Card3D"

const EducationCard = React.memo(function EducationCard({
  edu,
  onClick,
}: {
  edu: any
  onClick: (data: any) => void
}) {
  const modalPayload = useMemo(
    () => ({
      title: edu.degree,
      description: edu.description,
      tag: edu.year,
    }),
    [edu]
  )

  return (
    <Card3D onClick={() => onClick(modalPayload)}>
      <div className="bg-white/5 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6">
        <h3 className="font-semibold text-lg">{edu.degree}</h3>
        <p className="text-emerald-400 text-sm">{edu.institution}</p>
        <p className="text-xs text-gray-400">{edu.year}</p>
      </div>
    </Card3D>
  )
})

export default EducationCard
