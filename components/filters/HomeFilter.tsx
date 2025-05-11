"use client";

import { useSearchParams } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const filters = [
    { name: "React", value: "react" },
    { name: "JavaScript", value: "javascript" },
    { name: "Next.js", value: "nextjs" },
    { name: "Node.js", value: "nodejs" },
    { name: "Express", value: "express" },
    { name: "MongoDB", value: "mongodb" },
    { name: "PostgreSQL", value: "postgresql" },
    { name: "MySQL", value: "mysql" },
    { name: "SQL Server", value: "sqlserver" },
    { name: "Ruby on Rails", value: "rubyonrails" },
    // { name: "Newest", value: "newest" },
    // { name: "Popular", value: "popular" },
    // { name: "Unanswered", value: "unanswered" },
    // { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
    const searchParams = useSearchParams();
    const filterParams = searchParams.get("filter");
    const [active, setActive] = useState(filterParams || "");
    const [_, setFilterQuery] = useQueryState("filter", {
        defaultValue: "",
        shallow: false,
        scroll: false,
    });

    const handleTypeClick = (filter: string) => {
        if (filter && filter !== active) {
            setActive(filter);
            setFilterQuery(filter);
        } else {
            setActive("");
            setFilterQuery("");
        }
    };

    return (
        <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
            {filters.map((filter) => (
                <Button
                    key={filter.name}
                    className={cn(
                        `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
                        active === filter.value
                            ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
                            : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
                    )}
                    onClick={() => handleTypeClick(filter.value)}
                >
                    {filter.name}
                </Button>
            ))}
        </div>
    );
};

export default HomeFilter;
