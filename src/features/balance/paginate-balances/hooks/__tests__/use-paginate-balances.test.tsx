import type { IProcessedBalance } from '@/entities/balance'

import { renderHook, act } from '@testing-library/react'

import { usePaginateBalances } from '../use-paginate-balances'

const makeBalances = (from: number, to: number): IProcessedBalance[] =>
    Array.from({ length: to - from + 1 }, (_, i) => {
        const id = from + i

        return {
            id: String(id),
            amount: String(id * 10),
            code: `CODE_${id}`,
            currency_id: id + 1000,
            symbol: `$${id}`,
        }
    })

describe('usePaginateBalances', () => {
    test('initializes with provided balances and state', () => {
        const initial = makeBalances(1, 3)
        const { result } = renderHook(() =>
            usePaginateBalances({ initialBalances: initial, initialPage: 1, pageSize: 3 })
        )

        expect(result.current.balances).toEqual(initial)
        expect(result.current.currentPage).toBe(1)
        expect(result.current.pageSize).toBe(3)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.hasMore).toBe(true)
    })

    test('loads next page on onEndReached and appends results', async () => {
        const initial = makeBalances(1, 3)
        const next = makeBalances(4, 6)

        const fetchPage = jest.fn().mockResolvedValue(next)

        const { result } = renderHook(() =>
            usePaginateBalances({ initialBalances: initial, initialPage: 1, pageSize: 3, fetchPage })
        )

        await act(async () => {
            await result.current.onEndReached()
        })

        expect(fetchPage).toHaveBeenCalledWith(2, 3, undefined, undefined, undefined)
        expect(result.current.balances).toEqual([...initial, ...next])
        expect(result.current.currentPage).toBe(2)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.hasMore).toBe(true)
    })

    test('sets hasMore=false when fetched items are fewer than pageSize', async () => {
        const initial = makeBalances(1, 3)
        const partialNext = makeBalances(4, 5) // 2 items, less than pageSize 3
        const fetchPage = jest.fn().mockResolvedValue(partialNext)

        const { result } = renderHook(() =>
            usePaginateBalances({ initialBalances: initial, initialPage: 1, pageSize: 3, fetchPage })
        )

        await act(async () => {
            await result.current.onEndReached()
        })

        expect(result.current.balances).toEqual([...initial, ...partialNext])
        expect(result.current.hasMore).toBe(false)
    })

    test('ignores onEndReached when loading or no more items', async () => {
        const initial = makeBalances(1, 3)
        const fetchPage = jest.fn().mockResolvedValue([])
        const { result } = renderHook(() =>
            usePaginateBalances({ initialBalances: initial, initialPage: 1, pageSize: 3, fetchPage })
        )

        await act(async () => {
            await result.current.onEndReached()
        })

        expect(result.current.hasMore).toBe(false)
        const calledCount = fetchPage.mock.calls.length

        await act(async () => {
            await result.current.onEndReached()
        })

        expect(fetchPage).toHaveBeenCalledTimes(calledCount)
    })

    test('resets state when inputs (search/sort) change', async () => {
        const initial = makeBalances(1, 3)
        const fetchPage = jest.fn().mockResolvedValueOnce(makeBalances(4, 6)).mockResolvedValue([])

        const { result, rerender } = renderHook(
            ({ search }: { search?: string }) =>
                usePaginateBalances({
                    initialBalances: initial,
                    initialPage: 3,
                    pageSize: 3,
                    fetchPage,
                    search,
                }),
            { initialProps: {} as { search?: string } }
        )

        await act(async () => {
            await result.current.onEndReached()
        })

        expect(result.current.currentPage).toBe(4)

        rerender({ search: 'btc' })

        expect(result.current.currentPage).toBe(3)
        expect(result.current.isLoading).toBe(false)
        expect(result.current.hasMore).toBe(true)
        expect(result.current.balances).toEqual(initial)
    })
})
