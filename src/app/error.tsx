'use client'

import { Button } from '@heroui/button'
import { Frown } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'

import { BaseAppError } from '@/shared/errors/base-app-error'
import { ApiError, ApiErrorType } from '@/shared/errors/api-error'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    let message = 'Something went wrong!'

    if (error instanceof ApiError) {
        switch (error.type) {
            case ApiErrorType.SERVER_RESPONSE:
                message = 'Server responded with an error.'
                break
            case ApiErrorType.NO_RESPONSE:
                message = 'No response received. Please try again.'
                break
            case ApiErrorType.REQUEST_SETUP:
                message = 'There was a problem setting up the request.'
                break
            default:
                message = 'An unknown error occurred.'
        }
    } else if (error instanceof BaseAppError) {
        message = error.message
    } else {
        message = error.message || message
    }

    const hasQueryParams = Boolean(searchParams?.toString())

    const handleClearQuery = () => {
        window.location.replace(pathname)
    }

    return (
        <div className="h-full flex justify-center items-center">
            <div className="flex flex-col items-center gap-2">
                <Frown size={62} />

                <h2>{message}</h2>
                {process.env.NODE_ENV !== 'production' && (error as any).details && (
                    <h3>{JSON.stringify((error as any).details, null, 2)}</h3>
                )}
                <div className="flex gap-2">
                    <Button color="primary" onPress={() => reset()}>
                        Try again
                    </Button>
                    {hasQueryParams && (
                        <Button variant="bordered" onPress={handleClearQuery}>
                            Clear search and reload
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
