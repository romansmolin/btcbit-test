export class BaseAppError extends Error {
    public readonly details?: unknown

    constructor(message: string, details?: unknown) {
        super(message)
        this.name = this.constructor.name
        this.details = details
        Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    }
}
