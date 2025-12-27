// types/tech.ts
import type { ComponentType } from "react"

export interface TechItem {
  id: number
  name: string
  category: "frontend" | "backend" | "database" | "tooling"
  description: string
  icon: ComponentType<any>
}

export interface EducationItem {
  id: number
  degree: string
  institution: string
  year: string
  description: string
}
