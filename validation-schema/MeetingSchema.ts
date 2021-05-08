import Joi from "joi";
import { ValidationError } from "../errors/ValidationError";

export const NewMeetingSchema = Joi.object({
	guest: Joi.string().uuid().required().error(new ValidationError("%s is required.", 'participant')),
	scheduledAt: Joi.date().required().error(new ValidationError("date is required.")),
});

export const AcceptOrRejectMeetingSchema = Joi.object({
	meetingId: Joi.string().uuid().required().error(new ValidationError("meetingId is required.")),
	
	status: Joi.string()
		.valid(...["accepted", "rejected"])
		.required()
		.error(new ValidationError("status is required.")),
	message: Joi.string().min(0).max(200),
});

export const CancelOrRescheduleMeetingSchema = Joi.object({
	meetingId: Joi.string().uuid().required().error(new ValidationError("meetingId is required.")),
	status: Joi.string()
		.valid(...["cancelled", "rescheduled"])
		.required()
		.error(new ValidationError("status is required.")),
	scheduledAt: Joi.date().required().error(new ValidationError("date is required.")),
	message: Joi.string().min(0).max(200).required().error(new ValidationError("message is required.")),
});
