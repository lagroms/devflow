import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserAvatarProps {
    id: string;
    name: string;
    imageUrl: string;
    className?: string;
}

export default function UserAvatar({
    id,
    name,
    imageUrl,
    className = "w-9 h-9",
}: UserAvatarProps) {
    return (
        <Link href={ROUTES.PROFILE(id)}>
            <Avatar className={className}>
                <AvatarImage src={imageUrl} />
                <AvatarFallback className="primary-gradient font-space-grotesk font-bold tracking-wider text-white">
                    {name.charAt(0)}
                </AvatarFallback>
            </Avatar>
        </Link>
    );
}
