"use client"

import { educationData, techStackData } from "@/data/tech"
import TechGrid from "../techskill/TechGrid"

export default function TechStackPage() {
    return (
        <section
            id="skills"
            className="min-h-screen relative"
        >
            <TechGrid
                techStackData={techStackData}
                educationData={educationData}
            />
        </section>

    )

}
