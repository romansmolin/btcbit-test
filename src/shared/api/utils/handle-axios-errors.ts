import axios from 'axios'

import { ApiError, ApiErrorType } from '@/shared/errors/api-error'

export const handleAxiosError = (err: unknown): never => {
    if (err instanceof ApiError) {
        throw err
    }

    if (axios.isAxiosError(err)) {
        if (err.response) {
            throw new ApiError(
                ApiErrorType.SERVER_RESPONSE,
                'Server responded with an error',
                err.response
            )
        }

        if (err.request) {
            throw new ApiError(ApiErrorType.NO_RESPONSE, 'No response received', err.request)
        }

        throw new ApiError(ApiErrorType.REQUEST_SETUP, 'Error setting up the request', err.message)
    }

    throw new ApiError(ApiErrorType.UNKNOWN, 'Unexpected error', err)
}
