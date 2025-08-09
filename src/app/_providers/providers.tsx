'use client'

import * as React from 'react'

import { HeroProviderWrapper } from './hero-provider'
import { ThemeProviderWrapper } from './theme-provider'

export interface ProvidersProps {
    children: React.ReactNode
    userType: 'member' | 'partner'
}

export function Providers({ children, userType }: ProvidersProps) {
    return (
        <HeroProviderWrapper>
            <ThemeProviderWrapper userType={userType}>{children}</ThemeProviderWrapper>
        </HeroProviderWrapper>
    )
}
