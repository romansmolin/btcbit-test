import { useEffect, useRef } from 'react'

export interface UseEndReachedObserverOptions {
    onEndReached?: () => void
    hasMore: boolean
    isLoading: boolean
    rootMargin?: string
    cooldownMs?: number
}

export const useEndReachedObserver = (options: UseEndReachedObserverOptions) => {
    const { onEndReached, hasMore, isLoading, rootMargin = '200px', cooldownMs = 300 } = options

    const sentinelRef = useRef<HTMLDivElement | null>(null)
    const isCoolingDownRef = useRef(false)

    useEffect(() => {
        if (!onEndReached) return
        const sentinel = sentinelRef.current

        if (!sentinel) return

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries

                if (entry.isIntersecting && hasMore && !isLoading && !isCoolingDownRef.current) {
                    isCoolingDownRef.current = true
                    onEndReached()
                    setTimeout(() => {
                        isCoolingDownRef.current = false
                    }, cooldownMs)
                }
            },
            { root: null, rootMargin, threshold: 0.1 }
        )

        observer.observe(sentinel)

        return () => observer.disconnect()
    }, [onEndReached, hasMore, isLoading, rootMargin, cooldownMs])

    return { sentinelRef }
}
