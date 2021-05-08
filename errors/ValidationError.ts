export class ValidationError extends Error {
	isJoi = true;
	localeMessage: [string, ...any];
	constructor(message: string, ...args: any) {
		super(message);
		this.localeMessage = [message, ...args];
	}
}
