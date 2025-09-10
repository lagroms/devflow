"use client";

import { useQueryState } from "nuqs";

import { cn } from "@/lib/utils";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface Filter {
    name: string;
    value: string;
}

interface CommonFilterProps {
    filters: Filter[];
    otherClasses?: string;
    containerClasses?: string;
}

const CommonFilter = ({
    filters,
    otherClasses = "",
    containerClasses = "",
}: CommonFilterProps) => {
    const [filterQuery, setFilterQuery] = useQueryState("filter", {
        defaultValue: "",
        shallow: false,
        scroll: false,
    });

    const handleUpdateParams = (value: string) => {
        setFilterQuery(value);
    };

    return (
        <div className={cn("relative", containerClasses)}>
            <Select
                onValueChange={handleUpdateParams}
                defaultValue={filterQuery}
            >
                <SelectTrigger
                    className={cn(
                        "body-regular no-focus light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5",
                        otherClasses
                    )}
                    aria-label="Filter options"
                >
                    <div className="line-clamp-1 flex-1 text-left">
                        <SelectValue placeholder="Select a filter" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {filters.map((filter) => (
                        <SelectItem key={filter.value} value={filter.value}>
                            {filter.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default CommonFilter;
