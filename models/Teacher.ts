import { DataTypes } from 'sequelize';
import { AllowNull, AutoIncrement, BelongsTo, Column, Default, ForeignKey, Index, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { SequelizeModel } from '../types/SequelizeModel';
import { User } from './User';


@Table
export class Teacher extends SequelizeModel<Teacher>{

    @PrimaryKey
    @ForeignKey(() => User)
    @Column(DataTypes.INTEGER.UNSIGNED)
    teacherId!: number

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    createdAt!: Date

    @AllowNull(true)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    updatedAt!: Date

    @BelongsTo(() => User)
    user!: User
}