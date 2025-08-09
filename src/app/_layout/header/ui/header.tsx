'use client'

import { Button } from '@heroui/button'
import { Landmark, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import React from 'react'

import { LogOutButton } from '@/features/auth'

const Header = () => {
    const { resolvedTheme, setTheme } = useTheme()

    const isDark = resolvedTheme === 'dark'

    const handleThemeToggle = () => {
        // Toggle base mode only; account-specific class is mapped by provider
        setTheme(isDark ? 'light' : 'dark')
    }

    return (
        <header className="container mx-auto p-5 rounded-xl border-2 flex justify-between items-center border-primary">
            <div className="flex gap-2 items-center text-primary">
                <Landmark aria-hidden="true" size={28} />
                <span className="font-bold italic text-xl">EasyCrypto</span>
            </div>

            <div className="flex gap-2 items-center">
                <Button
                    isIconOnly
                    aria-label="Toggle theme"
                    color="primary"
                    variant="ghost"
                    onPress={handleThemeToggle}
                >
                    <SunIcon aria-hidden="true" className={isDark ? 'block' : 'hidden'} size={24} />
                    <MoonIcon aria-hidden="true" className={isDark ? 'hidden' : 'block'} size={24} />
                </Button>
                <LogOutButton />
            </div>
        </header>
    )
}

export default Header
