import { User } from '../models/User';

declare module 'express' {
	interface Request {
        CurrentUser?: User,
        __: i18nAPI
	}
}