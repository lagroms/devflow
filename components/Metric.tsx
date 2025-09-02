import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

interface MetricProps {
    imgUrl: string;
    alt: string;
    value: number | string;
    title: string;
    textStyles: string;
    href?: string;
    isAuthor?: boolean;
    imgStyles?: string;
    titleStyles?: string;
}

const Metric = ({
    imgUrl,
    alt,
    value,
    title,
    textStyles,
    href,
    isAuthor,
    imgStyles,
    titleStyles,
}: MetricProps) => {
    const metricContent = (
        <>
            <Image
                src={imgUrl}
                alt={alt}
                width={16}
                height={16}
                className={`rounded-full object-contain ${imgStyles}`}
            />
            <p className={`${textStyles} flex items-center gap-1`}>
                {value}
                {title ? (
                    <span
                        className={cn(
                            `small-regular line-clamp-1`,
                            titleStyles
                        )}
                    >
                        {title}
                    </span>
                ) : null}
            </p>
        </>
    );

    return href ? (
        <Link href={href} className="flex-center gap-1">
            {metricContent}
        </Link>
    ) : (
        <div className="flex-center gap-1">{metricContent}</div>
    );
};

export default Metric;
