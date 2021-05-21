import { DataTypes } from "sequelize";
import {
	BelongsTo,
	Column,
	ForeignKey,
	Index,
	PrimaryKey,
	Table,
} from "sequelize-typescript";
import { Chat } from "./Chat";
import { User } from "./User";
import { SequelizeModel } from "../types/SequelizeModel";

@Table
export class ChatParticipant extends SequelizeModel<ChatParticipant> {
	@Index
	@ForeignKey(() => Chat)
	@PrimaryKey
	@Column(DataTypes.INTEGER.UNSIGNED)
	chatId!: number;

	@Index
	@ForeignKey(() => User)
	@PrimaryKey
	@Column(DataTypes.INTEGER.UNSIGNED)
	chatParticipantId!: number;

	@BelongsTo(() => Chat)
	chat!: Chat;

	@BelongsTo(() => User)
	user!: User;
}
