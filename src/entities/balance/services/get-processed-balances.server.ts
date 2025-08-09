'use server'

import { fetchBalanceById, fetchBalances } from '../api/server/balance.api'

import { BalanceSort, IProcessedBalance } from '@/entities/balance'
import { fetchCurrencies } from '@/entities/currency'

const getProcessedBalances = async (
    page: number = 1,
    pageSize: number = 10,
    search?: string,
    sortBy?: string,
    order?: BalanceSort
): Promise<IProcessedBalance[]> => {
    const [{ balances }, { currencies }] = await Promise.all([
        fetchBalances(page, pageSize, search, sortBy, order),
        fetchCurrencies(),
    ])

    const currencyById = new Map(
        currencies.map((currency) => [currency.id, { code: currency.code, symbol: currency.symbol }])
    )

    const processedBalances: IProcessedBalance[] = balances.map((balance) => {
        const match = currencyById.get(String(balance.currency_id))

        if (!match) {
            return { ...balance, code: '', symbol: '' }
        }

        return { ...balance, code: match.code, symbol: match.symbol }
    })

    return processedBalances
}

const getProcessedBalance = async (balanceId: number): Promise<IProcessedBalance> => {
    const [{ balance }, { currencies }] = await Promise.all([
        fetchBalanceById(balanceId),
        fetchCurrencies(),
    ])

    const currency = currencies.find((currency) => currency.id === String(balance.currency_id))

    return {
        ...balance,
        code: currency?.code || '',
        symbol: currency?.symbol || '',
    }
}

export { getProcessedBalances, getProcessedBalance }
