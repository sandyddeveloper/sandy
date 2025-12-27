"use client"

import { educationData, techStackData } from "@/data/tech"
import TechGrid from "../techskill/TechGrid"

export default function TechStackPage() {
    return (
        <TechGrid
            techStackData={techStackData}
            educationData={educationData}
        />
    )

}
