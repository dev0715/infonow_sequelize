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
	Unique,
} from "sequelize-typescript";
import { MessageStatus, MessageStatusEnum } from "../types";
import { SequelizeModel } from "../types/SequelizeModel";
import { Chat } from "./Chat";
import { User } from "./User";

@Table
export class Message extends SequelizeModel<Message> {
	@Index
	@PrimaryKey
	@AutoIncrement
	@Column(DataTypes.INTEGER.UNSIGNED)
	_messageId!: number;

	@Index
	@AllowNull(false)
	@Unique(true)
	@Default(DataTypes.UUIDV4)
	@Column(DataTypes.STRING(36))
	messageId!: string;

	@Index
	@ForeignKey(() => Chat)
	@Column(DataTypes.INTEGER.UNSIGNED)
	chatId!: number;

	@Index
	@ForeignKey(() => User)
	@Column(DataTypes.INTEGER.UNSIGNED)
	createdBy!: number;

	@AllowNull(false)
	@Column(DataTypes.TEXT)
	content!: string;

	@AllowNull(false)
	@Default("sent")
	@Column(DataTypes.ENUM(...MessageStatusEnum))
	status!: MessageStatus;

	@AllowNull(false)
	@Default(DataTypes.NOW)
	@Column(DataTypes.DATE)
	createdAt!: Date;

	@AllowNull(true)
	@Column(DataTypes.DATE)
	seenAt!: Date;

	@AllowNull(true)
	@Default(DataTypes.NOW)
	@Column(DataTypes.DATE)
	updatedAt!: Date;

	@BelongsTo(() => User)
	user!: User;

	@BelongsTo(() => Chat)
	chat!: Chat;
}
