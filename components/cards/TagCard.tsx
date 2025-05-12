import Link from "next/link";
import React from "react";

import ROUTES from "@/constants/routes";
import { getDeviconClassName } from "@/lib/utils";

import { Badge } from "../ui/badge";
import Image from "next/image";

interface TagCardProps {
    _id: string;
    name: string;
    questions?: number;
    showCount?: boolean;
    compact?: boolean;
    remove?: boolean;
    isButton?: boolean;
    onRemove?: () => void;
}

const TagCard = ({
    _id,
    name,
    questions,
    showCount,
    compact,
    onRemove,
    remove,
    isButton,
}: TagCardProps) => {
    const iconClassName = getDeviconClassName(name);

    const content = (
        <>
            <Badge className="subtle-medium background-light800_dark300 text-light400_light500 rounded-md border-none px-4 py-2 uppercase flex flex-row gap-2">
                <div className="flex-center space-x-2">
                    <i className={`${iconClassName} text-sm`}></i>
                    <span>{name}</span>
                </div>

                {remove && (
                    <Image
                        src="/icons/close.svg"
                        alt="close"
                        width={12}
                        height={12}
                        className="cursor-pointer object-contain invert-0 dark:invert"
                        onClick={onRemove}
                    />
                )}
            </Badge>
            {showCount && (
                <p className="small-medium text-dark500_light700">
                    {questions}
                </p>
            )}
        </>
    );

    if (compact) {
        return isButton ? (
            <button type="button" className="flex-between gap-2">
                {content}
            </button>
        ) : (
            <Link href={ROUTES.TAGS(_id)} className="flex-between gap-2">
                {content}
            </Link>
        );
    }
};

export default TagCard;
