import type { Metadata } from "next";
import { Inter, Space_Grotesk as SpaceGrotesk } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React from "react";
import { Toaster } from "sonner";

import "./globals.css";
import { auth } from "@/auth";
import ThemeProvider from "@/context/Theme";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = SpaceGrotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "Dev Overflow",
    description:
        "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
    icons: {
        icon: "/images/site-logo.svg",
    },
};

const RootLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const session = await auth();

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
            </head>
            <SessionProvider session={session}>
                <body
                    className={`${inter.className} ${spaceGrotesk.variable} antialiased`}
                >
                    <ThemeProvider
                        attribute={"class"}
                        defaultTheme={"system"}
                        enableSystem
                        disableTransitionOnChange
                    >
                        <NuqsAdapter>{children}</NuqsAdapter>
                    </ThemeProvider>
                    <Toaster richColors />
                </body>
            </SessionProvider>
        </html>
    );
};

export default RootLayout;
