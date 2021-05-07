export class ValidationError extends Error {
    isJoi = true
    constructor(message: string) {
        super(message)
    }
}