import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { techMap } from "@/constants/techMap";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDeviconClassName = (name: string) => {
    const normalizedTechName = name.replace(/[ .]/g, "").toLowerCase();

    return techMap[normalizedTechName]
        ? `${techMap[normalizedTechName]} colored`
        : "devicon-devicon-plain";
};
