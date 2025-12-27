"use client"

import { educationData, techStackData } from "@/data/tech"
import TechGrid from "../techskill/TechGrid"

export default function TechStackPage() {
    return (
        <div id="skills">
            <TechGrid
                techStackData={techStackData}
                educationData={educationData}
            />
        </div>

    )

}
