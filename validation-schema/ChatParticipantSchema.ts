import Joi from "joi";
import { ValidationError } from "../utils/errors";
import { JoiType } from "../types/JoiType";

export type NewChatParticipantSchemaType = {
	chatId: string;
	participants: string[];
	userId: string;
};

export const NewChatParticipantSchema = JoiType({
	chatId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "chatId")),

	participants: Joi.array()
		.items(Joi.string().uuid().required())
		.min(1)
		.error(new ValidationError("At least one participant is required")),

	userId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "userId")),
});
