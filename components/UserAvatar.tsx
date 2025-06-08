import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    id: string;
    name: string;
    imageUrl?: string | null;
    className?: string;
    fallbackClassName?: string;
}

export default function UserAvatar({
    id,
    name,
    imageUrl,
    className = "w-9 h-9",
    fallbackClassName,
}: UserAvatarProps) {
    const initials = name
        .split(" ")
        .map((word: string) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    return (
        <Link href={ROUTES.PROFILE(id)}>
            <Avatar className={className}>
                {imageUrl ? (
                    <AvatarImage src={imageUrl} />
                ) : (
                    <AvatarFallback
                        className={cn(
                            "primary-gradient font-space-grotesk font-bold tracking-wider text-white",
                            fallbackClassName
                        )}
                    >
                        {initials}
                    </AvatarFallback>
                )}
            </Avatar>
        </Link>
    );
}
