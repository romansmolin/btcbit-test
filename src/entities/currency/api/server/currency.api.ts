import { ICurrency } from '../../model/currency.type'

import { handleAxiosError } from '@/shared/api'
import api from '@/shared/api/config/axios'

const fetchCurrencies = async (): Promise<{ currencies: ICurrency[] }> => {
    try {
        const { data } = await api.get<ICurrency[]>('/currencies')

        return { currencies: data }
    } catch (err: unknown) {
        return handleAxiosError(err)
    }
}

const fetchCurrencyById = async (id: number): Promise<{ currency: ICurrency }> => {
    try {
        const { data } = await api.get<ICurrency>(`/currencies/${id}`)

        return { currency: data }
    } catch (error: unknown) {
        return handleAxiosError(error)
    }
}

export { fetchCurrencies, fetchCurrencyById }
