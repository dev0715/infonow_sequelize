import Joi from "joi";
import { ValidationError } from "../errors/ValidationError";
import { JoiType } from "../types/JoiType";

export type NewMeetingSchemaType = {
	guest: string;
	scheduledAt: string;
	createdBy: string;
};

export type updateMeetingSchemaType = {
	meetingId: string;
	scheduledAt: string;
	status: string;
	message: string;
};

export const NewMeetingSchema = JoiType({
	guest: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "participant")),

	scheduledAt: Joi.date()
		.required()
		.error(new ValidationError("%s is required", "scheduledAt")),

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

export const CancelMeetingSchema = JoiType({
	meetingId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "meetingId")),

	status: Joi.string()
		.valid(...["cancelled"])
		.error(new ValidationError("%s is required", "status")),

	scheduledAt: Joi.date().error(
		new ValidationError("%s is required", "scheduledAt")
	),

	message: Joi.string()
		.min(0)
		.max(200)
		.required()
		.error(new ValidationError("%s is required", "message")),
});

export const RescheduleMeetingSchema = JoiType({
	meetingId: Joi.string()
		.uuid()
		.required()
		.error(new ValidationError("%s is required", "meetingId")),

	status: Joi.string()
		.valid(...["rescheduled"])
		.error(new ValidationError("%s is required", "status")),

	scheduledAt: Joi.date()
		.required()
		.error(new ValidationError("%s is required", "scheduledAt")),

	message: Joi.string()
		.min(0)
		.max(200)
		.required()
		.error(new ValidationError("%s is required", "message")),
});
