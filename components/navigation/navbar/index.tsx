import Image from "next/image";
import Link from "next/link";
import React from "react";

import MobileNavigation from "./MobileNavigation";
import Theme from "./Theme";
import { auth } from "@/auth";
import UserAvatar from "@/components/UserAvatar";

const Navbar = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    return (
        <nav className="flex-between background-light900_dark200 fixed z-50 w-full p-6 dark:shadow-none sm:px-12 shadow-light-300 gap-5">
            <Link href="/" className="flex items-center gap-1">
                <Image
                    src="/images/site-logo.svg"
                    width={23}
                    height={23}
                    alt="DevFlow logo"
                />
                <p className="h2-bold text-dark-100 font-space-grotesk dark:text-light-900 max-sm:hidden">
                    Dev<span className="text-primary-500">Flow</span>
                </p>
            </Link>
            <p>Global Search</p>
            <div className="flex-between gap-5">
                <Theme />
                {userId ? (
                    <UserAvatar
                        id={userId}
                        name={session?.user?.name!}
                        imageUrl={session?.user?.image!}
                    />
                ) : null}

                <MobileNavigation />
            </div>
        </nav>
    );
};

export default Navbar;
