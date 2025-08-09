'use client'

import React from 'react'

import { useBalancesGrid } from '../model/balances-grid.context'

import { BalanceCard } from '@/entities/balance'
import LoadingIndicator from '@/shared/ui/loading-indicator'
import { useEndReachedObserver } from '@/shared/hooks/use-end-reached-observer'

const BalancesGrid = () => {
    const { balances, onEndReached, hasMore, isLoading, rootMargin, cooldownMs } = useBalancesGrid()
    const { sentinelRef } = useEndReachedObserver({
        onEndReached,
        hasMore,
        isLoading,
        rootMargin,
        cooldownMs,
    })

    return (
        <>
            <section
                aria-busy={isLoading}
                aria-label="Balances"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                id="balances-grid"
            >
                {balances.map((balance) => (
                    <BalanceCard key={balance.id} balance={balance} />
                ))}
            </section>
            <div ref={sentinelRef} aria-hidden="true" className="h-1 w-full" />

            {isLoading && <LoadingIndicator />}
        </>
    )
}

export default BalancesGrid
