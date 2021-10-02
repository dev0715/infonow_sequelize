import Joi from 'joi';
import { ValidationError } from '../utils/errors';

export const UserAddSchema = Joi.object({

    role: Joi.string()
        .valid(...[
            'admin',
            'super-admin',
            'teacher',
            'student',
        ])
        .required()
        .error(new ValidationError("role is required")),

    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z\s]{3,100}$'))
        .required()
        .error(new ValidationError("Name must be between 3-100 characters and only contain alphabets")),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(4)
        .max(30)
        .required()
        .error(new ValidationError("Password must be between 8-30 characters")),

    confirmPassword: Joi.ref('password'),

})
    .with('password', 'confirmPassword');
