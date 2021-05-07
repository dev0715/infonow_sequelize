import { DataTypes } from 'sequelize';
import { AllowNull, AutoIncrement, Column, Default, Index, Model, PrimaryKey, Table, Unique } from "sequelize-typescript";
import { SequelizeModel } from '../types/SequelizeModel';


@Table
export class Role extends SequelizeModel<Role>{

    @PrimaryKey
    @Column(DataTypes.ENUM('student', 'teacher', 'admin', 'super-admin'))
    roleId!: string

    @AllowNull(false)
    @Column(DataTypes.STRING(70))
    roleName!: string

    @AllowNull(false)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    createdAt!: Date


    @AllowNull(true)
    @Default(DataTypes.NOW)
    @Column(DataTypes.DATE)
    updatedAt!: Date
}