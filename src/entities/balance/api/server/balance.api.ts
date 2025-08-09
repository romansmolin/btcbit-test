import { IBalance } from '../../model/balance.type'

import { handleAxiosError } from '@/shared/api'
import api from '@/shared/api/config/axios'

const fetchBalances = async (
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortBy?: string,
    order?: 'asc' | 'desc'
): Promise<{ balances: IBalance[] }> => {
    try {
        const { data } = await api.get<IBalance[]>('/balances', {
            params: {
                page,
                limit,
                ...(search ? { search } : {}),
                ...(sortBy ? { sortBy } : {}),
                ...(order ? { order } : {}),
            },
        })

        return { balances: data }
    } catch (err: unknown) {
        return handleAxiosError(err)
    }
}

const fetchBalanceById = async (id: number): Promise<{ balance: IBalance }> => {
    try {
        const { data } = await api.get<IBalance>(`/balances/${id}`)

        return { balance: data }
    } catch (error: unknown) {
        return handleAxiosError(error)
    }
}

export { fetchBalances, fetchBalanceById }
