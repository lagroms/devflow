import { LogIn, Shield } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";

interface LoginPromptProps {
    title?: string;
    message?: string;
    showIcon?: boolean;
    className?: string;
}

const LoginPrompt = ({
    title = "Authentication Required",
    message = "You need to be logged in to view this content. Please sign in to continue.",
    showIcon = true,
    className = "",
}: LoginPromptProps) => {
    return (
        <div
            className={`flex flex-col items-center justify-center min-h-[400px] text-center px-4 ${className}`}
        >
            {showIcon && (
                <div className="mb-6 p-4 rounded-full bg-primary/10">
                    <Shield className="size-12 text-primary" />
                </div>
            )}

            <h1 className="h2-bold text-dark200_light900 mb-4">{title}</h1>

            <p className="body-regular text-dark500_light700 max-w-md mb-8">
                {message}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="min-w-[120px]">
                    <Link href={ROUTES.SIGN_IN}>
                        <LogIn className="size-4 mr-2" />
                        Sign In
                    </Link>
                </Button>

                <Button variant="outline" asChild className="min-w-[120px]">
                    <Link href={ROUTES.SIGN_UP}>Create Account</Link>
                </Button>
            </div>

            <div className="mt-6 text-sm text-dark400_light600">
                <p>
                    Don&apos;t have an account?{" "}
                    <Link
                        href={ROUTES.SIGN_UP}
                        className="text-primary hover:underline font-medium"
                    >
                        Sign up for free
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPrompt;
