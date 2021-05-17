export * from "./SequelizeAttributes";
export * from "./SequelizeModel";

export const MeetingStatusEnum = <const>["accepted", "rejected", "pending", "cancelled", "rescheduled"];
export type MeetingStatus = typeof MeetingStatusEnum[number];

export const TeacherStatusEnum = <const>["new", "approved", "blocked"];
export type TeacherStatus = typeof TeacherStatusEnum[number];

export const StudentStatusEnum = <const>["new", "waiting-for-teacher", "active", "blocked"];
export type StudentStatus = typeof StudentStatusEnum[number];

export const RoleTypeEnum = <const>['student', 'teacher', 'admin', 'super-admin'];
export type RoleType = typeof RoleTypeEnum[number];
export const RoleTypeRegex = `${RoleTypeEnum.join('|')}`


export type UserSearchType = "email" | "_userId" | "userId"