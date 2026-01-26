"use client"

import { BookOpen } from "lucide-react"
import { useState } from "react"

export default function ReadingModeToggle({
  onToggle,
}: {
  onToggle: (enabled: boolean) => void
}) {
  const [enabled, setEnabled] = useState(false)

  return (
    <button
      onClick={() => {
        const next = !enabled
        setEnabled(next)
        onToggle(next)
      }}
      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-white/10 hover:border-emerald-400/40 transition"
    >
      <BookOpen className="h-3.5 w-3.5" />
      {enabled ? "Exit reading mode" : "Reading mode"}
    </button>
  )
}
