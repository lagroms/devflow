"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
import React from "react";
import { toast } from "sonner";

import ROUTES from "@/constants/routes";

import { Button } from "../ui/button";

const SocialAuthForm = () => {
    const buttonClass =
        "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-3 py-3.5";

    const handleSignIn = async (provider: "github" | "google") => {
        try {
            await signIn(provider, {
                redirectTo: ROUTES.HOME,
                // redirect: false,
            });
        } catch (error) {
            toast.error("Sign in failed", {
                description:
                    error instanceof Error
                        ? error.message
                        : "An error occured while signing in",
            });
        }
    };

    return (
        <div className="mt-10 flex flex-wrap gap-2.5">
            <Button
                className={buttonClass}
                onClick={() => handleSignIn("github")}
            >
                <Image
                    src="/icons/github.svg"
                    width={20}
                    height={20}
                    alt="Github"
                    className="invert-colors mr-2.5 object-contain"
                />
                <span>Log in with Github</span>
            </Button>
            <Button
                className={buttonClass}
                onClick={() => handleSignIn("google")}
            >
                <Image
                    src="/icons/google.svg"
                    width={20}
                    height={20}
                    alt="Google"
                    className="mr-2.5 object-contain"
                />
                <span>Log in with Google</span>
            </Button>
        </div>
    );
};

export default SocialAuthForm;
