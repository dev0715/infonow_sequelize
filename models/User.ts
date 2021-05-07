import { DataTypes } from 'sequelize';
import { AllowNull, AutoIncrement, BelongsTo, Column, Default, ForeignKey, Index, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { Role } from './Role';
import { SequelizeModel } from '../types/SequelizeModel';


@Table
export class User extends SequelizeModel<User>{

    @Index
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER.UNSIGNED)
    _userId!: number

    @Index
    @AllowNull(false)
    @Unique(true)
    @Default(DataTypes.UUIDV4)
    @Column(DataTypes.STRING(36))
    userId!: string

    @ForeignKey(() => Role)
    roleId!: string

    @AllowNull(false)
    @Column(DataTypes.STRING(100))
    name!: string

    @Unique(true)
    @AllowNull(false)
    @Column(DataTypes.STRING(255))
    email!: string

    @AllowNull(false)
    @Column(DataTypes.STRING(255))
    password!: string

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    createdAt!: Date

    @AllowNull(true)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    updatedAt!: Date

    @BelongsTo(() => Role)
    role!: Role
}