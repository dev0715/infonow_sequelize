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
		.error(new ValidationError("participant is required")),

	scheduledAt: Joi.date()
		.required()
		.error(new ValidationError("date is required")),

	createdBy: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("userId is required")),
})





export const AcceptOrRejectMeetingSchema = JoiType({
	meetingId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("meetingId is required")),
	
	status: Joi.string()
		.valid(...["accepted", "rejected"])
		.required()
		.error(new ValidationError("status is required")),
	
	message: Joi.string().min(0).max(200),
});


export const CancelOrRescheduleMeetingSchema = Joi.object({
	meetingId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("meetingId is required")),
	
	status: Joi.string()
		.valid(...["cancelled", "rescheduled"])
		.required()
		.error(new ValidationError("status is required")),
	
	scheduledAt: Joi.date()
		.required()
		.error(new ValidationError("date is required")),
	
	message: Joi.string()
		.min(0)
		.max(200)
		.required()
		.error(new ValidationError("message is required")),
});
