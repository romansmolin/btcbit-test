import { fontSans } from '@/shared/config/fonts'
import { siteConfig } from '@/shared/config/site'
import '@/shared/styles/globals.css'
import clsx from 'clsx'
import { Metadata } from 'next'

import { Footer } from './_layout/footer'
import { Header } from './_layout/header'
import { Providers } from './_providers/providers'
import { cookies } from 'next/headers'

import { BalanceCard } from '@/entities/balance'

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: '/favicon.ico',
    },
}

type UserType = 'member' | 'partner'
export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const userType = cookieStore.get('authenticated-user')?.value as UserType

    return (
        <html suppressHydrationWarning lang="en">
            <body
                className={clsx(
                    'font-sans antialiased h-screen bg-background text-foreground p-2',
                    fontSans.variable
                )}
            >
                <Providers key={userType ?? 'anonymous'} userType={userType}>
                    <Header />
                    <main className="container mx-auto flex-1 space-y-6 p-4">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    )
}
