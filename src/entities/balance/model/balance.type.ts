export interface IBalance {
    currency_id: number
    amount: string
    id: string
}

export interface IProcessedBalance extends IBalance {
    code: string
    symbol: string
}

export type BalanceSort = 'asc' | 'desc'
