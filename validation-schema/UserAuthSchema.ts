import Joi from 'joi';
import { ValidationError } from '../errors/ValidationError';

export const UserAuthSchema = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(4)
        .max(30)
        .required()
        .error(new ValidationError("Password must be between 8-30 characters")),


})
