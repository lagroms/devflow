"use client";

import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from "next-themes";
import { useEffect, useState } from "react";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    if (!isLoaded) {
        return null;
    }

    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default ThemeProvider;
