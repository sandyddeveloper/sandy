"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useRef, useState } from "react"

/* ───────────────── DEFAULT THEME ───────────────── */
const DEFAULT_COLORS = {
  terminalBorder: "rgba(148,163,184,0.25)",
  terminalText: "#E5E7EB",
  terminalMuted: "#94A3B8",
  terminalCaret: "#22C55E",
}

/* ───────────────── DATA ───────────────── */
const COMMAND = "django-admin startproject blog"

const OUTPUT = ["✔ Blog ready!"]

const LOGS = [
  "[INFO] Starting dev server…",
  "[INFO] Running at http://127.0.0.1:8000",
]

/* ───────────────── COMPONENT ───────────────── */
export default function MiniTerminal({
  isDark = true,
  colors = DEFAULT_COLORS,
}: {
  isDark?: boolean
  colors?: Partial<typeof DEFAULT_COLORS>
}) {
  const theme = { ...DEFAULT_COLORS, ...colors }

  const [line, setLine] = useState("")
  const [log, setLog] = useState("")
  const [paused, setPaused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  /* ───────── TYPE EFFECT ───────── */
  const typeLine = (text: string, speed = 30) => {
    setLine("")
    text.split("").forEach((char, i) => {
      setTimeout(() => {
        setLine(prev => prev + char)
      }, i * speed)
    })
  }

  /* ───────── AUTO LOOP ───────── */
  useEffect(() => {
    if (paused) return

    let timers: NodeJS.Timeout[] = []

    const run = () => {
      setLine("")
      setLog("")

      timers.push(
        setTimeout(() => typeLine(`$ ${COMMAND}`), 400),
        setTimeout(() => setLine(OUTPUT[0]), 1800),
        setTimeout(() => setLog(LOGS[0]), 3000),
        setTimeout(() => setLog(LOGS[1]), 4200),
        setTimeout(run, 6200)
      )
    }

    run()
    return () => timers.forEach(clearTimeout)
  }, [paused])

  return (
    <div
      className="w-[360px] h-[60px] rounded-xl border overflow-hidden font-mono backdrop-blur-md "
      style={{
        backgroundColor: isDark
          ? "rgba(2,6,23,0.95)"
          : "rgba(248,250,252,0.95)",
        borderColor: theme.terminalBorder,
        boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* ───── Header ───── */}
      <div
        className="flex items-center gap-2 px-3 py-[3px] border-b"
        style={{ borderColor: theme.terminalBorder }}
      >
        <span className="h-2 w-2 rounded-full bg-red-500" />
        <span className="h-2 w-2 rounded-full bg-yellow-400" />
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span
          className="ml-2 text-[10px] opacity-60 truncate"
          style={{ color: theme.terminalText }}
        >
          django
        </span>
      </div>

      {/* ───── Body (PIXEL ALIGNED) ───── */}
      <div className="relative h-[34px] px-3 overflow-hidden text-[11px] leading-none">
        
        {/* Main Line */}
        <div
          className="absolute bottom-[12px] left-3 right-3 truncate"
          style={{ color: theme.terminalText }}
        >
          {line}
        </div>

        {/* Log Line (BOTTOM → UP) */}
        <AnimatePresence>
          {log && (
            <motion.div
              key={log}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-[2px] left-3 right-3 truncate text-[10px] text-green-400"
            >
              {log}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt + Cursor */}

      </div>
    </div>
  )
}
