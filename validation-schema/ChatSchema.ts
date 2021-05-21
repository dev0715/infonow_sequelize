import Joi from "joi";
import { ValidationError } from "../utils/errors";
import { JoiType } from "../types/JoiType";
import { ChatTypes, RoleType } from "../types";

export type NewChatSchemaType = {
	type: ChatTypes;
	participants: string[];
	createdBy: string;
	role: RoleType;
};

export const NewChatSchema = JoiType({
	type: Joi.string()
		.pattern(/^chat|group$/)
		.required()
		.error(new ValidationError("%s is required", "type")),

	participants: Joi.array()
		.items(Joi.string().uuid().required())
		.when("type", {
			is: "chat",
			then: Joi.array()
				.max(1)
				.error(new ValidationError("One participant is required")),
			otherwise: Joi.array()
				.min(1)
				.error(
					new ValidationError("At least one participant is required")
				),
		}),

	createdBy: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "userId")),

	role: Joi.string()
		.pattern(/^teacher$/)
		.required()
		.error(new ValidationError("You are not authorized to this operation")),
});
