import Joi from 'joi';
import { ValidationError } from '../utils/errors';

export const AssignTestSchema = Joi.object({

    studentId: Joi.string().uuid()
        .required()
        .error(new ValidationError("studentId is required")),

    testId: Joi.string().uuid()
        .required()
        .error(new ValidationError("testId is required")),

})

