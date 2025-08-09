import { BaseAppError } from './base-app-error'

export enum ApiErrorType {
    SERVER_RESPONSE = 'SERVER_RESPONSE',
    NO_RESPONSE = 'NO_RESPONSE',
    REQUEST_SETUP = 'REQUEST_SETUP',
    UNKNOWN = 'UNKNOWN',
}

export class ApiError extends BaseAppError {
    public readonly type: ApiErrorType

    constructor(type: ApiErrorType, message: string, details?: unknown) {
        super(message, details)
        this.type = type
    }
}
