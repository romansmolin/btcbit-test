'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export interface ThemeProviderWrapperProps {
    children: React.ReactNode
    userType: 'member' | 'partner'
}
export function ThemeProviderWrapper({ children, userType }: ThemeProviderWrapperProps) {
    const resolvedUserType = userType ?? 'anonymous'

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            value={{
                light:
                    resolvedUserType === 'member'
                        ? 'member'
                        : resolvedUserType === 'partner'
                          ? 'partner'
                          : 'anonymous',
                dark:
                    resolvedUserType === 'member'
                        ? 'member-dark'
                        : resolvedUserType === 'partner'
                          ? 'partner-dark'
                          : 'anonymous-dark',
            }}
        >
            {children}
        </NextThemesProvider>
    )
}
