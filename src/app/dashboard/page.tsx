import React, { Suspense } from 'react'

import LoadingIndicator from '@/shared/ui/loading-indicator'
import { DashboardPage } from '@/views/dashboard-page'

interface DashboardProps {
    searchParams: Promise<{ search?: string; sortBy?: string; sortOrder?: 'asc' | 'desc' }>
}

const Dashboard: React.FC<DashboardProps> = async ({ searchParams }) => {
    const { search, sortBy, sortOrder } = await searchParams

    return (
        <Suspense fallback={<LoadingIndicator fullHeight />}>
            <DashboardPage search={search ?? ''} sortBy={sortBy} sortOrder={sortOrder} />
        </Suspense>
    )
}

export default Dashboard
