export class ValidationError extends Error {
    isJoi = true
    localMessage: [string, ...any];
    constructor(message: string, ...args: any) {
        super(message)
        this.localMessage = [message, ...args]
    }
}