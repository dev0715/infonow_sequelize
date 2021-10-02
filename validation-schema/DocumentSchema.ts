import Joi from 'joi';
import { ValidationError } from '../utils/errors';

export const DocumentSchema = Joi.object({

    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z\s]{3,100}$'))
        .required()
        .error(new ValidationError("Name must be between 3-100 characters and only contain alphabets")),

    fileType: Joi.string()
        .valid(...[
            '.png',
            '.jpeg',
            '.jpg',
        ])
        .required()
        .error(new ValidationError("Invalid file type"))

})
