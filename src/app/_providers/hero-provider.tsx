'use client'

import { HeroUIProvider } from '@heroui/system'
import { useRouter } from 'next/navigation'
import * as React from 'react'

declare module '@react-types/shared' {
    interface RouterConfig {
        routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>
    }
}

export interface HeroProviderWrapperProps {
    children: React.ReactNode
}

export function HeroProviderWrapper({ children }: HeroProviderWrapperProps) {
    const router = useRouter()

    return (
        <HeroUIProvider className="h-full flex flex-col" navigate={router.push}>
            {children}
        </HeroUIProvider>
    )
}
