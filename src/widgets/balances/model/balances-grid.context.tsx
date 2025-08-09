'use client'

import React, { createContext, useContext } from 'react'

import { IProcessedBalance } from '@/entities/balance'
import { usePaginateBalances } from '@/features/balance/paginate-balances/hooks/use-paginate-balances'

interface BalancesGridContextValue {
    balances: IProcessedBalance[]
    appendBalances: (next: IProcessedBalance[]) => void

    // FLAGS
    hasMore: boolean
    isLoading: boolean

    // STATE HANDLERS
    setHasMore: React.Dispatch<React.SetStateAction<boolean>>
    setBalances: React.Dispatch<React.SetStateAction<IProcessedBalance[]>>
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

    // API HANDLER
    onEndReached?: () => void

    //CONSTS
    rootMargin: string
    cooldownMs: number
    pageSize: number
    currentPage: number
}

const BalancesGridContext = createContext<BalancesGridContextValue | undefined>(undefined)

interface BalancesGridProviderProps {
    initialBalances: IProcessedBalance[]
    children: React.ReactNode
    hasMoreDefault?: boolean
    initialPage?: number
    pageSize?: number
    rootMargin?: string
    cooldownMs?: number
    fetchPage?: (page: number, pageSize: number) => Promise<IProcessedBalance[]>
    search?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export const BalancesGridProvider: React.FC<BalancesGridProviderProps> = ({
    initialBalances,
    children,
    hasMoreDefault = true,
    initialPage = 1,
    pageSize = 10,
    rootMargin = '200px',
    cooldownMs = 300,
    fetchPage,
    search,
    sortBy,
    sortOrder,
}) => {
    const {
        balances,
        setBalances,
        appendBalances,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        currentPage,
        pageSize: effectivePageSize,
        onEndReached,
    } = usePaginateBalances({
        initialBalances,
        hasMoreDefault,
        initialPage,
        pageSize,
        fetchPage,
        search,
        sortBy,
        sortOrder,
    })

    const value: BalancesGridContextValue = {
        balances,
        setBalances,
        appendBalances,
        hasMore,
        setHasMore,
        isLoading,
        setIsLoading,
        onEndReached,
        rootMargin,
        cooldownMs,
        pageSize: effectivePageSize,
        currentPage,
    }

    return <BalancesGridContext.Provider value={value}>{children}</BalancesGridContext.Provider>
}

export const useBalancesGrid = (): BalancesGridContextValue => {
    const ctx = useContext(BalancesGridContext)

    if (!ctx) throw new Error('useBalancesGrid must be used within BalancesGridProvider')

    return ctx
}
