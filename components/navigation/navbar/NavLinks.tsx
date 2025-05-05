"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import ROUTES from "@/constants/routes";
import { cn } from "@/lib/utils";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
    const pathname = usePathname();
    const userId = 1;
    return (
        <>
            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route;

                if (item.route === ROUTES.PROFILE) {
                    if (userId) {
                        item.route = `${ROUTES.PROFILE}/${userId}`;
                    } else {
                        return null;
                    }
                }

                const LinkComponent = (
                    <Link
                        href={item.route}
                        key={item.label}
                        className={cn(
                            "flex-start gap-4 p-4 bg-transparent",
                            isActive
                                ? "primary-gradient rounded-lg text-light-900"
                                : "text-dark300_light900"
                        )}
                    >
                        <Image
                            src={item.imgURL}
                            alt={item.label}
                            width={20}
                            height={20}
                            className={cn({
                                "invert-colors": !isActive,
                            })}
                        />
                        <p
                            className={cn(
                                isActive ? "base-bold" : "base-medium",
                                !isMobileNav && "max-lg:hidden"
                            )}
                        >
                            {item.label}
                        </p>
                    </Link>
                );

                return isMobileNav ? (
                    <SheetClose asChild key={item.route}>
                        {LinkComponent}
                    </SheetClose>
                ) : (
                    LinkComponent
                );
            })}
        </>
    );
};

export default NavLinks;
