import React from 'react'

import { BalancesGrid, BalancesGridProvider } from '@/widgets/balances'
import { BalanceSort, getProcessedBalances } from '@/entities/balance'
import { BalancesFilter, SortBalancesButton } from '@/features/balance'

const DashboardPage = async ({
    search,
    sortBy,
    sortOrder,
}: {
    search: string
    sortBy?: string
    sortOrder?: BalanceSort
}) => {
    const pageSize = 15
    const processedBalances = await getProcessedBalances(1, pageSize, search, sortBy, sortOrder)

    const order = sortOrder === 'asc' ? 'desc' : 'asc'

    return (
        <>
            <div className="flex gap-2 items-center justify-between mb-4">
                <BalancesFilter />
                <SortBalancesButton sortBy={'amount'} sortOrder={order} />
            </div>
            <BalancesGridProvider
                fetchPage={getProcessedBalances}
                initialBalances={processedBalances}
                pageSize={pageSize}
                search={search}
                sortBy={sortBy}
                sortOrder={sortOrder}
            >
                <BalancesGrid />
            </BalancesGridProvider>
        </>
    )
}

export default DashboardPage
