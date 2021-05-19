import Joi from "joi";
import { ValidationError } from "../utils/errors";
import { JoiType } from "../types/JoiType";

export type NewChatSchemaType = {
	participant: string;
	createdBy: string;
};

export const NewChatSchema = JoiType({
	participant: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "participant")),

	createdBy: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "userId")),
});
