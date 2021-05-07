export * from "./SequelizeAttributes";
export * from "./SequelizeModel";

export const MeetingStatusEnum = <const>["accepted", "rejected", "pending", "cancelled", "rescheduled"];
export type MeetingStatus = typeof MeetingStatusEnum[number];

export const TeacherStatusEnum = <const>["new", "approved", "blocked"];
export type TeacherStatus = typeof TeacherStatusEnum[number];
