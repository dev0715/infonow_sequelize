import Joi from "joi";
import { ValidationError } from "../errors/ValidationError";
import { JoiType } from "../types/JoiType";

export type NewMeetingSchemaType = {
	guest: string,
	scheduledAt: string,
	createdBy: string,
};

export const NewMeetingSchema = JoiType({
	guest: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "participant")),

	scheduledAt: Joi.date()
		.required()
		.error(new ValidationError("%s is required", "date")),

	createdBy: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "userId")),
});



export const AcceptOrRejectMeetingSchema = JoiType({
	meetingId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "meetingId")),

	status: Joi.string()
		.valid(...["accepted", "rejected"])
		.required()
		.error(new ValidationError("%s is required", "status")),

	message: Joi.string().min(0).max(200),
});


export const CancelOrRescheduleMeetingSchema = Joi.object({
	meetingId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "meetingId")),

	status: Joi.string()
		.valid(...["cancelled", "rescheduled"])
		.required()
		.error(new ValidationError("%s is required", "status")),

	scheduledAt: Joi.date()
		.required()
		.error(new ValidationError("%s is required", "date")),

	message: Joi.string()
		.min(0)
		.max(200)
		.required()
		.error(new ValidationError("%s is required", "message")),
});
