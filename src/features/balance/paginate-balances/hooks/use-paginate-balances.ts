'use client'
import { useCallback, useEffect, useState } from 'react'

import { BalanceSort, IProcessedBalance } from '@/entities/balance'

interface UsePaginateBalancesOptions {
    initialBalances: IProcessedBalance[]
    hasMoreDefault?: boolean
    initialPage?: number
    pageSize?: number
    fetchPage?: (
        page: number,
        pageSize: number,
        search?: string,
        sortBy?: string,
        sortOrder?: BalanceSort
    ) => Promise<IProcessedBalance[]>
    search?: string
    sortBy?: string
    sortOrder?: BalanceSort
}

interface UsePaginateBalancesReturn {
    balances: IProcessedBalance[]
    setBalances: React.Dispatch<React.SetStateAction<IProcessedBalance[]>>
    appendBalances: (next: IProcessedBalance[]) => void

    hasMore: boolean
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

    currentPage: number
    pageSize: number
    onEndReached: () => Promise<void>
}

export const usePaginateBalances = (options: UsePaginateBalancesOptions): UsePaginateBalancesReturn => {
    const {
        initialBalances,
        hasMoreDefault = true,
        initialPage = 1,
        pageSize = 10,
        fetchPage,
        search,
        sortBy,
        sortOrder,
    } = options

    const [balances, setBalances] = useState<IProcessedBalance[]>(initialBalances)
    const [hasMore, setHasMore] = useState<boolean>(hasMoreDefault)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(initialPage)

    const appendBalances = useCallback((next: IProcessedBalance[]) => {
        setBalances((prev) => [...prev, ...next])
    }, [])

    // Sync when SSR-provided data or query inputs change (search/sort)
    useEffect(() => {
        setBalances(initialBalances)
        setCurrentPage(initialPage)
        setHasMore(true)
        setIsLoading(false)
    }, [initialBalances, initialPage, search, sortBy, sortOrder])

    const onEndReached = useCallback(async () => {
        if (isLoading || !hasMore) return
        setIsLoading(true)
        try {
            if (fetchPage) {
                const nextPage = currentPage + 1
                const items = await fetchPage(nextPage, pageSize, search, sortBy, sortOrder)

                if (Array.isArray(items) && items.length > 0) {
                    appendBalances(items)
                    setCurrentPage(nextPage)
                }
                if (!items || items.length < pageSize) {
                    setHasMore(false)
                }
            }
        } finally {
            setIsLoading(false)
        }
    }, [isLoading, hasMore, fetchPage, appendBalances, currentPage, pageSize, search, sortBy, sortOrder])

    return {
        balances,
        setBalances,
        appendBalances,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        currentPage,
        pageSize,
        onEndReached,
    }
}

export type { UsePaginateBalancesOptions, UsePaginateBalancesReturn }
