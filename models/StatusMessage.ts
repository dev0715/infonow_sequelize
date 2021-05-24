import { DataTypes } from "sequelize";
import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	Default,
	ForeignKey,
	Index,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { MessageStatus, MessageStatusEnum } from "../types";
import { SequelizeModel } from "../types/SequelizeModel";
import { Chat } from "./Chat";
import { Message } from "./Message";
import { User } from "./User";

@Table
export class StatusMessage extends SequelizeModel<StatusMessage> {
	@Index
	@PrimaryKey
	@AutoIncrement
	@Column(DataTypes.INTEGER.UNSIGNED)
	messageStatusId!: number;

	@Index
	@ForeignKey(() => Message)
	@Column(DataTypes.INTEGER.UNSIGNED)
	messageId!: number;

	@Index
	@ForeignKey(() => User)
	@Column(DataTypes.INTEGER.UNSIGNED)
	createdBy!: number;

	@AllowNull(false)
	@Default("sent")
	@Column(DataTypes.ENUM(...MessageStatusEnum))
	type!: MessageStatus;

	@AllowNull(false)
	@Default(DataTypes.NOW)
	@Column(DataTypes.DATE)
	createdAt!: Date;

	@AllowNull(true)
	@Column(DataTypes.DATE)
	deliveredAt!: Date;

	@AllowNull(true)
	@Column(DataTypes.DATE)
	seenAt!: Date;

	@AllowNull(true)
	@Default(DataTypes.NOW)
	@Column(DataTypes.DATE)
	updatedAt!: Date;

	@BelongsTo(() => User)
	user!: User;

	@BelongsTo(() => Message)
	message!: Message;
}
